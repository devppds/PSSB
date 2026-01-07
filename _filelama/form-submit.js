/**
 * Form submission handler for PPDB registration
 * Handles AJAX submission and validation
 */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate form first
            if (!validateForm(form)) {
                return false;
            }

            // Show loading state
            const submitBtn = form.querySelector('.zf-submitColor');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Mengirim Data...';
            submitBtn.style.opacity = '0.7';

            // Prepare form data
            const formData = new FormData(form);

            // Submit via AJAX
            fetch('/api/submit_registration', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Success message
                        showSuccessMessage(data);

                        // Reset form after 2 seconds
                        setTimeout(() => {
                            form.reset();
                            // Scroll to top
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 2000);
                    } else {
                        // Error message
                        showErrorMessage(data.message || 'Terjadi kesalahan saat mengirim data');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showErrorMessage('Terjadi kesalahan koneksi. Silakan coba lagi.');
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                });

            return false;
        });
    }

    // --- Indonesian Region Dropdown Logic ---
    const provinceSelect = document.getElementById('propinsi');
    const citySelect = document.getElementById('kota');
    const districtSelect = document.getElementById('kecamatan');

    if (provinceSelect) {
        // Fetch Provinces
        fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
            .then(response => response.json())
            .then(provinces => {
                provinces.forEach(province => {
                    let option = document.createElement('option');
                    option.value = province.name;
                    option.dataset.id = province.id;
                    option.textContent = province.name;
                    provinceSelect.appendChild(option);
                });
            });

        // Province change -> Fetch Cities
        provinceSelect.addEventListener('change', function () {
            const selectedOption = this.options[this.selectedIndex];
            const provinceId = selectedOption.dataset.id;

            // Reset and disable subsequent dropdowns
            citySelect.innerHTML = '<option value="-Select-">Pilih Kota/Kabupaten</option>';
            districtSelect.innerHTML = '<option value="-Select-">Pilih Kecamatan</option>';

            if (provinceId) {
                fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
                    .then(response => response.json())
                    .then(regencies => {
                        regencies.forEach(regency => {
                            let option = document.createElement('option');
                            option.value = regency.name;
                            option.dataset.id = regency.id;
                            option.textContent = regency.name;
                            citySelect.appendChild(option);
                        });
                    });
            }
        });

        // City change -> Fetch Districts
        citySelect.addEventListener('change', function () {
            const selectedOption = this.options[this.selectedIndex];
            const regencyId = selectedOption.dataset.id;

            districtSelect.innerHTML = '<option value="-Select-">Pilih Kecamatan</option>';
            document.getElementById('kelurahan').innerHTML = '<option value="-Select-">Pilih Desa/Kelurahan</option>';
            document.getElementById('kodepos').value = '';

            if (regencyId) {
                fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`)
                    .then(response => response.json())
                    .then(districts => {
                        districts.forEach(district => {
                            let option = document.createElement('option');
                            option.value = district.name;
                            option.dataset.id = district.id;
                            option.textContent = district.name;
                            districtSelect.appendChild(option);
                        });
                    });
            }
        });

        // District change -> Fetch Villages & Postal Codes
        const kelurahanSelect = document.getElementById('kelurahan');
        const kodeposInput = document.getElementById('kodepos');

        districtSelect.addEventListener('change', function () {
            const districtName = this.value;
            const cityName = citySelect.value.replace(/KABUPATEN |KOTA /gi, '');
            kelurahanSelect.innerHTML = '<option value="-Select-">Memuat...</option>';
            kodeposInput.value = '';

            if (districtName && districtName !== "-Select-") {
                fetch(`https://kodepos.vercel.app/search?q=${districtName} ${cityName}`)
                    .then(response => response.json())
                    .then(res => {
                        // Fallback: search only by district if combined search fails
                        if (!res.data || res.data.length === 0) {
                            return fetch(`https://kodepos.vercel.app/search?q=${districtName}`).then(r => r.json());
                        }
                        return res;
                    })
                    .then(res => {
                        kelurahanSelect.innerHTML = '<option value="-Select-">Pilih Desa/Kelurahan</option>';
                        if (res.data && res.data.length > 0) {
                            res.data.forEach(item => {
                                let option = document.createElement('option');
                                option.value = item.village;
                                option.dataset.zip = item.code;
                                option.textContent = item.village;
                                kelurahanSelect.appendChild(option);
                            });
                        } else {
                            kelurahanSelect.innerHTML = '<option value="-Select-">Data tidak ditemukan</option>';
                        }
                    })
                    .catch(() => {
                        kelurahanSelect.innerHTML = '<option value="-Select-">Gagal memuat data</option>';
                    });
            }
        });

        // Village change -> Set Postal Code
        kelurahanSelect.addEventListener('change', function () {
            const selectedOption = this.options[this.selectedIndex];
            const zip = selectedOption.dataset.zip;
            if (zip) {
                kodeposInput.value = zip;
            } else {
                kodeposInput.value = '';
            }
        });
    }
});

/**
 * Basic Form Validation
 */
function validateForm(form) {
    let isValid = true;
    let firstErrorField = null;

    // List of mandatory fields (Internal names)
    const mandArray = [
        "Name_First", "Number", "Number1", "Number2", "Dropdown",
        "SingleLine2", "Date", "Dropdown2", "Dropdown1", "Dropdown3",
        "SingleLine", "SingleLine1", "Name1_First", "Number3",
        "PhoneNumber_countrycode", "Dropdown8", "Dropdown4", "Dropdown6",
        "Name2_First", "Number4", "PhoneNumber1_countrycode", "Dropdown9",
        "Dropdown5", "Dropdown7", "Address1_AddressLine1", "Address1_AddressLine2",
        "Address1_Village", "Address1_City", "Address1_Region", "Address1_ZipCode", "Address1_Country"
    ];

    // File fields (handled separately for check)
    const fileFields = ["FileUpload", "FileUpload1", "FileUpload2"];

    // Reset errors
    document.querySelectorAll('.zf-errorMessage').forEach(el => el.style.display = 'none');

    // Check mandatory text/select fields
    mandArray.forEach(name => {
        const field = form.elements[name];
        if (field) {
            let isEmpty = false;
            if (field.value.trim() === "" || field.value === "-Select-") {
                isEmpty = true;
            }

            if (isEmpty) {
                isValid = false;
                showFieldError(name);
                if (!firstErrorField) firstErrorField = field;
            }
        }
    });

    // Check file fields
    fileFields.forEach(name => {
        const field = form.elements[name];
        if (field && field.files.length === 0) {
            isValid = false;
            showFieldError(name);
            if (!firstErrorField) firstErrorField = field;
        }
    });

    if (!isValid && firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => firstErrorField.focus(), 500);
    }

    return isValid;
}

function showFieldError(name) {
    // Standard error ID is [FieldName]_error or [BaseName]_error
    const baseName = name.split('_')[0];
    let errEl = document.getElementById(name + "_error") || document.getElementById(baseName + "_error");
    if (errEl) {
        errEl.style.display = 'block';
    }
}


function showSuccessMessage(data) {
    const { registration_id, data: studentData } = data;
    const waNumber = "6285809111996"; // From footer
    const waMessage = `Assalamualaikum, saya sudah mendaftar PPDB Online atas nama:
- Nama: ${studentData.nama}
- NIK: ${studentData.nik}
- No. Pendaftaran: #${registration_id}

Saya telah mengunduh Bukti Pendaftaran (PDF). Mohon diverifikasi. Terima kasih.`;

    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    // Auto-Generate PDF
    try {
        generateRegistrationPDF(data);
    } catch (e) {
        console.error("PDF Generation Error", e);
    }

    const message = `
        <div class="success-modal" style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center;
            z-index: 10000; animation: fadeIn 0.3s ease; backdrop-filter: blur(5px);
        ">
            <div style="
                background: white; padding: 2.5rem; border-radius: 24px; max-width: 500px; width: 90%;
                text-align: center; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); animation: slideUp 0.4s ease;
            ">
                <div style="
                    width: 70px; height: 70px; background: #10b981; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;
                ">
                    <i class="fas fa-check" style="color: white; font-size: 2rem;"></i>
                </div>
                
                <h2 style="font-size: 1.6rem; font-weight: 800; color: #1e3a8a; margin-bottom: 0.5rem;">Pendaftaran Berhasil!</h2>
                <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 1.5rem;">
                    Kartu Bukti Pendaftaran Anda sedang diunduh otomatis.
                </p>

                <div style="background: #f1f5f9; padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left; border-left: 5px solid #3b82f6;">
                    <p style="margin: 0.25rem 0; font-size: 0.9rem;"><strong>Nama:</strong> ${studentData.nama}</p>
                    <p style="margin: 0.25rem 0; font-size: 0.9rem;"><strong>NIK:</strong> ${studentData.nik}</p>
                    <p style="margin: 0.25rem 0; font-size: 0.9rem;"><strong>Jenjang:</strong> ${studentData.jenjang}</p>
                    <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #d97706;"><strong>No. Reg: #${registration_id}</strong></p>
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="generateRegistrationPDF(${JSON.stringify(data).replace(/"/g, '&quot;')})" style="
                        background: #3b82f6; color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 10px;
                        font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
                    ">
                        <i class="fas fa-file-pdf"></i> Download Ulang Bukti (PDF)
                    </button>

                    <a href="${waLink}" target="_blank" style="
                        background: #25D366; color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 10px;
                        font-weight: 600; cursor: pointer; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;
                    ">
                        <i class="fab fa-whatsapp"></i> Konfirmasi ke WA Admin
                    </a>

                    <button onclick="closeSuccessModal()" style="
                        background: transparent; color: #64748b; padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 10px;
                        font-weight: 600; cursor: pointer; margin-top: 5px;
                    ">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', message);
}

// Generate PDF Function using jsPDF
function generateRegistrationPDF(data) {
    if (!window.jspdf) {
        alert("Library PDF belum siap. Silakan klik tombol Download lagi.");
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const student = data.data;

    // Load Logo first (Async)
    const logoUrl = "https://res.cloudinary.com/dceamfy3n/image/upload/v1766596001/logo_zdenyr.png";
    const imgLogo = new Image();
    imgLogo.crossOrigin = "Anonymous";
    imgLogo.src = logoUrl;

    imgLogo.onload = function () {
        createPDF(doc, imgLogo, student, data);
    };

    imgLogo.onerror = function () {
        // Fallback without logo
        createPDF(doc, null, student, data);
    };
}

function createPDF(doc, logoImg, student, data) {
    // Design Constants
    const primaryColor = [30, 58, 138]; // #1e3a8a

    // HEADER BACKGROUND
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    // LOGO (Left Side)
    if (logoImg) {
        doc.addImage(logoImg, "PNG", 10, 5, 30, 30);
    }

    // HEADER TEXT
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("KARTU BUKTI PENDAFTARAN", 115, 15, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("PONDOK PESANTREN DARUSSALAM LIRBOYO", 115, 23, { align: "center" });

    doc.setFontSize(10);
    doc.text("Tahun Ajaran 2026-2027", 115, 30, { align: "center" });

    // INFO BAR (Under Header)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text(`No. Pendaftaran: #${data.registration_id}`, 145, 50);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 145, 55);

    // STUDENT PHOTO placeholder box
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.rect(20, 50, 40, 53); // x, y, w, h
    doc.setFontSize(8);

    const fileInput = document.querySelector('input[name="FileUpload"]');
    if (fileInput && fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgData = event.target.result;
            try {
                doc.addImage(imgData, "JPEG", 20, 50, 40, 53);
            } catch (e) { /* Ignore */ }
            finalizePDF(doc, student);
        }
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        doc.text("FOTO SANTRI", 40, 75, { align: "center" });
        finalizePDF(doc, student);
    }
}

function finalizePDF(doc, student) {
    const startX = 70;
    let startY = 60;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DATA CALON SANTRI", startX, 55);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const form = document.getElementById('form');
    // Helper to get value safely
    const getVal = (name) => form.elements[name] ? form.elements[name].value : '-';
    // Helper for dropdowns to get selected text if accessible, else value
    const getSelect = (name) => form.elements[name] ? form.elements[name].value : '-';

    // Construct Address
    let address = getVal('Address1_AddressLine1');
    const village = getSelect('Address1_Village');
    const district = getSelect('Address1_AddressLine2');
    const city = getSelect('Address1_City');

    if (village && village !== '-Select-') address += `, ${village}`;
    if (district && district !== '-Select-') address += `, Kec. ${district}`;
    if (city && city !== '-Select-') address += `, ${city}`;

    const fields = [
        ["Nama Lengkap", `${getVal('Name_First')} ${getVal('Name_Last')}`],
        ["NIK", getVal('Number')],
        ["Jenis Kelamin", getSelect('Dropdown')],
        ["Tempat, Tgl Lahir", `${getVal('SingleLine2')}, ${getVal('Date')}`],
        ["Jenjang Dituju", getSelect('Dropdown3')],
        ["Nama Ayah", `${getVal('Name1_First')} ${getVal('Name1_Last')}`],
        ["Alamat", address],
    ];

    fields.forEach(item => {
        doc.setFont("helvetica", "bold");
        doc.text(`${item[0]}`, startX, startY);
        doc.setFont("helvetica", "normal");

        // Prevent overlap by splitting text
        const splitText = doc.splitTextToSize(`: ${item[1]}`, 90);
        doc.text(splitText, startX + 35, startY);

        startY += (splitText.length * 5) + 3;
    });

    // FOOTER NOTICE
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 140, 200, 140);
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Catatan:", 10, 148);
    doc.text("1. Simpan kartu ini sebagai bukti pendaftaran yang sah.", 15, 153);
    doc.text("2. Silahkan konfirmasi ke admin melalui WhatsApp dengan melampirkan file PDF ini.", 15, 158);
    doc.text("3. Bawa kartu ini saat melakukan daftar ulang / tes masuk.", 15, 163);

    doc.save(`Bukti_Pendaftaran_${student.nama}.pdf`);
}

function showErrorMessage(message) {
    const errorModal = `
        <div class="error-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        ">
            <div style="
                background: white;
                padding: 3rem;
                border-radius: 24px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.4s ease;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                ">
                    <i class="fas fa-times" style="color: white; font-size: 2.5rem;"></i>
                </div>
                <h2 style="
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: #dc2626;
                    margin-bottom: 1rem;
                ">Terjadi Kesalahan</h2>
                <p style="
                    color: #64748b;
                    font-size: 1.1rem;
                    margin-bottom: 1.5rem;
                ">${message}</p>
                <button onclick="closeErrorModal()" style="
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    color: white;
                    padding: 1rem 2.5rem;
                    border: none;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" 
                   onmouseout="this.style.transform='translateY(0)'">
                    Tutup
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', errorModal);
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

function closeErrorModal() {
    const modal = document.querySelector('.error-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
}

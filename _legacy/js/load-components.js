
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'components/header.html', () => {
        initHeader();
        initCalendar();
    });
    loadComponent('footer-placeholder', 'components/footer.html', initFooter);
    initAnimations();
    // disableInspection();
});

/*
function disableInspection() {
    // 1. Disable Right-Click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // 2. Disable Key Shortcuts
    document.addEventListener('keydown', (e) => {
        // Disable F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I (Inspect)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
    });
}
*/

function loadComponent(elementId, filePath, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            // Unwrap if it was a wrapper tag (optional, but keeping wrapper is fine usually)
            // element.outerHTML = data; // Uncomment if replacing the placeholder entirely

            if (callback) callback();
        })
        .catch(error => {
            console.warn('Error loading component:', error);
            // Fallback content or message if needed
            element.innerHTML = '<p>Gagal memuat konten. Pastikan Anda menjalankan ini menggunakan server lokal (bukan file://).</p>';
        });
}

function initHeader() {
    // 1. Highlight Active Link
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'home';
    const dataPage = document.body.getAttribute('data-page');

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === dataPage || (dataPage === 'home' && linkPage === 'home')) {
            link.classList.add('active');
        }
    });

    // 2. Sticky Header Logic (Hide Top Row on Scroll)
    const header = document.querySelector('.header-wrapper');
    if (header) {
        window.addEventListener('scroll', () => {
            // Only apply on Desktop (> 992px)
            if (window.innerWidth > 992) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Initialize Mobile Menu
    const toggle = document.querySelector('.mobile-menu-toggle');
    let overlay = document.querySelector('.mobile-menu-overlay');

    if (overlay && overlay.parentElement !== document.body) {
        document.body.appendChild(overlay);
        overlay = document.querySelector('.mobile-menu-overlay');
    }

    const close = document.querySelector('.mobile-menu-close');
    const links = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        if (!overlay) return;
        const isActive = overlay.classList.contains('active');
        if (!isActive) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (toggle) {
        toggle.replaceWith(toggle.cloneNode(true));
        const newToggle = document.querySelector('.mobile-menu-toggle');
        newToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (close) {
        close.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) toggleMenu();
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (!overlay) return;
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

function initFooter() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // WA Chat Logic
    const waFloatBtn = document.getElementById('waFloatBtn');
    const waCloseBtn = document.querySelector('.wa-close-btn');
    const waSendBtn = document.querySelector('.wa-send-btn');

    if (waFloatBtn) {
        waFloatBtn.addEventListener('click', toggleWaChat);
    }
    if (waCloseBtn) {
        waCloseBtn.addEventListener('click', toggleWaChat);
    }
    if (waSendBtn) {
        waSendBtn.addEventListener('click', sendToWhatsapp);
    }
}

function toggleWaChat() {
    const chatWindow = document.getElementById('waChatWindow');
    const bubble = document.getElementById('waBubble');

    if (!chatWindow) return;

    chatWindow.classList.toggle('active');

    // Hide bubble when chat is active
    if (chatWindow.classList.contains('active')) {
        if (bubble) bubble.style.display = 'none';
    } else {
        if (bubble) bubble.style.display = 'block';
    }
}

function sendToWhatsapp() {
    const phoneNumber = "6285809111996";

    // Pesan default karena textarea sudah dihapus oleh user
    const defaultMsg = "Assalamu'alaikum Admin, saya ingin bertanya terkait pendaftaran santri baru.";

    // Menambahkan tanda identitas pengirim dari fitur Floating Chat
    const finalMessage = `*[Pesan dari Floating Chat Web]*\n\n${defaultMsg}`;

    const encodedMessage = encodeURIComponent(finalMessage);
    // Menggunakan api.whatsapp.com agar pre-filled text lebih stabil di berbagai device
    const waLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(waLink, '_blank');
}

function initAnimations() {
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                const children = entry.target.querySelectorAll('.reveal-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                    }, index * 100);
                });
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

function initCalendar() {
    const monthsMasehi = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const now = new Date();

    // Masehi
    const dateM = now.getDate();
    const monthM = monthsMasehi[now.getMonth()];
    const yearM = now.getFullYear();
    const formattedMasehi = `${dateM} ${monthM} ${yearM}`;

    // Hijri (Simple Approximation)
    const hijri = getHijriDate(now);
    const monthsHijri = ['Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir', 'Jumadil Ula', 'Jumadil Akhira', 'Rajab', 'Syaban', 'Ramadhan', 'Syawal', 'Dzulqadah', 'Dzulhijjah'];
    const formattedHijri = `${hijri.day} ${monthsHijri[hijri.month]} ${hijri.year} H`;

    // Update Elements
    const elM = document.getElementById('date-masehi');
    const elH = document.getElementById('date-hijri');
    const mobM = document.getElementById('mobile-date-masehi');
    const mobH = document.getElementById('mobile-date-hijri');

    if (elM) elM.textContent = formattedMasehi;
    if (elH) elH.textContent = formattedHijri;
    if (mobM) mobM.textContent = formattedMasehi;
    if (mobH) mobH.textContent = `• ${formattedHijri}`;
}

function getHijriDate(date) {
    // This is a common algorithmic approximation (Civil Hijri)
    let jd = 0;
    if (date.getMonth() < 2) {
        jd = Math.floor(365.25 * (date.getFullYear() - 1)) + Math.floor(30.6001 * (date.getMonth() + 13)) + date.getDate() + 1720995;
    } else {
        jd = Math.floor(365.25 * date.getFullYear()) + Math.floor(30.6001 * (date.getMonth() + 1)) + date.getDate() + 1720995;
    }

    if (jd > 2299160) {
        let alpha = Math.floor((date.getFullYear() - 1867.21625) / 366.2425);
        jd += 1 + alpha - Math.floor(alpha / 4);
    }

    let l = jd - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;

    let month = Math.floor((24 * l) / 709);
    let day = l - Math.floor((709 * month) / 24);
    let year = 30 * n + j - 30;

    return { day: day, month: month - 1, year: year };
}

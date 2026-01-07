export default function VideoProfil() {
    return (
        <section className="section-wrapper" id="video-profil" style={{ background: "#f8fafc" }}>
            <h2 className="section-title">Video Profil</h2>
            <div className="header-content" style={{ padding: 0, display: "block" }}>
                <div className="glass-card reveal zoom-in" style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
                    <div className="video-container">
                        <iframe id="profileProjector"
                            src="https://www.youtube-nocookie.com/embed/3UdUhHAbR9c?enablejsapi=1&mute=1&rel=0"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}

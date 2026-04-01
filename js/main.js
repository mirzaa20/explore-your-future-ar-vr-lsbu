// ─────────────────────────────────────────
// LSBU VR Open Day — main.js
// ─────────────────────────────────────────

const SITES = [
    {
        id: 1,
        name: "Computer Lab",
        building: "Technical Learning Suite",
        description: "Explore LSBU's modern computer facilities — equipped with industry-standard software and high-performance workstations used by students across computing, engineering and design programmes.",
        video: "../assets/videos/computer-lab.mp4",
        audio: "",
        photos: [
            "../assets/photos/computer-lab.jpg",
            "../assets/photos/computer-lab.jpg",
            "../assets/photos/computer-lab.jpg",
            "../assets/photos/computer-lab.jpg"
        ]
    },
    {
        id: 2,
        name: "Keyworth Lecture Theatre",
        building: "Keyworth Centre",
        description: "Step inside one of LSBU's main lecture theatres — a large-scale teaching space used for lectures, seminars, and open day presentations across all faculties.",
        video: "../assets/videos/keyworth-lecture-theatre.mp4",
        audio: "",
        photos: [
            "../assets/photos/keyworth-lecture-theatre.jpg",
            "../assets/photos/keyworth-lecture-theatre.jpg",
            "../assets/photos/keyworth-lecture-theatre.jpg",
            "../assets/photos/keyworth-lecture-theatre.jpg"
        ]
    },
    {
        id: 3,
        name: "Library",
        building: "Learning Resource Centre",
        description: "Tour the LSBU Library — a multi-floor resource hub offering thousands of physical and digital texts, quiet study zones, group study rooms, and 24/7 access during term time.",
        video: "../assets/videos/library.mp4",
        audio: "",
        photos: [
            "../assets/photos/library.jpg",
            "../assets/photos/library.jpg",
            "../assets/photos/library.jpg",
            "../assets/photos/library.jpg"
        ]
    },
    {
        id: 4,
        name: "Outside Hub",
        building: "Campus Exterior & Social Spaces",
        description: "Experience LSBU's vibrant outdoor campus environment — from the main entrance on Borough Road to the social spaces where students relax, collaborate and connect between sessions.",
        video: "../assets/videos/outside-hub.mp4",
        audio: "",
        photos: [
            "../assets/photos/outside-hub.jpg",
            "../assets/photos/outside-hub.jpg",
            "../assets/photos/outside-hub.jpg",
            "../assets/photos/outside-hub.jpg"
        ]
    }
];

// ─────────────────────────────────────────
// SCENE CONTROLLER
// ─────────────────────────────────────────

function initScene(siteId) {
    const site = SITES.find(s => s.id === siteId);
    if (!site) return;

    let currentPhoto = 0;
    let isMuted = false;
    let currentTab = 'video';

    const loading = document.getElementById('loading-screen');
    const overlay = document.getElementById('ui-overlay');
    const videoEl = document.getElementById('scene-video');
    const videoSphere = document.getElementById('video-sphere');
    const photoSky = document.getElementById('photo-sky');
    const muteBtn = document.getElementById('mute-btn');
    const photoNav = document.getElementById('photo-nav');
    const siteName = document.getElementById('site-name');
    const loadTitle = document.getElementById('loading-title');

    if (siteName) siteName.textContent = `${site.name} — ${site.building}`;
    if (loadTitle) loadTitle.textContent = site.name;

    if (videoEl) {
        videoEl.src = site.video;
        videoEl.load();
    }

    if (photoSky) {
        photoSky.setAttribute('src', site.photos[0]);
    }

    setTimeout(() => {
        loading.classList.add('fade-out');
        overlay.classList.add('visible');
        setTimeout(() => {
            loading.style.display = 'none';
            if (videoEl) videoEl.play().catch(() => { });
        }, 800);
    }, 2800);

    window.switchTab = function (tab) {
        currentTab = tab;
        const isVideo = tab === 'video';

        document.getElementById('tab-video').classList.toggle('active', isVideo);
        document.getElementById('tab-photos').classList.toggle('active', !isVideo);

        videoSphere.setAttribute('visible', isVideo);
        photoSky.setAttribute('visible', !isVideo);
        photoNav.classList.toggle('visible', !isVideo);

        if (isVideo) {
            videoEl.play().catch(() => { });
        } else {
            videoEl.pause();
            updatePhoto();
        }
    };

    window.changePhoto = function (dir) {
        currentPhoto = (currentPhoto + dir + site.photos.length) % site.photos.length;
        updatePhoto();
    };

    function updatePhoto() {
        photoSky.setAttribute('src', site.photos[currentPhoto]);
        document.getElementById('photo-counter').textContent =
            `${currentPhoto + 1} / ${site.photos.length}`;
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            videoEl.muted = isMuted;
            muteBtn.textContent = isMuted ? '🔇' : '🔊';
            muteBtn.classList.toggle('active', isMuted);
        });
    }

    const fsBtn = document.getElementById('fs-btn');
    if (fsBtn) {
        fsBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => { });
            } else {
                document.exitFullscreen();
            }
        });
    }
}
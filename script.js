/**
 * THE DALUSUNG EXPEDITION - GLOBAL CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animations)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. GLOBAL CLOCK
    setInterval(() => {
        const clock = document.getElementById('nav-clock');
        if (clock) {
            clock.innerText = `HQ TIME: ${new Date().toLocaleTimeString('en-US', { hour12: false })}`;
        }
    }, 1000);

    // 3. GLOBAL CURSOR GLOW
    const glow = document.getElementById('cursor-glow');
    if (glow) {
        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => glow.style.transform = 'translate(-50%, -50%) scale(0.7)');
        document.addEventListener('mouseup', () => glow.style.transform = 'translate(-50%, -50%) scale(1)');
    }

    // 4. HOME PAGE SLIDESHOW
    let slideIdx = 0;
    const slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
        const runSlides = () => {
            for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
            slideIdx++;
            if (slideIdx > slides.length) slideIdx = 1;
            slides[slideIdx - 1].style.display = "block";
            setTimeout(runSlides, 3000);
        };
        runSlides();
    }

    // 5. MEMORY VAULT GENERATOR (The Unified Fix)
    const grid = document.getElementById('vault-grid');
    if (grid) {
        const allProjectImages = [
            // Numbered Archives
            "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg",
            "10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg", "17.jpeg",
            "18.jpeg", "19.jpeg", "20.jpeg", "21.jpeg", "22.jpeg", "23.jpeg", "24.jpeg",
            
            // Parent & Family Files
            "daddy.jpeg", "jay1.jpeg", "mama.jpeg", "tess1.jpeg", "partner1.jpeg",
            "fam1.jpeg", "fam2.jpeg", "fam3.jpeg",
            
            // Progeny Files
            "jaymee.jpeg", "jaymark.jpeg", "jaymark1.jpeg", "jaymark2.jpeg", "jaymark3.jpeg", "jaymark4.jpeg",
            "jameson.jpeg", "son1.jpeg", "son2.jpeg", "son3.jpeg", "son4.jpeg",
            "jai.jpeg", "jai1.jpeg", "jai2.jpeg", "jai3.jpeg", "jai4.jpeg",
            "nigel.jpeg", "gel1.jpeg", "gel2.jpeg", "gel3.jpeg", "gel4.jpeg"
        ];

        allProjectImages.forEach(fileName => {
            const item = document.createElement('div');
            item.className = 'memory-item';
            item.setAttribute('data-aos', 'fade-up');

            const img = document.createElement('img');
            img.src = fileName;
            img.alt = "Expedition Record";
            img.loading = "lazy";
            
            // Click to open Lightbox
            img.onclick = () => openLightbox(fileName);

            // If image is missing, don't show the box
            img.onerror = () => item.style.display = 'none';

            item.appendChild(img);
            grid.appendChild(item);
        });
        
        // Refresh AOS after items are added
        setTimeout(() => { if(typeof AOS !== 'undefined') AOS.refresh(); }, 500);
    }
});

/**
 * GLOBAL LIGHTBOX FUNCTIONS
 */
window.openLightbox = (src) => {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCounter = document.getElementById('image-counter');
    
    if (lb && lbImg) {
        lb.style.display = 'flex';
        lbImg.src = src;
        if (lbCounter) lbCounter.innerText = `DATA_REF: ${src.toUpperCase()}`;
        document.body.style.overflow = 'hidden';
    }
};

window.closeLightbox = () => {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// 5. MEMORY VAULT GENERATOR (With Categories)
const grid = document.getElementById('vault-grid');
if (grid) {
    const allProjectImages = [
        // PARENTS
        { file: "daddy.jpeg", cat: "parents" },
        { file: "jay1.jpeg", cat: "parents" },
        { file: "mama.jpeg", cat: "parents" },
        { file: "tess1.jpeg", cat: "parents" },
        { file: "partner1.jpeg", cat: "parents" },
        
        // GROUP
        { file: "fam1.jpeg", cat: "family" },
        { file: "fam2.jpeg", cat: "family" },
        { file: "fam3.jpeg", cat: "family" },
        
        // KIDS
        { file: "jaymee.jpeg", cat: "kids" },
        { file: "jaymark.jpeg", cat: "kids" },
        { file: "jaymark1.jpeg", cat: "kids" },
        { file: "jaymark2.jpeg", cat: "kids" },
        { file: "jaymark3.jpeg", cat: "kids" },
        { file: "jaymark4.jpeg", cat: "kids" },
        { file: "jameson.jpeg", cat: "kids" },
        { file: "son1.jpeg", cat: "kids" },
        { file: "son2.jpeg", cat: "kids" },
        { file: "son3.jpeg", cat: "kids" },
        { file: "son4.jpeg", cat: "kids" },
        { file: "jai.jpeg", cat: "kids" },
        { file: "jai1.jpeg", cat: "kids" },
        { file: "jai2.jpeg", cat: "kids" },
        { file: "jai3.jpeg", cat: "kids" },
        { file: "jai4.jpeg", cat: "kids" },
        { file: "nigel.jpeg", cat: "kids" },
        { file: "gel1.jpeg", cat: "kids" },
        { file: "gel2.jpeg", cat: "kids" },
        { file: "gel3.jpeg", cat: "kids" },
        { file: "gel4.jpeg", cat: "kids" }
    
    ];

    // Add numbered files to 'family' or 'all'
    for (let i = 1; i <= 24; i++) {
        allProjectImages.push({ file: `${i}.jpeg`, cat: "family" });
    }

    allProjectImages.forEach(item => {
        const div = document.createElement('div');
        div.className = `memory-item ${item.cat}`; // Add category as a class
        div.setAttribute('data-aos', 'fade-up');

        const img = document.createElement('img');
        img.src = item.file;
        img.onclick = () => openLightbox(item.file);
        img.onerror = () => div.style.display = 'none';

        div.appendChild(img);
        grid.appendChild(div);
    });
}

// FILTER LOGIC FUNCTION
window.filterVault = (category) => {
    const items = document.querySelectorAll('.memory-item');
    const btns = document.querySelectorAll('.filter-btn');

    // Update active button look
    btns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(category)) btn.classList.add('active');
    });

    // Show/Hide items
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'inline-block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Refresh AOS to fix animations after filtering
    if(typeof AOS !== 'undefined') AOS.refresh();
};

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('transition-overlay');

    // 1. OUT-ANIMATION: On page load, slide the curtain AWAY
    // Initially set left to 0 in CSS briefly, then move it out.
    overlay.style.left = '0';
    setTimeout(() => {
        overlay.style.left = '100%';
    }, 100);

    // 2. IN-ANIMATION: Intercept Link Clicks
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only transition for internal links
            if (link.hostname === window.location.hostname && !link.hash) {
                e.preventDefault(); // Stop immediate jump
                const target = link.href;

                // Slide the curtain IN
                overlay.style.left = '0';

                // Redirect after animation finishes
                setTimeout(() => {
                    window.location.href = target;
                }, 600); 
            }
        });
    });
});

function toggleMenu() {
    document.getElementById('full-menu').classList.toggle('open');
    // Transform lines into an 'X'
    const lines = document.querySelectorAll('.menu-line');
    lines[0].style.transform = lines[0].style.transform === 'rotate(45deg) translateY(6px)' ? 'none' : 'rotate(45deg) translateY(6px)';
    lines[1].style.transform = lines[1].style.transform === 'rotate(-45deg) translateY(-6px)' ? 'none' : 'rotate(-45deg) translateY(-6px)';
}

window.addEventListener('scroll', () => {
    const mirror = document.querySelector('.mirror-content');
    if (!mirror) return;

    let scrollPos = window.scrollY;
    // Slowly tilt the text as you scroll toward it
    mirror.style.transform = `perspective(1000px) rotateX(${scrollPos * 0.01}deg)`;
});

window.addEventListener('scroll', () => {
    const pulseDot = document.getElementById('pulse-dot');
    const lat = document.getElementById('coord-lat');
    const long = document.getElementById('coord-long');

    // 1. Update Dot Position
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    pulseDot.style.top = scrollPercent + '%';

    // 2. Subtle Coordinate Jitter (Makes it look live)
    let randomJitter = (Math.random() * 0.001).toFixed(4);
    lat.innerText = `LAT: 15.02${Math.floor(scrollPercent)}`; 
    long.innerText = `LONG: 120.56${Math.floor(scrollPercent)}`;
});
window.addEventListener('scroll', () => {
    const ghostElements = document.querySelectorAll('.ghost-text');
    const scrollAmount = window.scrollY;

    ghostElements.forEach((el, index) => {
        // Each element moves at a slightly different speed for "Deep Parallax"
        const speed = (index + 1) * 0.1; 
        const movement = scrollAmount * speed;
        
        // Moves the text up as you scroll down
        el.style.transform = `translateY(-${movement}px)`;
    });
});


window.addEventListener('scroll', () => {
    const leak = document.querySelector('.light-leak');
    if (!leak) return;

    let scrollPos = window.scrollY;
    // Moves the glow slightly faster than the scroll to create parallax light
    leak.style.transform = `translateY(${scrollPos * 0.2}px)`;
});





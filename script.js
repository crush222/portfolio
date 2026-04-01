// --- Custom Cursor Logic ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const hoverTargets = document.querySelectorAll('.hover-target');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Instant follow for the dot
    cursorDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;

    // Smooth trailing effect for the outline using Web Animations API
    cursorOutline.animate({
    transform: `translate(${posX - 20}px, ${posY - 20}px)`
}, { duration: 500, fill: "forwards" });
});

// Add hover effects to links/buttons
hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(0, 210, 255, 0.1)';

        // 🔥 ADD THIS (glow boost)
        cursorOutline.style.boxShadow = '0 0 30px rgba(0, 210, 255, 0.8)';
    });

    target.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';

        // 🔥 RESET GLOW
        cursorOutline.style.boxShadow = '0 0 15px rgba(138, 43, 226, 0.6)';
    });
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Trigger only once
        }
    });
}, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// --- Trigger initial reveals on load ---
window.addEventListener('load', () => {
    setTimeout(() => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});

// --- Modal Logic ---
const modal = document.getElementById('contact-modal');
const openBtns = document.querySelectorAll('.open-modal');
const closeBtn = document.getElementById('close-modal');

openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close on clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('video');

    if (video) {
        card.addEventListener('mouseenter', () => {
            video.play();
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});
const images = document.querySelectorAll('.hero-img');
const imageBox = document.querySelector('.image-box');

let index = 0;
let lastSwitch = 0;
const delay = 1000; // 🔥 adjust speed (ms)

imageBox.addEventListener('mousemove', () => {
    const now = Date.now();

    if (now - lastSwitch > delay) {
        images[index].classList.remove('active');

        index = (index + 1) % images.length;

        images[index].classList.add('active');

        lastSwitch = now;
    }
});

// ===== MOVE CARD INTERACTION (3D + CURSOR GLOW) =====

const cards = document.querySelectorAll('.move-card');

cards.forEach(card => {

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 3D tilt
        const rotateX = -(y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

        // Glow follow
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        card.style.setProperty('--x', `${percentX}%`);
        card.style.setProperty('--y', `${percentY}%`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });

});
// ===== FINAL ADVANCED LOADER =====

const text = "Partha";
const loaderText = document.getElementById("loader-text");
const progress = document.querySelector(".loader-progress");
const loader = document.getElementById("loader");
const particleContainer = document.querySelector('.loader-particles');

let i = 0;
let load = 0;

// 🔤 Typing effect
function typeText() {
    if (i < text.length) {
        loaderText.textContent += text.charAt(i);
        i++;
        setTimeout(typeText, 120);
    } else {
        loaderText.classList.add("glitch"); // glitch after typing
    }
}

// 📊 Progress bar
function loadBar() {
    if (load < 100) {
        load += Math.random() * 10;
        progress.style.width = load + "%";
        setTimeout(loadBar, 120);
    } else {
        setTimeout(() => {
           loader.classList.add("flash");

           setTimeout(() => {
              loader.classList.add("wipe"); // 🔥 screen wipe

              setTimeout(() => {
                 loader.classList.add("zoom-out"); // 🔥 zoom out

                 setTimeout(() => {
                    loader.classList.add("hidden");
                    document.body.classList.add("loaded");
                 }, 600);

              }, 400);

           }, 400);

        }, 400);
    }
}

// ✨ Particle generator
function createParticles() {
    for (let i = 0; i < 40; i++) {
        const span = document.createElement('span');

        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDuration = (3 + Math.random() * 5) + "s";
        span.style.opacity = Math.random();

        particleContainer.appendChild(span);
    }
}

// 🚀 Start everything
window.addEventListener("load", () => {
    document.body.classList.add("loaded"); 

    createParticles();
    typeText();
    loadBar();
});
// ===== SUPABASE FORM =====

const supabaseUrl = "https://fbfvhyaddmjenwcjdiki.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZnZoeWFkZG1qZW53Y2pkaWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMjcxODMsImV4cCI6MjA4OTYwMzE4M30.lTs9BJqCmC9nHC7trNK-6JE_Kag8xujBZLZhJ1FqFx0";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const message = form.elements["message"].value;

    const { error } = await supabaseClient
        .from("contacts")
        .insert([{ name, email, message }]);

    if (error) {
        alert("❌ Error sending message");
        console.log(error);
    } else {
        alert("✅ Message sent!");
        form.reset();
    }
});
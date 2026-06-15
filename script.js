document.addEventListener("DOMContentLoaded", () => {
    const discoverBtn = document.getElementById("discover-btn");
    const welcomePage = document.getElementById("welcome-page");
    const linksPage = document.getElementById("links-page");
    const shareBtn = document.getElementById("share-btn");
    const darkModeBtn = document.getElementById("dark-mode-btn");
    const toast = document.getElementById("toast-notification");
    const typewriterEl = document.getElementById("typewriter-text");

    // Check if the device is a mobile phone to optimize performance
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    // 1. Smooth Stage Navigation
    discoverBtn.addEventListener("click", () => {
        welcomePage.classList.add("hidden");
        linksPage.classList.remove("hidden");
        // Scroll to top smoothly upon transition
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Share Button & Clipboard Copy
    shareBtn.addEventListener("click", () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast.classList.remove("hidden");
            setTimeout(() => { toast.classList.add("hidden"); }, 2500);
        }).catch(err => console.error("Could not copy URL: ", err));
    });

    // 3. Premium Blue Dark Mode Toggle Logic
    darkModeBtn.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme");
        const icon = darkModeBtn.querySelector("i");
        
        if (currentTheme === "dark") {
            document.body.removeAttribute("data-theme");
            icon.className = "fas fa-moon";
        } else {
            document.body.setAttribute("data-theme", "dark");
            icon.className = "fas fa-sun";
        }
    });

    // 4. Advanced Typewriter Effect for Bio Description
    const roles = [
        "Automation & Industrial Informatics Engineer",
        "Founder of Aura Card 💳"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        if (!typewriterEl) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; 
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80; 
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; 
            typingSpeed = 500; 
        }

        setTimeout(typeEffect, typingSpeed);
    }
    if (typewriterEl) typeEffect();


    // 5. Click Blue Sparkles (STRICTLY DISABLED ON MOBILE FOR ULTRA FAST SPEED)
    if (!isMobile) {
        document.addEventListener("click", (e) => {
            if (e.target.closest('.control-btn-top') || e.target.closest('.link-card') || e.target.closest('.discover-btn')) return;

            const totalParticles = 6;
            for (let i = 0; i < totalParticles; i++) {
                const sparkle = document.createElement("div");
                sparkle.classList.add("click-sparkle");
                
                const angle = (i / totalParticles) * 2 * Math.PI;
                const distance = 30 + Math.random() * 20;
                const mx = Math.cos(angle) * distance + "px";
                const my = Math.sin(angle) * distance + "px";
                
                sparkle.style.setProperty("--mx", mx);
                sparkle.style.setProperty("--my", my);
                sparkle.style.left = e.clientX + "px";
                sparkle.style.top = e.clientY + "px";
                
                const colors = ['#1E40AF', '#3B82F6', '#ffffff', '#93C5FD'];
                sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                document.body.appendChild(sparkle);
                sparkle.addEventListener("animationend", () => sparkle.remove());
            }
        });
    }
});
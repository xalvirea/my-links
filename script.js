document.addEventListener("DOMContentLoaded", () => {
    const discoverBtn = document.getElementById("discover-btn");
    const welcomePage = document.getElementById("welcome-page");
    const linksPage = document.getElementById("links-page");
    const shareBtn = document.getElementById("share-btn");
    const darkModeBtn = document.getElementById("dark-mode-btn");
    const toast = document.getElementById("toast-notification");
    const typewriterEl = document.getElementById("typewriter-text");
    const navArrow = document.getElementById("nav-arrow");

    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    // دالة الانتقال بين صفحة الترحيب وصفحة الروابط
    function togglePages() {
        if (welcomePage.classList.contains("hidden")) {
            linksPage.classList.add("hidden");
            welcomePage.classList.remove("hidden");
            if (navArrow) navArrow.style.transform = "translateX(-50%) rotate(0deg)";
        } else {
            welcomePage.classList.add("hidden");
            linksPage.classList.remove("hidden");
            if (navArrow) navArrow.style.transform = "translateX(-50%) rotate(180deg)";
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (discoverBtn) discoverBtn.addEventListener("click", togglePages);
    if (navArrow) navArrow.addEventListener("click", togglePages);

    // زر مشاركة ونسخ الرابط
    if (shareBtn) {
        shareBtn.addEventListener("click", () => {
            const currentUrl = window.location.href;
            navigator.clipboard.writeText(currentUrl).then(() => {
                if (toast) {
                    toast.classList.remove("hidden");
                    setTimeout(() => { toast.classList.add("hidden"); }, 2500);
                }
            }).catch(err => console.error("Could not copy URL: ", err));
        });
    }

    // زر تبديل الثيمات (الوضع الليلي والنهاري)
    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            const currentTheme = document.body.getAttribute("data-theme");
            const icon = darkModeBtn.querySelector("i");
            if (currentTheme === "dark") {
                document.body.removeAttribute("data-theme");
                if (icon) icon.className = "fas fa-moon";
            } else {
                document.body.setAttribute("data-theme", "dark");
                if (icon) icon.className = "fas fa-sun";
            }
        });
    }

    // تأثير الآلة الكاتبة للبيو الشخصي
    const roles = [
        "Automation & Industrial Informatics Engineer",
        "Founder of Aura Card 💳"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function typeEffect() {
        if (!typewriterEl) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 25;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50; 
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 1200; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; 
            typingSpeed = 300; 
        }

        setTimeout(typeEffect, typingSpeed);
    }
    if (typewriterEl) typeEffect();

    // 🌟 خريطة برمجية تربط الكلاس الخاص بكل كارد بحركة الأيقونة المحددة له
    const animationMap = {
        'linkedin-btn': 'animate-bounce',
        'github-btn': 'animate-wiggle',
        'aura-btn': 'animate-pulse',
        'resume-btn': 'animate-spin',
        'instagram-btn': 'animate-flip',
        'facebook-btn': 'animate-elastic'
    };

    // 🌟 تشغيل الأنيميشن وتأخير فتح الروابط لتظهر الحركة بوضوح تام
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // إيقاف الانتقال اللحظي الفوري
            const targetUrl = card.getAttribute('href');

            // 1. نبض الكارد بالكامل عند الضغط
            card.classList.add('card-clicked');
            setTimeout(() => card.classList.remove('card-clicked'), 200);

            // 2. البحث عن نوع الكارد وتفعيل حركة الأيقونة الخاصة به بالداخل
            let chosenAnimation = '';
            for (const [className, animName] of Object.entries(animationMap)) {
                if (card.classList.contains(className)) {
                    chosenAnimation = animName;
                    break;
                }
            }

            if (chosenAnimation) {
                card.classList.add(chosenAnimation);
                // إزالة فئة الأنيميشن بعد انتهاء الحركة لتصبح جاهزة للضغطة القادمة
                setTimeout(() => card.classList.remove(chosenAnimation), 450);
            }

            // 3. فتح الرابط في نافذة جديدة بعد انتهاء الحركة (350 مللي ثانية فقط)
            if (targetUrl && targetUrl !== '#') {
                setTimeout(() => {
                    window.open(targetUrl, '_blank');
                }, 350);
            }
        });
    });

    // إضافة حركة الضغط المرنة لبقية أزرار التحكم في النظام
    const otherButtons = document.querySelectorAll('.control-btn-top, .discover-btn, .nav-arrow-btn');
    otherButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.add('card-clicked');
            setTimeout(() => btn.classList.remove('card-clicked'), 200);
        });
    });

    // حركة الشرارات المنفجرة عند الضغط في أي مكان على الشاشة
    document.addEventListener("click", (e) => {
        const totalParticles = isMobile ? 4 : 6;
        
        for (let i = 0; i < totalParticles; i++) {
            const sparkle = document.createElement("div");
            sparkle.classList.add("click-sparkle");
            
            const angle = (i / totalParticles) * 2 * Math.PI;
            const distance = isMobile ? (15 + Math.random() * 10) : (30 + Math.random() * 20);
            const mx = Math.cos(angle) * distance + "px";
            const my = Math.sin(angle) * distance + "px";
            
            sparkle.style.setProperty("--mx", mx);
            sparkle.style.setProperty("--my", my);
            sparkle.style.left = e.clientX + "px";
            sparkle.style.top = e.clientY + "px";
            
            if (isMobile) {
                sparkle.style.width = "6px";
                sparkle.style.height = "6px";
            }
            
            const colors = ['#1E40AF', '#3B82F6', '#FFFFFF', '#93C5FD'];
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(sparkle);
            sparkle.addEventListener("animationend", () => sparkle.remove());
        }
    });
});
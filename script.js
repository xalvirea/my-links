document.addEventListener("DOMContentLoaded", () => {
    const discoverBtn = document.getElementById("discover-btn");
    const welcomePage = document.getElementById("welcome-page");
    const linksPage = document.getElementById("links-page");
    const shareBtn = document.getElementById("share-btn");
    const darkModeBtn = document.getElementById("dark-mode-btn");
    const toast = document.getElementById("toast-notification");
    const typewriterEl = document.getElementById("typewriter-text");

    // فحص نوع الجهاز لتسريع الأداء فوراً على الهواتف الذكية
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    // 1. الانتقال السلس والمباشر بين صفحة الترحيب وصفحة الروابط
    if (discoverBtn && welcomePage && linksPage) {
        discoverBtn.addEventListener("click", () => {
            welcomePage.classList.add("hidden");
            linksPage.classList.remove("hidden");
            // التمرير إلى أعلى الصفحة تلقائياً لمنع أي قص في المحتوى
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. زر المشاركة ونسخ رابط الموقع إلى الحافظة مع إشعار (Toast)
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

    // 3. التبديل الذكي والسلس بين وضع النهار والليل (Premium Theme Toggle)
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

    // 4. تأثير الآلة الكاتبة السريع والمنعش للوصف الشخصي (Bio)
    const roles = [
        "Automation & Industrial Informatics Engineer",
        "Founder of Aura Card 💳"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50; // سرعة كتابة ممتازة وديناميكية (50ms)

    function typeEffect() {
        if (!typewriterEl) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 25; // سرعة مسح فائقة لمنع الملل
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50; 
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 1200; // وقفة خفيفة ومثالية عند اكتمال الجملة
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; 
            typingSpeed = 300; 
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typewriterEl) typeEffect();

    // 5. تأثير شرارات الـ Blue Sparkles الفاخر عند الضغط (يعمل على الحاسوب فقط لضمان خفة الهاتف)
    if (!isMobile) {
        document.addEventListener("click", (e) => {
            // تجاهل التأثير إذا تم الضغط على الأزرار الرئيسية لكي لا يتداخل مع حركاتها الأصلية
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
                
                // تدرج ألوان متناسق مع هويتك الزرقاء اللطيفة
                const colors = ['#1E40AF', '#3B82F6', '#FFFFFF', '#93C5FD'];
                sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                document.body.appendChild(sparkle);
                sparkle.addEventListener("animationend", () => sparkle.remove());
            }
        });
    }
});
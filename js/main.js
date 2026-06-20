/**
 * 星辰科技 - 企业官网 JavaScript
 * 包含：导航、粒子动画、暗黑模式、聊天组件、表单验证等
 */

document.addEventListener('DOMContentLoaded', function() {

    // ========== 导航栏滚动效果 ==========
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ========== 移动端菜单切换 ==========
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    // ========== 粒子背景动画 ==========
    function initParticles() {
        const canvas = document.getElementById('heroParticles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let isActive = true;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });

        const particleCount = window.innerWidth < 768 ? 30 : 60;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        let frameCount = 0;
        function animate() {
            if (!isActive) return;
            frameCount++;
            if (frameCount % 2 === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(function(p, i) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')';
                    ctx.fill();
                    if (i % 3 === 0) {
                        for (let j = i + 1; j < i + 5 && j < particles.length; j++) {
                            const p2 = particles[j];
                            const dx = p.x - p2.x;
                            const dy = p.y - p2.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance < 120) {
                                ctx.beginPath();
                                ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.15 - distance / 800) + ')';
                                ctx.lineWidth = 0.5;
                                ctx.moveTo(p.x, p.y);
                                ctx.lineTo(p2.x, p2.y);
                                ctx.stroke();
                            }
                        }
                    }
                });
            }
            animationId = requestAnimationFrame(animate);
        }
        animate();
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) { isActive = false; cancelAnimationFrame(animationId); }
            else { isActive = true; animate(); }
        });
    }
    initParticles();

    // ========== 鼠标跟随光效 ==========
    function initMouseGlow() {
        const hero = document.querySelector('.hero');
        if (!hero || window.matchMedia('(pointer: coarse)').matches) return;
        let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0, rafId = null, isMoving = false;
        hero.addEventListener('mousemove', function(e) {
            mouseX = e.clientX; mouseY = e.clientY;
            if (!isMoving) { isMoving = true; animate(); }
        }, { passive: true });
        hero.addEventListener('mouseleave', function() { cancelAnimationFrame(rafId); isMoving = false; });
        function animate() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            hero.style.setProperty('--mouse-x', currentX + 'px');
            hero.style.setProperty('--mouse-y', currentY + 'px');
            rafId = requestAnimationFrame(animate);
        }
        const glow = document.createElement('div');
        glow.className = 'hero-mouse-glow';
        glow.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;background:radial-gradient(circle 300px at var(--mouse-x,50%) var(--mouse-y,50%),rgba(26,86,219,0.08),transparent);opacity:0;transition:opacity 0.5s;';
        hero.insertBefore(glow, hero.firstChild);
        hero.addEventListener('mouseenter', function() { glow.style.opacity = '1'; }, { passive: true });
    }
    initMouseGlow();

    // ========== 视差滚动效果 ==========
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.page-hero, .about-intro-image, .service-detail-image');
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            parallaxElements.forEach(function(el) {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
                }
            });
        }, { passive: true });
    }
    if (!window.matchMedia('(pointer: coarse)').matches) { initParallax(); }

    // ========== 数字递增动画 ==========
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        let completed = 0;
        statNumbers.forEach(function(el) {
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = Math.floor((target) * eased);
                el.textContent = current;
                if (progress < 1) { requestAnimationFrame(update); }
                else {
                    el.textContent = target;
                    completed++;
                    if (completed === statNumbers.length) {
                        statNumbers.forEach(function(num) {
                            num.style.transform = 'scale(1.1)';
                            setTimeout(function() { num.style.transform = 'scale(1)'; }, 200);
                        });
                    }
                }
            }
            requestAnimationFrame(update);
        });
    }
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) { animateNumbers(); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // ========== 滚动渐入动画 ==========
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .case-card, .team-card, .timeline-item, .service-detail-item, .process-step, .award-card, .culture-card, .office-card, .industry-card, .pricing-card, .faq-item');
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() { entry.target.classList.add('animated'); }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
        animatedElements.forEach(function(el) { observer.observe(el); });
    }
    setupScrollAnimations();

    // ========== 标题文字逐个显示动画 ==========
    function initTextReveal() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        heroTitle.style.opacity = '1';
        const lines = text.split('<br>');
        lines.forEach(function(line, lineIndex) {
            const lineEl = document.createElement('span');
            lineEl.className = 'hero-line';
            lineEl.style.display = 'block';
            lineEl.style.overflow = 'hidden';
            const chars = line.split('');
            chars.forEach(function(char, charIndex) {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(100%)';
                span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                span.style.transitionDelay = ((lineIndex * 0.3) + (charIndex * 0.04)) + 's';
                lineEl.appendChild(span);
            });
            heroTitle.appendChild(lineEl);
            if (lineIndex < lines.length - 1) heroTitle.appendChild(document.createElement('br'));
        });
        setTimeout(function() {
            const spans = heroTitle.querySelectorAll('span span');
            spans.forEach(function(span) { span.style.opacity = '1'; span.style.transform = 'translateY(0)'; });
        }, 100);
    }
    initTextReveal();

    // ========== FAQ 折叠面板 ==========
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                faqItems.forEach(function(other) { if (other !== item) other.classList.remove('active'); });
                item.classList.toggle('active');
            });
        });
    }
    initFAQ();

    // ========== 客户评价轮播 ==========
    function initTestimonials() {
        const slider = document.getElementById('testimonialsSlider');
        if (!slider) return;
        const track = slider.querySelector('.testimonials-track');
        const cards = slider.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        const dots = document.querySelectorAll('.testimonial-dots span');
        let currentIndex = 0;
        let autoSlideInterval;
        const total = cards.length;

        function goToSlide(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            currentIndex = index;
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            dots.forEach(function(dot, i) { dot.classList.toggle('active', i === currentIndex); });
        }
        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }
        function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 5000); }
        function stopAutoSlide() { clearInterval(autoSlideInterval); }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() { prevSlide(); stopAutoSlide(); startAutoSlide(); });
            nextBtn.addEventListener('click', function() { nextSlide(); stopAutoSlide(); startAutoSlide(); });
        }
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() { goToSlide(index); stopAutoSlide(); startAutoSlide(); });
        });
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        slider.addEventListener('touchstart', stopAutoSlide, { passive: true });
        slider.addEventListener('touchend', startAutoSlide, { passive: true });
        startAutoSlide();

        let touchStartX = 0, touchEndX = 0;
        slider.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            else if (touchEndX - touchStartX > 50) prevSlide();
        }, { passive: true });
    }
    initTestimonials();

    // ========== 平滑滚动到锚点 ==========
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 72;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ========== 按钮涟漪效果 ==========
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const ripple = document.createElement('span');
                ripple.style.cssText = 'position:absolute;background:rgba(255,255,255,0.3);border-radius:50%;transform:scale(0);animation:ripple 0.6s ease-out;pointer-events:none;';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                setTimeout(function() { ripple.remove(); }, 600);
            });
        });
    }
    initRippleEffect();

    // ========== 暗黑模式切换 ==========
    function initDarkMode() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '\u2600\uFE0F';
        } else { themeToggle.textContent = '\uD83C\uDF19'; }
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.textContent = '\uD83C\uDF19';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '\u2600\uFE0F';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    initDarkMode();

    // ========== 回到顶部按钮 ==========
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    if (window.scrollY > 500) btn.classList.add('visible');
                    else btn.classList.remove('visible');
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
    initBackToTop();

    // ========== 智能客服聊天组件 ==========
    function initChatWidget() {
        const chatToggle = document.getElementById('chatToggle');
        const chatPanel = document.getElementById('chatPanel');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const chatBody = document.getElementById('chatBody');
        const quickReplies = document.querySelectorAll('.chat-quick-btn');
        if (!chatToggle || !chatPanel) return;
        let isOpen = false;

        function openChat() {
            isOpen = true;
            chatPanel.classList.add('active');
            chatToggle.style.transform = 'scale(0.9)';
            setTimeout(function() { chatToggle.style.transform = ''; }, 150);
        }
        function closeChat() { isOpen = false; chatPanel.classList.remove('active'); }
        chatToggle.addEventListener('click', function() { if (isOpen) closeChat(); else openChat(); });

        function getBotReply(userMsg) {
            var msg = userMsg.toLowerCase();
            if (msg.indexOf('\u54A8\u8BE2') !== -1 || msg.indexOf('\u65B9\u6848') !== -1) return '\u597D\u7684\uFF01\u6211\u4EEC\u63D0\u4F9B\u4F01\u4E1A\u6570\u5B57\u5316\u54A8\u8BE2\u3001\u667A\u80FD\u6570\u636E\u5E73\u53F0\u3001\u4E91\u8BA1\u7B97\u57FA\u7840\u67B6\u6784\u7B49\u670D\u52A1\u3002\u60A8\u53EF\u4EE5\u901A\u8FC7<a href="contact.html">\u8054\u7CFB\u8868\u5355</a>\u63D0\u4EA4\u8BE6\u7EC6\u9700\u6C42\uFF0C\u6211\u4EEC\u4F1A\u5B89\u6392\u4E13\u5BB6\u572824\u5C0F\u65F6\u5185\u4E0E\u60A8\u8054\u7CFB\uFF01';
            else if (msg.indexOf('\u4EF7\u683C') !== -1 || msg.indexOf('\u8D39\u7528') !== -1 || msg.indexOf('\u591A\u5C11\u94B1') !== -1) return '\u6211\u4EEC\u7684\u670D\u52A1\u4EF7\u683C\u6839\u636E\u9879\u76EE\u89C4\u6A21\u548C\u9700\u6C42\u5B9A\u5236\uFF1A\u57FA\u7840\u7248 \u00A58,000/\u6708\u8D77\uFF0C\u4E13\u4E1A\u7248 \u00A525,000/\u6708\u8D77\uFF0C\u4F01\u4E1A\u7248\u6309\u9700\u62A5\u4EF7\u3002\u5177\u4F53\u8BF7\u67E5\u770B<a href="services.html">\u670D\u52A1\u5957\u9910</a>\u9875\u9762\u3002';
            else if (msg.indexOf('\u6848\u4F8B') !== -1 || msg.indexOf('\u5BA2\u6237') !== -1) return '\u6211\u4EEC\u5DF2\u7ECF\u670D\u52A1\u8D85\u8FC7500\u5BB6\u4F01\u4E1A\u5BA2\u6237\uFF0C\u6DB5\u76D6\u91D1\u878D\u3001\u5236\u9020\u3001\u96F6\u552E\u3001\u533B\u7597\u7B49\u591A\u4E2A\u884C\u4E1A\u3002\u5728\u9996\u9875\u53EF\u4EE5\u770B\u5230\u90E8\u5206\u6210\u529F\u6848\u4F8B\uFF0C\u4E5F\u6B22\u8FCE\u9884\u7EA6\u6F14\u793A\u4E86\u89E3\u66F4\u591A\uFF01';
            else if (msg.indexOf('\u65F6\u95F4') !== -1 || msg.indexOf('\u5468\u671F') !== -1) return '\u5C0F\u578B\u6570\u5B57\u5316\u9879\u76EE\u901A\u5E381-3\u4E2A\u6708\uFF0C\u4E2D\u5927\u578B\u4F01\u4E1A\u7EA7\u6570\u5B57\u5316\u8F6C\u578B\u9700\u89816-18\u4E2A\u6708\u3002\u6211\u4EEC\u4F1A\u5728\u54A8\u8BE2\u9636\u6BB5\u63D0\u4F9B\u8BE6\u7EC6\u7684\u9879\u76EE\u5468\u671F\u89C4\u5212\u3002';
            else if (msg.indexOf('\u8054\u7CFB') !== -1 || msg.indexOf('\u7535\u8BDD') !== -1) return '\u60A8\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u8054\u7CFB\u6211\u4EEC\uFF1A\ud83d\udce7 contact@xingchen.com \ud83d\udcde 400-888-8888\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u586B\u5199<a href="contact.html">\u5728\u7EBF\u8868\u5355</a>\u3002';
            else if (msg.indexOf('\u597D') !== -1 || msg.indexOf('\u8C22\u8C22') !== -1 || msg.indexOf('\u611F\u8C22') !== -1) return '\u611F\u8C22\u60A8\u7684\u8BA4\u53EF\uFF01\u5982\u6709\u4EFB\u4F55\u95EE\u9898\u968F\u65F6\u627E\u6211 \uD83D\uDE0A';
            else return '\u611F\u8C22\u60A8\u7684\u54A8\u8BE2\uFF01\u4E3A\u4E86\u66F4\u597D\u5730\u5E2E\u60A8\uFF0C\u8BF7\u544A\u8BC9\u6211\u60A8\u5173\u6CE8\u54EA\u65B9\u9762\uFF1A\u6570\u5B57\u5316\u54A8\u8BE2\u3001\u6570\u636E\u5E73\u53F0\u5EFA\u8BBE\u3001\u4E91\u67B6\u6784\u8FC1\u79FB\uFF0C\u8FD8\u662F\u6280\u672F\u652F\u6301\uFF1F\u60A8\u4E5F\u53EF\u4EE5\u76F4\u63A5<a href="contact.html">\u586B\u5199\u8868\u5355</a>\u83B7\u53D6\u4E13\u5C5E\u65B9\u6848\u3002';
        }

        function addMessage(text, type) {
            var msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message ' + type;
            msgDiv.innerHTML = text;
            chatBody.appendChild(msgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function handleSend() {
            var text = chatInput.value.trim();
            if (!text) return;
            addMessage(text, 'user');
            chatInput.value = '';
            setTimeout(function() { addMessage(getBotReply(text), 'bot'); }, 600);
        }

        if (chatSend && chatInput) {
            chatSend.addEventListener('click', handleSend);
            chatInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') handleSend(); });
        }

        quickReplies.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var q = this.textContent;
                addMessage(q, 'user');
                setTimeout(function() { addMessage(getBotReply(q), 'bot'); }, 500);
            });
        });

        document.addEventListener('click', function(e) {
            if (isOpen && !chatPanel.contains(e.target) && !chatToggle.contains(e.target)) closeChat();
        });
    }
    initChatWidget();

    // ========== 增强表单验证 ==========
    function initFormValidation() {
        var form = document.getElementById('contactForm');
        var formSuccess = document.getElementById('formSuccess');
        if (!form) return;

        function showError(input, message) {
            var existing = input.parentElement.querySelector('.form-error');
            if (existing) existing.remove();
            var error = document.createElement('span');
            error.className = 'form-error';
            error.textContent = message;
            error.style.cssText = 'color:#ef4444;font-size:12px;display:block;margin-top:4px;animation:fadeInUp 0.3s ease;';
            input.parentElement.appendChild(error);
            input.style.borderColor = '#ef4444';
            input.addEventListener('input', function clearError() {
                input.style.borderColor = '';
                var err = input.parentElement.querySelector('.form-error');
                if (err) err.remove();
                input.removeEventListener('input', clearError);
            });
        }

        function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var isValid = true;
            var nameInput = document.getElementById('name');
            var emailInput = document.getElementById('email');
            var messageInput = document.getElementById('message');
            form.querySelectorAll('.form-error').forEach(function(el) { el.remove(); });
            form.querySelectorAll('input, textarea').forEach(function(el) { el.style.borderColor = ''; });
            if (!nameInput.value.trim()) { showError(nameInput, '\u8BF7\u8F93\u5165\u60A8\u7684\u59D3\u540D'); isValid = false; }
            if (!emailInput.value.trim()) { showError(emailInput, '\u8BF7\u8F93\u5165\u60A8\u7684\u90AE\u7BB1'); isValid = false; }
            else if (!validateEmail(emailInput.value.trim())) { showError(emailInput, '\u8BF7\u8F93\u5165\u6709\u6548\u7684\u90AE\u7BB1\u5730\u5740'); isValid = false; }
            if (!messageInput.value.trim()) { showError(messageInput, '\u8BF7\u8F93\u5165\u7559\u8A00\u5185\u5BB9'); isValid = false; }
            else if (messageInput.value.trim().length < 5) { showError(messageInput, '\u7559\u8A00\u5185\u5BB9\u81F3\u5C115\u4E2A\u5B57\u7B26'); isValid = false; }
            if (!isValid) return;
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            submitBtn.textContent = '\u53D1\u9001\u4E2D...';
            submitBtn.disabled = true;
            setTimeout(function() {
                form.style.display = 'none';
                formSuccess.style.display = 'block';
                setTimeout(function() {
                    form.style.display = 'block';
                    formSuccess.style.display = 'none';
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
    initFormValidation();

    // ========== 新闻通讯订阅 ==========
    function initNewsletter() {
        var forms = document.querySelectorAll('.footer-newsletter');
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var input = form.querySelector('input');
                var btn = form.querySelector('button');
                if (!input || !input.value.trim()) return;
                var email = input.value.trim();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    input.style.borderColor = '#ef4444';
                    setTimeout(function() { input.style.borderColor = ''; }, 2000);
                    return;
                }
                var originalText = btn.textContent;
                btn.textContent = '\u5DF2\u8BA2\u9605 \u2713';
                btn.style.background = '#22c55e';
                input.value = '';
                setTimeout(function() { btn.textContent = originalText; btn.style.background = ''; }, 2500);
            });
        });
        var blogNewsletter = document.querySelector('.newsletter-form');
        if (blogNewsletter) {
            blogNewsletter.addEventListener('submit', function(e) {
                e.preventDefault();
                var input = blogNewsletter.querySelector('input');
                if (!input || !input.value.trim()) return;
                var email = input.value.trim();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    input.style.borderColor = '#ef4444';
                    setTimeout(function() { input.style.borderColor = ''; }, 2000);
                    return;
                }
                var btn = blogNewsletter.querySelector('button');
                var originalText = btn.textContent;
                btn.textContent = '\u8BA2\u9605\u6210\u529F \u2713';
                btn.style.background = '#22c55e';
                input.value = '';
                setTimeout(function() { btn.textContent = originalText; btn.style.background = ''; }, 2500);
            });
        }
    }
    initNewsletter();
});

// CSS 动画关键帧注入
(function() {
    const style = document.createElement('style');
    style.textContent = '@keyframes ripple { to { transform: scale(20); opacity: 0; } }';
    document.head.appendChild(style);
})();
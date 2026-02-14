/* ============================================================
   Valentine's Day — Main Script
   ============================================================ */

(function () {
    'use strict';

    // ========== CONFIGURATION ==========
    // To change slide content, edit the `slides` array below.
    // To change images, replace the files in the /images folder
    // and update the `image` path for each slide.

    const slides = [
        {
            image: 'images/photo1.jpg',       // <-- Replace with your actual image
            title: 'Chapter One',
            caption: 'Before you, my days were ordinary — like pages of a book with no story worth telling. And then you walked in, and suddenly every moment had color, every silence had meaning. This is where it all began.'
        },
        {
            image: 'images/photo2.jpg',       // <-- Replace with your actual image
            title: 'The Way You Smile',
            caption: 'There\'s this thing you do — you smile, and the whole world goes quiet. It\'s not fair, really. One look from you and I forget every worry I\'ve ever had. You have no idea the power you hold over me.'
        },
        {
            image: 'images/photo3.jpg',       // <-- Replace with your actual image
            title: 'Our Little World',
            caption: 'In a world of billions, somehow we found each other. Every late-night conversation, every stolen glance, every inside joke — they\'re all tiny miracles. You\'re my favorite miracle, babe.'
        },
        {
            image: 'images/photo4.jpg',       // <-- Replace with your actual image
            title: 'What You Mean to Me',
            caption: 'You are the calm in my chaos, the warmth on my coldest days, and the reason I believe that love isn\'t just a word — it\'s something you can feel in your bones. You make everything make sense.'
        },
        {
            image: 'images/photo5.jpg',       // <-- Replace with your actual image
            title: 'Forever & Always',
            caption: 'If I could bottle up this feeling and keep it forever, I would. But I don\'t need to — because I have you. And as long as I have you, every day is Valentine\'s Day. I love you, babe. Always.'
        }
    ];


    async function _h(s) {
        const d = new TextEncoder().encode(s.trim());
        const h = await crypto.subtle.digest('SHA-256', d);
        return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const _k = '95d44c4185167115121eb711a477cd3e37bddf107e3150573130b6cecf1e2301';


    // ========== FLOATING HEARTS (Public Page) ==========
    function createFloatingHearts() {
        const container = document.getElementById('hearts-bg');
        if (!container) return;
        const hearts = ['♥', '♡', '💕', '💗', '🌸', '✿'];

        function spawnHeart() {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
            heart.style.animationDuration = (6 + Math.random() * 8) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 16000);
        }

        // Initial batch
        for (let i = 0; i < 8; i++) {
            setTimeout(spawnHeart, i * 400);
        }
        // Continuous
        setInterval(spawnHeart, 1800);
    }


    // ========== SPARKLE BURST (Secret Page) ==========
    function createSparkleBurst() {
        const container = document.getElementById('sparkle-burst');
        if (!container) return;
        const emojis = ['✨', '💖', '⭐', '💕', '🌟', '💗', '✧'];

        for (let i = 0; i < 12; i++) {
            const spark = document.createElement('span');
            spark.className = 'sparkle';
            spark.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const angle = (360 / 12) * i;
            const distance = 60 + Math.random() * 80;
            const x = Math.cos(angle * Math.PI / 180) * distance;
            const y = Math.sin(angle * Math.PI / 180) * distance;
            spark.style.animationDelay = (i * 0.1) + 's';
            spark.style.setProperty('--tx', x + 'px');
            spark.style.setProperty('--ty', y + 'px');
            spark.style.animation = `sparklePop 1.5s ease-out ${i * 0.1}s forwards`;
            spark.style.left = '0';
            spark.style.top = '0';
            // Set final translate via keyframe override
            spark.addEventListener('animationstart', () => {
                spark.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            });
            container.appendChild(spark);
        }
    }


    // ========== SLIDESHOW ==========
    let currentSlide = 0;

    function buildSlideshow() {
        const slideshow = document.getElementById('slideshow');
        const dotsContainer = document.getElementById('slide-dots');
        if (!slideshow || !dotsContainer) return;

        slides.forEach((slide, index) => {
            // Create slide element
            const slideEl = document.createElement('div');
            slideEl.className = 'slide' + (index === 0 ? ' active' : '');
            slideEl.innerHTML = `
                <div class="slide-image-container">
                    <div class="slide-placeholder">
                        📸
                        <span>Photo ${index + 1} — replace in /images</span>
                    </div>
                    <span class="slide-number">${index + 1} / ${slides.length}</span>
                </div>
                <div class="slide-content">
                    <h3 class="slide-caption-title">${slide.title}</h3>
                    <p class="slide-caption">${slide.caption}</p>
                </div>
            `;
            slideshow.appendChild(slideEl);

            // Create dot
            const dot = document.createElement('span');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        const allSlides = document.querySelectorAll('.slide');
        const allDots = document.querySelectorAll('.dot');

        allSlides[currentSlide].classList.remove('active');
        allDots[currentSlide].classList.remove('active');

        currentSlide = index;

        allSlides[currentSlide].classList.add('active');
        allDots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }


    // ========== TRANSITION TO SECRET PAGE ==========
    function unlockSecretPage() {
        const publicPage = document.getElementById('public-page');
        const secretPage = document.getElementById('secret-page');

        // Fade out public page
        publicPage.style.transition = 'opacity 0.8s ease';
        publicPage.style.opacity = '0';

        setTimeout(() => {
            publicPage.classList.remove('active');
            secretPage.classList.add('active');

            // Build and start secret page elements
            buildSlideshow();
            createSparkleBurst();

            // Remove entrance overlay after animation
            setTimeout(() => {
                const entrance = document.getElementById('secret-entrance');
                if (entrance) entrance.style.display = 'none';
            }, 4000);
        }, 800);
    }


    // ========== MESSAGE INPUT HANDLING ==========
    function handleSend() {
        const input = document.getElementById('secret-input');
        const hint = document.getElementById('message-hint');
        const sentMessages = document.getElementById('sent-messages');
        const value = input.value.trim();

        if (!value) return;

        // Check against obfuscated keyword
        _h(value).then(hash => {
            if (hash === _k) {
                // ✅ Correct keyword — unlock!
                hint.textContent = '💖';
                hint.className = 'message-hint';
                input.disabled = true;
                unlockSecretPage();
            } else {
                // Show as a normal sent message (cover mechanism)
                const bubble = document.createElement('div');
                bubble.className = 'sent-bubble';
                bubble.textContent = '💌 "' + value + '" — sent!';
                sentMessages.appendChild(bubble);

                // Subtle hint for retry
                hint.textContent = 'Sweet! Send another? 💕';
                hint.className = 'message-hint';

                input.value = '';
                input.focus();
            }
        });
    }


    // ========== LOADING ACTUAL IMAGES ==========
    // This function checks if an image file exists and replaces the placeholder.
    // When you add real photos, they'll automatically show up.
    function loadSlideImages() {
        setTimeout(() => {
            const allSlides = document.querySelectorAll('.slide');
            allSlides.forEach((slide, i) => {
                const imgPath = slides[i].image;
                const container = slide.querySelector('.slide-image-container');
                const placeholder = slide.querySelector('.slide-placeholder');

                const img = new Image();
                img.onload = function () {
                    const imgEl = document.createElement('img');
                    imgEl.className = 'slide-image';
                    imgEl.src = imgPath;
                    imgEl.alt = slides[i].title;
                    if (placeholder) placeholder.style.display = 'none';
                    container.insertBefore(imgEl, container.firstChild);
                };
                img.src = imgPath;
            });
        }, 4500); // Wait for secret page animations
    }


    // ========== INIT ==========
    function init() {
        createFloatingHearts();

        // Send button click
        const sendBtn = document.getElementById('send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', handleSend);
        }

        // Enter key in input
        const input = document.getElementById('secret-input');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') handleSend();
            });
        }

        // Slideshow controls
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // Keyboard navigation for slideshow
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('secret-page').classList.contains('active')) return;
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

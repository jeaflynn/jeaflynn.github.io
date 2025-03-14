document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    if (!track || !slides.length || !prevButton || !nextButton) {
        return;
    }
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    function setupCarousel() {
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
        updateActiveSlide();
    }

    function updateActiveSlide() {
        const allSlides = track.querySelectorAll('.gallery-slide');
        allSlides.forEach(slide => slide.classList.remove('active'));
        
        const centerIndex = currentIndex + totalSlides;
        allSlides[centerIndex].classList.add('active');
        
        track.style.transform = `translateX(calc(-${currentIndex * (100 / 3)}%))`;
    }
    
    setupCarousel();
    
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % totalSlides;;
        updateSlides();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;;
        updateSlides();
    });
});
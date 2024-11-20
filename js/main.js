// Встановлюємо слайдер "Commercial" активним на старті
window.onload = function () {
    const defaultSlide = document.querySelector('.main__offer__install');
    defaultSlide.classList.add('default-active'); // Активуємо початковий слайдер
};

// Логіка для показу слайдів з анімацією
function showSlide(type) {
    // Вибираємо всі слайди
    let slides = document.querySelectorAll('.main__offer__install');
    
    // Перебираємо всі слайди
    slides.forEach(slide => {
        const title = slide.querySelector('.main__offer__install-desc-title').textContent.trim();

        if (title === type) {
            slide.style.display = 'flex'; // Показуємо слайдер
            setTimeout(() => {
                slide.classList.add('active'); // Додаємо анімацію
                slide.classList.remove('default-active'); // Забираємо стартовий стан
            }, 10);
        } else {
            slide.classList.remove('active'); // Забираємо анімацію
            slide.classList.remove('default-active'); // Забираємо стартовий стан
            setTimeout(() => (slide.style.display = 'none'), 500); // Ховаємо через 500 мс (час анімації)
        }
    });
}

// Підключаємо події до кнопок
document.getElementById('commercial').onclick = function () {
    showSlide('Commercial');
};

document.getElementById('residential').onclick = function () {
    showSlide('Residential');
};

document.getElementById('industrial').onclick = function () {
    showSlide('Industrial');
};


const slides = document.querySelectorAll('.main__clients__testimonial-comment');
let currentSlide = 0;

function changeSlide(next = true) {
    slides[currentSlide].classList.remove('active', 'slide-in-right', 'slide-in-left');
    const oldSlide = currentSlide;
    currentSlide = next ? (currentSlide + 1) % slides.length : (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active', next ? 'slide-in-right' : 'slide-in-left');
}

document.getElementById('next').onclick = function () {
    changeSlide(true);
};

document.getElementById('prev').onclick = function () {
    changeSlide(false);
};


// 3 фрагмент скрипта
const time = 1000;
const step = 1;

function outNum(num, element, time = 2000, step = 1) {
    let n = 0;
    const t = Math.round(time / (num / step));

    const interval = setInterval(() => {
        n += step;
        if (n >= num) {
            clearInterval(interval);
            n = num; // Щоб уникнути перевищення кінцевого значення
        }
        element.textContent = n;
    }, t);
}

function animateOnView(selector) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const numText = element.textContent.replace(/\D/g, ''); // Видаляємо всі нечислові символи
                const num = parseInt(numText, 10);

                if (!isNaN(num)) {
                    outNum(num, element);
                }
                
                observer.unobserve(element); // Зупиняємо спостереження після запуску анімації
            }
        });
    }, {
        threshold: 0.5 // Запуск анімації, коли 50% елемента буде у полі зору
    });
    
    elements.forEach(element => observer.observe(element));
}

// Виклик функції для числа 35
animateOnView('.main__welcome__desc-exp-years-title');

// Виклик функції для всіх чисел у списку
animateOnView('.main__reasons__poster-stats-item-num');


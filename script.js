document.addEventListener('DOMContentLoaded', function() {
    // Элементы двери
    const doorEntry = document.querySelector('.door-entry');
    const doorFrame = document.querySelector('.door-frame');
    const mainContent = document.querySelector('.main-content');
    const preloader = document.querySelector('.preloader');

    // Модальное окно
    const modal = document.getElementById('developmentModal');
    const modalCloseButtons = modal.querySelectorAll('.modal-close, .modal-btn');
    const disabledCards = document.querySelectorAll('.disabled-card');

    // Инициализация
    function init() {
        // Скрываем основной контент изначально
        mainContent.style.display = 'none';
        
        // Показываем прелоадер
        preloader.style.display = 'flex';
        
        // Устанавливаем обработчики событий
        setupDoor();
        setupModal();
        setupDisabledCards();
    }

    // Настройка двери
    function setupDoor() {
        doorFrame.addEventListener('click', openDoor);
        
        // Также можно открывать дверь по нажатию любой клавиши
        document.addEventListener('keydown', function(e) {
            if (doorEntry.style.display !== 'none') {
                openDoor();
            }
        });
    }

    // Функция открытия двери
    function openDoor() {
        // Добавляем класс для анимации
        doorEntry.classList.add('door-opening');
        
        // Запускаем звук открытия двери (опционально)
        playDoorSound();
        
        // Через 1 секунду показываем прелоадер
        setTimeout(() => {
            doorEntry.style.opacity = '0';
            
            // Через 0.5 секунды скрываем дверь и показываем контент
            setTimeout(() => {
                doorEntry.style.display = 'none';
                
                // Показываем основной контент
                mainContent.style.display = 'block';
                
                // Скрываем прелоадер
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        
                        // Анимируем появление контента
                        setTimeout(() => {
                            mainContent.style.opacity = '1';
                        }, 100);
                    }, 500);
                }, 1000);
            }, 500);
        }, 1200);
    }

    // Настройка модального окна
    function setupModal() {
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        // Закрытие по клику на фон
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Показ модального окна
    function showModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Настройка отключенных карточек
    function setupDisabledCards() {
        disabledCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showModal();
            });
        });
    }

    // Функция для воспроизведения звука
    function playDoorSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1.2);
        } catch (e) {
            console.log('Audio context not supported');
        }
    }

    // Инициализация анимированных иконок
    function initFloatingIcons() {
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 2}s`;
        });
    }

    // Анимация появления карточек
    function animateCards() {
        const cards = document.querySelectorAll('.grid-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    }

    // Инициализация при загрузке
    init();
    initFloatingIcons();

    // Анимация карточек после загрузки контента
    setTimeout(animateCards, 1500);

    // Эффект параллакса для фона
    window.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        const particles = document.querySelector('.particles');
        if (particles) {
            particles.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // Анимация для статистики в футере
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 30);
        });
    }

    // Запуск анимации статистики
    setTimeout(animateStats, 2000);

    // Анимация свечения при наведении на карточки
    const gridCards = document.querySelectorAll('.grid-card:not(.disabled-card)');
    gridCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 30%, var(--primary-glow) 70%, transparent 100%)`;
            }
        });
    });
});

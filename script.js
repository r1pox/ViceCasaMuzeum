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
        console.log('Инициализация страницы...');
        
        // Скрываем основной контент изначально
        if (mainContent) {
            mainContent.style.display = 'none';
            mainContent.style.opacity = '0';
        }
        
        // Показываем прелоадер
        if (preloader) {
            preloader.style.display = 'flex';
            preloader.style.opacity = '1';
        }
        
        // Устанавливаем обработчики событий
        setupDoor();
        setupModal();
        setupDisabledCards();
        
        console.log('Инициализация завершена');
    }

    // Настройка двери
    function setupDoor() {
        if (!doorFrame) {
            console.error('Элемент .door-frame не найден');
            return;
        }
        
        doorFrame.addEventListener('click', openDoor);
        
        // Также можно открывать дверь по нажатию любой клавиши
        document.addEventListener('keydown', function(e) {
            if (doorEntry && doorEntry.style.display !== 'none') {
                openDoor();
            }
        });
        
        console.log('Дверь настроена');
    }

    // Функция открытия двери
    function openDoor() {
        console.log('Открытие двери...');
        
        // Добавляем класс для анимации
        doorEntry.classList.add('door-opening');
        
        // Запускаем звук открытия двери (опционально)
        playDoorSound();
        
        // Через 1 секунду начинаем скрывать дверь
        setTimeout(() => {
            doorEntry.style.opacity = '0';
            
            // Через 0.5 секунды скрываем дверь и показываем контент
            setTimeout(() => {
                doorEntry.style.display = 'none';
                
                // Показываем основной контент
                if (mainContent) {
                    mainContent.style.display = 'block';
                    
                    // Даем время для отрисовки
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 50);
                }
                
                // Скрываем прелоадер
                if (preloader) {
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 500);
                    }, 1000);
                }
                
                // Инициализируем анимации контента
                setTimeout(() => {
                    initContentAnimations();
                }, 1500);
                
            }, 500);
        }, 1200);
    }

    // Настройка модального окна
    function setupModal() {
        if (!modal) {
            console.warn('Модальное окно не найдено');
            return;
        }
        
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        // Закрытие по клику на фон
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        console.log('Модальное окно настроено');
    }

    // Показ модального окна
    function showModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Закрытие модального окна
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Настройка отключенных карточек
    function setupDisabledCards() {
        if (disabledCards.length === 0) {
            console.warn('Отключенные карточки не найдены');
            return;
        }
        
        disabledCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showModal();
            });
        });
        
        console.log('Отключенные карточки настроены: ' + disabledCards.length);
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
            
            console.log('Звук двери воспроизведен');
        } catch (e) {
            console.log('Audio context не поддерживается');
        }
    }

    // Инициализация анимаций контента
    function initContentAnimations() {
        console.log('Инициализация анимаций контента...');
        
        // Анимация плавающих иконок
        initFloatingIcons();
        
        // Анимация карточек
        animateCards();
        
        // Анимация статистики
        animateStats();
        
        // Эффект параллакса для фона
        initParallaxEffect();
        
        // Анимация свечения при наведении на карточки
        initHoverEffects();
    }

    // Инициализация плавающих иконок
    function initFloatingIcons() {
        const icons = document.querySelectorAll('.floating-icon');
        console.log('Плавающие иконки найдены: ' + icons.length);
        
        icons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 2}s`;
        });
    }

    // Анимация появления карточек
    function animateCards() {
        const cards = document.querySelectorAll('.grid-card');
        console.log('Карточки для анимации: ' + cards.length);
        
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

    // Анимация для статистики
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        console.log('Элементы статистики: ' + stats.length);
        
        stats.forEach(stat => {
            const text = stat.textContent;
            const target = parseInt(text);
            
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = text; // Возвращаем оригинальный текст с +
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 30);
        });
    }

    // Оптимизированный script.js
document.addEventListener('DOMContentLoaded', function() {
    // Быстрая инициализация
    const doorEntry = document.querySelector('.door-entry');
    const doorFrame = document.querySelector('.door-frame');
    const preloader = document.querySelector('.preloader');
    const mainContent = document.querySelector('.main-content');
    
    // Функция для быстрого открытия
    function quickOpen() {
        // Сразу скрываем дверь
        doorEntry.style.opacity = '0';
        doorEntry.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            doorEntry.style.display = 'none';
            preloader.style.display = 'flex';
            
            // Быстрая загрузка - всего 1 секунда
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    // Загружаем остальные стили лениво
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                        loadLazyStyles();
                        initAnimations();
                    }, 10);
                }, 300);
            }, 1000);
        }, 300);
    }
    
    // Обработчик клика
    if (doorFrame) {
        doorFrame.addEventListener('click', quickOpen);
        
        // Автоматическое открытие через 5 секунд
        setTimeout(() => {
            if (doorEntry.style.display !== 'none') {
                quickOpen();
            }
        }, 5000);
    }
    
    // Функция ленивой загрузки стилей
    function loadLazyStyles() {
        // Создаем стиль для анимаций и эффектов
        const lazyStyles = `
            /* Анимации для дверей */
            .door-left { transform: rotateY(-120deg); }
            .door-right { transform: rotateY(120deg); }
            
            /* Более сложные эффекты */
            .door-overlay {
                background: radial-gradient(circle at 50% 50%, rgba(20,20,20,0.9) 0%, #000 70%),
                           repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(40,40,40,0.1) 2px, rgba(40,40,40,0.1) 4px);
            }
            
            /* Парящие иконки */
            .floating-icon {
                animation: float 6s infinite ease-in-out;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-10px) rotate(5deg); }
            }
        `;
        
        // Добавляем стили в документ
        const style = document.createElement('style');
        style.textContent = lazyStyles;
        document.head.appendChild(style);
    }
    
    // Инициализация анимаций после загрузки
    function initAnimations() {
        // Простые обработчики для модального окна
        document.querySelectorAll('.disabled, .disabled-card').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('developmentModal').style.display = 'flex';
            });
        });
        
        // Закрытие модального окна
        document.querySelectorAll('.modal-close, .modal-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.getElementById('developmentModal').style.display = 'none';
            });
        });
    }
});

    // Эффект параллакса для фона
    function initParallaxEffect() {
        window.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const particles = document.querySelector('.particles');
            if (particles) {
                particles.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }

    // Анимация свечения при наведении на карточки
    function initHoverEffects() {
        const gridCards = document.querySelectorAll('.grid-card:not(.disabled-card)');
        
        gridCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const glow = this.querySelector('.card-glow');
                if (glow) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 30%, rgba(212, 175, 55, 0.3) 70%, transparent 100%)`;
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const glow = this.querySelector('.card-glow');
                if (glow) {
                    glow.style.background = 'radial-gradient(circle at center, transparent 30%, rgba(212, 175, 55, 0.3) 70%, transparent 100%)';
                }
            });
        });
    }

    // Инициализация при загрузке
    console.log('DOM загружен');
    init();
    
    // Отладка: выводим список найденных элементов
    console.log('Найденные элементы:');
    console.log('- door-entry:', document.querySelector('.door-entry'));
    console.log('- door-frame:', doorFrame);
    console.log('- main-content:', mainContent);
    console.log('- preloader:', preloader);
    console.log('- modal:', modal);
    console.log('- disabled-cards:', disabledCards.length);
});

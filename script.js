document.addEventListener('DOMContentLoaded', function() {
    const doorEntry = document.querySelector('.door-entry');
    const doorFrame = document.querySelector('.door-frame');
    const doorLeft = document.querySelector('.door-left');
    const doorRight = document.querySelector('.door-right');
    const mainContent = document.querySelector('.main-content');
    const preloader = document.querySelector('.preloader');

    // Инициализация прелоадера
    if (preloader) {
        preloader.style.display = 'none';
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
            
            // Показываем прелоадер
            if (preloader) {
                preloader.style.display = 'flex';
                setTimeout(() => {
                    preloader.style.opacity = '1';
                }, 10);
            }
            
            // Через 0.5 секунды скрываем дверь и показываем контент
            setTimeout(() => {
                doorEntry.style.display = 'none';
                
                // Показываем основной контент
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.classList.add('fade-in');
                }, 10);
                
                // Скрываем прелоадер
                setTimeout(() => {
                    if (preloader) {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 500);
                    }
                }, 1000);
            }, 500);
        }, 1200);
    }

    // Функция для воспроизведения звука (опционально)
    function playDoorSound() {
        // Можно добавить реальный звук, например:
        // const audio = new Audio('door-open.mp3');
        // audio.play();
        
        // Создаём простой звуковой эффект с помощью Web Audio API
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

    // Обработчик клика на дверь
    doorFrame.addEventListener('click', openDoor);
    
    // Также можно открывать дверь по нажатию любой клавиши
    document.addEventListener('keydown', function(e) {
        if (!doorEntry.classList.contains('door-opening')) {
            openDoor();
        }
    });

    // Анимация свечения при загрузке
    setTimeout(() => {
        doorFrame.classList.add('loaded');
    }, 500);

    // Остальной существующий код...
    const serverTabButtons = document.querySelectorAll('.server-tab-button');
    const serverTabContents = document.querySelectorAll('.server-tab-content');

    if (serverTabButtons.length > 0) {
        serverTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                serverTabButtons.forEach(btn => btn.classList.remove('active'));
                serverTabContents.forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                const server = button.getAttribute('data-server');
                document.getElementById(`${server}-content`).classList.add('active');
            });
        });
    }

    function setupNumberTabs(container) {
        const numberTabButtons = container.querySelectorAll('.number-tab-button');
        const numberTabContents = container.querySelectorAll('.number-tab-content');

        numberTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                numberTabButtons.forEach(btn => btn.classList.remove('active'));
                numberTabContents.forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                const tab = button.getAttribute('data-tab');
                container.querySelector(`#${container.id}-${tab}`).classList.add('active');
            });
        });
    }

    document.querySelectorAll('.number-content').forEach(setupNumberTabs);
    
    const simkartFrames = document.querySelectorAll('.simkart-frame');
    if (simkartFrames.length > 0) {
        animateElements(simkartFrames);
    }
    
    const playerCards = document.querySelectorAll('.player-card');
    if (playerCards.length > 0) {
        animateElements(playerCards);
    }
    
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    if (parallaxLayers.length > 0) {
        initParallaxEffect(parallaxLayers);
    }

    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length > 0) {
        initCategoryFilter(categoryBtns);
    }

    const suggestionForm = document.querySelector('.suggestion-form');
    if (suggestionForm) {
        initSuggestionForm();
    }
});

// Остальные функции остаются без изменений...
function animateElements(elements) {
    setTimeout(() => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
}

function initParallaxEffect(layers) {
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
    
        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const xPos = x * speed * 100;
            const yPos = y * speed * 100;
            
            layer.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

function initCategoryFilter(buttons) {
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const playerCards = document.querySelectorAll('.player-card');
            playerCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initSuggestionForm() {
    const sendBtn = document.getElementById('send-suggestion');
    const textarea = document.getElementById('suggestion-text');
    const messageDiv = document.getElementById('form-message');

    sendBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const suggestion = textarea.value.trim();
        
        if (!suggestion) {
            showMessage('Пожалуйста, введите ваше предложение', 'error');
            return;
        }
        try {
            sendBtn.disabled = true;
            sendBtn.textContent = 'Отправка...';
            
            const response = await sendToDiscord(suggestion);
            
            if (response.ok) {
                showMessage('Спасибо! Ваше предложение отправлено', 'success');
                textarea.value = '';
            } else {
                throw new Error('Ошибка при отправке');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showMessage('Произошла ошибка при отправке', 'error');
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Отправить предложение';
        }
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 5000);
    }
}

async function sendToDiscord(message) {
    const webhookURL = 'https://discordapp.com/api/webhooks/1389177650714509422/CJUn9REtbc9GFzfWfquRMdVjth6bMANtLWi1Rf-x8Aax6cW_fpB68Mbh5TF7wmIW8DHj';
    
    const data = {
        content: `**Новое предложение для музея Casa-Grande:**\n${message}`,
        username: 'Музей Casa-Grande',
        avatar_url: 'https://i.imgur.com/abcdefg.png'
    };
    return fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    const serverTabButtons = document.querySelectorAll('.server-tab-button');
    const serverTabContents = document.querySelectorAll('.server-tab-content');

    serverTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            serverTabButtons.forEach(btn => btn.classList.remove('active'));
            serverTabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const server = button.getAttribute('data-server');
            document.getElementById(`${server}-content`).classList.add('active');
        });
    });

    function setupNumberTabs(container) {
        const numberTabButtons = container.querySelectorAll('.number-tab-button');
        const numberTabContents = container.querySelectorAll('.number-tab-content');

        numberTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                numberTabButtons.forEach(btn => btn.classList.remove('active'));
                numberTabContents.forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                const tab = button.getAttribute('data-tab');
                container.querySelector(`#${container.id}-${tab}`).classList.add('active');
            });
        });
    }

    document.querySelectorAll('.number-content').forEach(setupNumberTabs);
    const simkartFrames = document.querySelectorAll('.simkart-frame');
    if (simkartFrames.length > 0) {
        animateElements(simkartFrames);
    }
    const playerCards = document.querySelectorAll('.player-card');
    if (playerCards.length > 0) {
        animateElements(playerCards);
    }
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    if (parallaxLayers.length > 0) {
        initParallaxEffect(parallaxLayers);
    }

    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length > 0) {
        initCategoryFilter(categoryBtns);
    }

    const suggestionForm = document.querySelector('.suggestion-form');
    if (suggestionForm) {
        initSuggestionForm();
    }
});

function animateElements(elements) {
    setTimeout(() => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
}

function initParallaxEffect(layers) {
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
    
        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const xPos = x * speed * 100;
            const yPos = y * speed * 100;
            
            layer.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

function initCategoryFilter(buttons) {
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const playerCards = document.querySelectorAll('.player-card');
            playerCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initSuggestionForm() {
    const sendBtn = document.getElementById('send-suggestion');
    const textarea = document.getElementById('suggestion-text');
    const messageDiv = document.getElementById('form-message');

    sendBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const suggestion = textarea.value.trim();
        
        if (!suggestion) {
            showMessage('Пожалуйста, введите ваше предложение', 'error');
            return;
        }
        try {
            sendBtn.disabled = true;
            sendBtn.textContent = 'Отправка...';
            
            const response = await sendToDiscord(suggestion);
            
            if (response.ok) {
                showMessage('Спасибо! Ваше предложение отправлено', 'success');
                textarea.value = '';
            } else {
                throw new Error('Ошибка при отправке');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showMessage('Произошла ошибка при отправке', 'error');
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Отправить предложение';
        }
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 5000);
    }
}

async function sendToDiscord(message) {
    const webhookURL = 'https://discordapp.com/api/webhooks/1389177650714509422/CJUn9REtbc9GFzfWfquRMdVjth6bMANtLWi1Rf-x8Aax6cW_fpB68Mbh5TF7wmIW8DHj';
    
    const data = {
        content: `**Новое предложение для музея Casa-Grande:**\n${message}`,
        username: 'Музей Casa-Grande',
        avatar_url: 'https://i.imgur.com/abcdefg.png'
    };
    return fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

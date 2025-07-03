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

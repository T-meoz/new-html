// FAQ Manager class for handling FAQ functionality
class FAQManager {
    constructor(containerId) {
        this.faqContainer = document.getElementById(containerId);
        this.questions = [];
       
    }

    async init() {
        await this.loadQuestions();
        this.setupEventListeners();
    }

    async loadQuestions(skipDelay = false) {
    try {
        this.showLoadingState();

        // Bỏ delay nếu đang test
        if (!skipDelay) {
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        const response = await fetch('questions.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (!data.questions || data.questions.length === 0) {
            this.showEmptyState();
            return;
        }

        this.questions = data.questions;
        this.renderQuestions();
    } catch (error) {
        console.error('Error loading questions:', error);
        this.showErrorState(error.message);
    }
}

    showLoadingState() {
        this.faqContainer.innerHTML = `
            <div class="faq__loading" id="faq-loading">
                <div class="faq__loading-spinner"></div>
                <p>Đang tải câu hỏi...</p>
            </div>
        `;
    }

    showEmptyState() {
        this.faqContainer.innerHTML = `
            <div class="faq__empty">
                <div class="faq__empty-icon">❓</div>
                <h3>Không có câu hỏi nào</h3>
                <p>Hiện tại không có câu hỏi thường gặp nào để hiển thị.</p>
            </div>
        `;
    }

    showErrorState(errorMessage) {
        this.faqContainer.innerHTML = `
            <div class="faq__error">
                <div class="faq__error-icon">⚠️</div>
                <h3>Đã xảy ra lỗi</h3>
                <p>Không thể tải câu hỏi: ${errorMessage}</p>
                <button class="faq__retry-button" id="retry-loading">Thử lại</button>
            </div>
        `;

        document.getElementById('retry-loading').addEventListener('click', () => {
            this.loadQuestions();
        });
    }

    renderQuestions() {
        if (this.questions.length === 0) {
            this.showEmptyState();
            return;
        }

        const questionsHTML = this.questions.map((question, index) => `
            <div class="faq__item">
                <button class="faq__question" aria-expanded="false" aria-controls="faq-${index}">
                    ${question.question}
                    <span class="faq__icon">+</span>
                </button>
                <div id="faq-${index}" class="faq__answer" aria-hidden="true">
                    ${question.answer}
                </div>
            </div>
        `).join('');

        this.faqContainer.innerHTML = questionsHTML;
        this.setupFAQToggle();
    }

    setupFAQToggle() {
        const faqQuestions = this.faqContainer.querySelectorAll('.faq__question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentNode;
                const answer = item.querySelector('.faq__answer');
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                this.faqContainer.querySelectorAll('.faq__item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq__question');
                        const otherAnswer = otherItem.querySelector('.faq__answer');
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.setAttribute('aria-hidden', 'true');
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.setAttribute('aria-hidden', 'false');
                } else {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                    answer.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Add keyboard support for FAQ
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }

    setupEventListeners() {
        // Additional event listeners can be added here if needed
    }


}
module.exports = { FAQManager };

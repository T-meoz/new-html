// JavaScript for improved accessibility and UX
class FAQManager {
    constructor() {
        this.faqContainer = document.getElementById('faq-container');
        this.questions = [];
        this.init();
    }

    async init() {
        await this.loadQuestions();
        this.setupEventListeners();
    }

    async loadQuestions() {
        try {
            this.showLoadingState();
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const response = await fetch('questions.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
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
                <div id="faq-${index}" class="faq__answer">
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
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                this.faqContainer.querySelectorAll('.faq__item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                } else {
                    question.setAttribute('aria-expanded', 'false');
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
        // Focus management for CTA button
        const mainCta = document.querySelector('.main__cta');
        if (mainCta) {
            mainCta.addEventListener('click', (e) => {
                // In a real application, this would open a registration form/modal
                alert('Chức năng đăng ký sẽ được mở. Trong ứng dụng thực tế, đây sẽ là form đăng ký.');
            });
        }
        
        // Improve focus visibility for all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        interactiveElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--focus-color)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Focus the target for keyboard users
                    if (targetId !== '#main-content') {
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus();
                    }
                }
            });
        });
    }
}

// Main script file
import { FAQManager } from './faqManager.js';

// Initialize the FAQ manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup global event listeners
    setupGlobalEventListeners();
    
    // Initialize FAQ Manager
    new FAQManager('faq-container');
});

function setupGlobalEventListeners() {
    // Focus management for CTA button
    const mainCta = document.querySelector('.main__cta');
    if (mainCta) {
        mainCta.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real application, this would open a registration form/modal
            alert('Chức năng đăng ký sẽ được mở. Trong ứng dụng thực tế, đây sẽ là form đăng ký.');
        });
    }
    
    // Improve focus visibility for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--focus-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Focus the target for keyboard users
                if (targetId !== '#main-content') {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            }
        });
    });
}
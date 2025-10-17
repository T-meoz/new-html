// JavaScript for improved accessibility and UX
document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq__question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentNode;
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq__item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            } else {
                this.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Add keyboard support for FAQ
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management for CTA button
    const mainCta = document.querySelector('.main__cta');
    if (mainCta) {
        mainCta.addEventListener('click', function(e) {
            // In a real application, this would open a registration form/modal
            alert('Chức năng đăng ký sẽ được mở. Trong ứng dụng thực tế, đây sẽ là form đăng ký.');
            
            // Focus would be moved to the first field of the registration form
            // document.getElementById('first-name').focus();
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
    
    document.addEventListener('DOMContentLoaded', () => {
    
    // Lấy tất cả các phần tử câu hỏi FAQ
    const faqQuestions = document.querySelectorAll('.faq__question');
    
    // Lặp qua mỗi câu hỏi và thêm sự kiện 'click'
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Lấy phần tử cha (.faq__item) của câu hỏi được click
            const item = question.parentElement;
            
            // Thêm hoặc xóa class 'active' để hiển thị hoặc ẩn câu trả lời
            item.classList.toggle('active');
        });
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
});
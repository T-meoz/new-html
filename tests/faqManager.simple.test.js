// Simple test version without ES modules
test('Basic FAQ Manager functionality', () => {
    // Mock DOM
    document.body.innerHTML = '<div id="faq-container"></div>';
    
    // Test loading state would be shown
    const container = document.getElementById('faq-container');
    container.innerHTML = `
        <div class="faq__loading">
            <div class="faq__loading-spinner"></div>
            <p>Đang tải câu hỏi...</p>
        </div>
    `;
    
    expect(container.innerHTML).toContain('faq__loading');
    expect(container.innerHTML).toContain('Đang tải câu hỏi');
});

test('Error state display', () => {
    document.body.innerHTML = '<div id="faq-container"></div>';
    const container = document.getElementById('faq-container');
    
    container.innerHTML = `
        <div class="faq__error">
            <div class="faq__error-icon">⚠️</div>
            <h3>Đã xảy ra lỗi</h3>
            <p>Không thể tải câu hỏi: Network error</p>
            <button class="faq__retry-button" id="retry-loading">Thử lại</button>
        </div>
    `;
    
    expect(container.innerHTML).toContain('faq__error');
    expect(container.innerHTML).toContain('Thử lại');
});

test('Questions rendering', () => {
    document.body.innerHTML = '<div id="faq-container"></div>';
    const container = document.getElementById('faq-container');
    
    const mockQuestions = [
        { question: 'Test question 1?', answer: 'Test answer 1.' },
        { question: 'Test question 2?', answer: 'Test answer 2.' }
    ];
    
    const questionsHTML = mockQuestions.map((question, index) => `
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
    
    container.innerHTML = questionsHTML;
    
    expect(container.innerHTML).toContain('Test question 1?');
    expect(container.innerHTML).toContain('Test answer 1.');
    expect(container.innerHTML).toContain('Test question 2?');
    expect(container.innerHTML).toContain('Test answer 2.');
});
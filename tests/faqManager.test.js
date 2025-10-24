/**
 * @jest-environment jsdom
 */

const { FAQManager } = require('../js/faqManager.js');

global.fetch = jest.fn();
jest.useFakeTimers();

describe('FAQManager', () => {
  let faqManager;

  beforeEach(() => {
    document.body.innerHTML = '<div id="faq-container"></div>';
    jest.spyOn(console, 'error').mockImplementation(() => {});
    faqManager = new FAQManager('faq-container');

    // ✅ Mock mặc định fetch
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ questions: [] })
    });

    jest.clearAllMocks();
  });

  afterAll(() => {
  console.error.mockRestore();
});

  test('should display loading state initially', async () => {
    // SỬA 3: Vì init() không tự chạy, test này phải
    // tự gọi hàm load và kiểm tra trạng thái loading.
    
    // Bắt đầu load, KHÔNG await
    const promise = faqManager.loadQuestions();
    
    // Kiểm tra ngay lập tức xem trạng thái loading đã hiển thị chưa
    const container = document.getElementById('faq-container');
    expect(container.innerHTML).toContain('faq__loading');
    expect(container.innerHTML).toContain('Đang tải câu hỏi');

    // Dọn dẹp (để test kết thúc)
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ questions: [] }) });
    jest.advanceTimersByTime(1500); // Tua nhanh 1.5s
    await promise; // Chờ promise hoàn thành
  });

  test('should render questions when data is loaded successfully', async () => {
    const mockQuestions = {
      questions: [
        {
          id: 1,
          question: 'Test question?',
          answer: 'Test answer.'
        }
      ]
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuestions
    });

    // SỬA 4: Áp dụng "timer pattern"
    // Bắt đầu load, KHÔNG await
    const promise = faqManager.loadQuestions();

    // Tua nhanh 1.5s của setTimeout
    jest.advanceTimersByTime(1500);

    // Bây giờ hẵng await promise
    await promise;

    const container = document.getElementById('faq-container');
    expect(container.innerHTML).toContain('Test question?');
    expect(container.innerHTML).toContain('Test answer.');
  });

  test('should display error state when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    // SỬA 4: Áp dụng "timer pattern"
    const promise = faqManager.loadQuestions();
    jest.advanceTimersByTime(1500);
    await promise;

    const container = document.getElementById('faq-container');
    expect(container.innerHTML).toContain('faq__error');
    expect(container.innerHTML).toContain('Network error');
    expect(container.innerHTML).toContain('Thử lại');
  });

  test('should display empty state when no questions are available', async () => {
    const mockEmptyData = {
      questions: []
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEmptyData
    });

    // SỬA 4: Áp dụng "timer pattern"
    const promise = faqManager.loadQuestions();
    jest.advanceTimersByTime(1500);
    await promise;

    const container = document.getElementById('faq-container');
    expect(container.innerHTML).toContain('faq__empty');
    expect(container.innerHTML).toContain('Không có câu hỏi nào');
  });

  test('should handle HTTP error responses', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    // SỬA 4: Áp dụng "timer pattern"
    const promise = faqManager.loadQuestions();
    jest.advanceTimersByTime(1500);
    await promise;

    const container = document.getElementById('faq-container');
    expect(container.innerHTML).toContain('HTTP error! status: 404');
  });

   test('should display empty state when no questions are available', async () => {
  document.body.innerHTML = `<div id="faq-container"></div>`;
  const manager = new FAQManager('faq-container');

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ questions: [] })
  });

  await manager.loadQuestions(true); // 👈 skip delay khi test

  expect(document.querySelector('.faq__empty')).not.toBeNull();
  expect(document.querySelector('h3').textContent).toBe('Không có câu hỏi nào');
});

});


import { test, expect } from '@playwright/test';

/**
 * 일기 목록 모달 링크 기능 Playwright 테스트
 * 
 * 테스트 조건:
 * - timeout은 500ms 미만으로 설정
 * - /diaries 페이지가 완전히 로드된 후 테스트
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 금지
 */

test.describe('일기 목록 모달 링크 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    // 일기 목록 페이지가 로드되면 페이지 로드 완료로 간주
    await page.waitForSelector('[data-testid="diaries-page"]', { 
      timeout: 300 
    });
  });

  test('일기쓰기 버튼이 페이지에 존재해야 한다', async ({ page }) => {
    // 일기쓰기 버튼 존재 확인
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await expect(writeButton).toBeVisible({ timeout: 300 });
  });

  test('일기쓰기 버튼 클릭 시 모달이 열려야 한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 모달이 열렸는지 확인 (DiariesNew 컴포넌트의 data-testid)
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await expect(modal).toBeVisible({ timeout: 300 });
    
    // 모달 제목 확인
    const modalTitle = page.locator('[data-testid="diary-new-title"]');
    await expect(modalTitle).toHaveText('일기 쓰기', { timeout: 300 });
  });

  test('모달이 페이지 중앙에 overlay로 표시되어야 한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 모달 컨테이너 확인 (modal.provider의 구조)
    const modalContainer = page.locator('.fixed.inset-0.z-\\[9999\\]');
    await expect(modalContainer).toBeVisible({ timeout: 300 });
    
    // 모달이 중앙에 위치하는지 확인
    const modalContent = page.locator('[data-testid="diary-new-modal"]');
    await expect(modalContent).toBeVisible({ timeout: 300 });
    
    // 모달의 컨테이너가 flex center 스타일을 가지는지 확인
    await expect(modalContainer).toHaveClass(/flex.*items-center.*justify-center/, { timeout: 300 });
  });

  test('모달 배경 클릭 시 모달이 닫혀야 한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 모달이 열렸는지 확인
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await expect(modal).toBeVisible({ timeout: 300 });
    
    // 모달 외부 영역 클릭 (모달 컨테이너의 빈 공간)
    const modalContainer = page.locator('.fixed.inset-0.z-\\[9999\\]');
    await modalContainer.click({ position: { x: 50, y: 50 } });
    
    // 모달이 닫혔는지 확인
    await expect(modal).not.toBeVisible({ timeout: 300 });
  });

  test('모달 내 감정 선택 라디오 그룹이 표시되어야 한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 감정 질문 텍스트 확인
    const emotionQuestion = page.locator('[data-testid="emotion-question"]');
    await expect(emotionQuestion).toHaveText('오늘 기분은 어땠나요?', { timeout: 300 });
    
    // 감정 라디오 그룹 확인
    const emotionRadioGroup = page.locator('[data-testid="emotion-radio-group"]');
    await expect(emotionRadioGroup).toBeVisible({ timeout: 300 });
    
    // 각 감정 라디오 버튼 확인
    const emotionTypes = ['happy', 'sad', 'angry', 'surprise', 'etc'];
    for (const emotion of emotionTypes) {
      const radioButton = page.locator(`[data-testid="emotion-radio-${emotion}"]`);
      await expect(radioButton).toBeVisible({ timeout: 200 });
    }
  });

  test('모달 내 제목 입력 필드가 표시되어야 한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 제목 입력 필드 확인
    const titleInput = page.locator('[data-testid="diary-title-input"]');
    await expect(titleInput).toBeVisible({ timeout: 300 });
    
    // 제목 입력 테스트
    await titleInput.fill('테스트 일기 제목');
    await expect(titleInput).toHaveValue('테스트 일기 제목', { timeout: 300 });
  });

  test('모달 내 내용 입력 필드가 표시되어야 한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 내용 입력 필드 확인
    const contentTextarea = page.locator('[data-testid="diary-content-textarea"]');
    await expect(contentTextarea).toBeVisible({ timeout: 300 });
    
    // 내용 입력 테스트
    await contentTextarea.fill('테스트 일기 내용입니다.');
    await expect(contentTextarea).toHaveValue('테스트 일기 내용입니다.', { timeout: 300 });
  });

  test('모달 내 저장 및 취소 버튼이 표시되어야 한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 저장 버튼 확인
    const saveButton = page.locator('[data-testid="diary-submit-button"]');
    await expect(saveButton).toBeVisible({ timeout: 300 });
    
    // 취소 버튼 확인
    const cancelButton = page.locator('[data-testid="diary-close-button"]');
    await expect(cancelButton).toBeVisible({ timeout: 300 });
  });

  test('취소 버튼 클릭 시 모달이 닫혀야 한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 모달이 열렸는지 확인
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await expect(modal).toBeVisible({ timeout: 300 });
    
    // 취소 버튼 클릭
    const cancelButton = page.locator('[data-testid="diary-close-button"]');
    await cancelButton.click();
    
    // 모달이 닫혔는지 확인
    await expect(modal).not.toBeVisible({ timeout: 300 });
  });

  test('저장 버튼 클릭 시 모달이 닫히고 콘솔에 로그가 출력되어야 한다', async ({ page }) => {
    // 콘솔 로그 캡처 설정
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });

    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await writeButton.click();
    
    // 폼 데이터 입력
    const titleInput = page.locator('[data-testid="diary-title-input"]');
    await titleInput.fill('테스트 제목');
    
    const contentTextarea = page.locator('[data-testid="diary-content-textarea"]');
    await contentTextarea.fill('테스트 내용');
    
    // 감정 선택 (HAPPY)
    const happyRadio = page.locator('[data-testid="emotion-radio-happy"]');
    await happyRadio.check();
    
    // 저장 버튼 클릭
    const saveButton = page.locator('[data-testid="diary-submit-button"]');
    await saveButton.click();
    
    // 모달이 닫혔는지 확인
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await expect(modal).not.toBeVisible({ timeout: 300 });
    
    // 콘솔 로그 확인 (일기 저장 로그) - waitForTimeout 대신 조건부 대기 사용
    await expect(async () => {
      expect(consoleLogs.some(log => log.includes('일기 저장:'))).toBeTruthy();
    }).toPass({ timeout: 300 });
  });
});
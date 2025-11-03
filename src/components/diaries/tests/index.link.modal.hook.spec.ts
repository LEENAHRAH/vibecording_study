/**
 * 일기 목록 모달 링크 기능 테스트 (TDD 기반)
 * 
 * 일기 목록 페이지에서 모달을 통한 일기 작성 기능의 전체 플로우를 테스트합니다.
 * - 모달 열기/닫기 기능 검증
 * - 일기 작성 폼 렌더링 검증
 * - 사용자 인터랙션 시나리오 검증
 * - 감정 선택 기능 검증
 * 
 * 테스트 조건 준수사항:
 * - Playwright 테스트 활용 (jest, @testing-library/react 제외)
 * - timeout: 500ms 미만으로 설정 (400ms 사용)
 * - data-testid 기반 요소 선택 (CSS 클래스 사용 금지)
 * - networkidle 대기 방법 사용 금지
 * - 실제 데이터 사용 (mock 데이터 사용 금지)
 */
import { test, expect } from '@playwright/test';

test.describe('일기 목록 모달 링크 기능', () => {
  // 각 테스트 실행 전 공통 설정
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동 (baseUrl 미포함)
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반, 500ms 미만 timeout)
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 400 });
  });

  // 기본 모달 열기 기능 테스트
  test('일기쓰기 버튼 클릭 시 모달이 열린다', async ({ page }) => {
    // 일기쓰기 버튼 찾기 (data-testid 기반)
    const writeButton = page.locator('[data-testid="write-diary-button"]');
    await expect(writeButton).toBeVisible();

    // 모달이 처음에는 보이지 않는지 확인 (data-testid 기반)
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await expect(modal).not.toBeVisible();

    // 일기쓰기 버튼 클릭
    await writeButton.click();

    // 모달이 나타나는지 확인 (500ms 미만 timeout 설정)
    await modal.waitFor({ state: 'visible', timeout: 400 });
    await expect(modal).toBeVisible();
  });

  // 모달 내 컨텐츠 렌더링 검증 테스트
  test('모달 내에 일기 작성 폼이 표시된다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.locator('[data-testid="write-diary-button"]').click();

    // 모달이 열릴 때까지 대기 (data-testid 기반)
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await modal.waitFor({ state: 'visible', timeout: 400 });

    // 제목 "일기 쓰기"가 있는지 확인 (data-testid 기반)
    await expect(page.locator('[data-testid="diary-new-title"]')).toContainText('일기 쓰기');
    
    // 감정 선택 영역이 있는지 확인 (data-testid 기반)
    await expect(page.locator('[data-testid="emotion-question"]')).toContainText('오늘 기분은 어땠나요?');
    
    // 제목 입력 필드가 있는지 확인 (data-testid 기반)
    await expect(page.locator('[data-testid="diary-title-input"]')).toBeVisible();
    
    // 내용 입력 필드가 있는지 확인 (data-testid 기반)
    await expect(page.locator('[data-testid="diary-content-textarea"]')).toBeVisible();
    
    // 닫기 버튼이 있는지 확인 (data-testid 기반)
    await expect(page.locator('[data-testid="diary-close-button"]')).toBeVisible();
    
    // 등록하기 버튼이 있는지 확인 (data-testid 기반)
    await expect(page.locator('[data-testid="diary-submit-button"]')).toBeVisible();
  });

  // 닫기 버튼으로 모달 닫기 테스트
  test('모달 내 닫기 버튼 클릭 시 모달이 닫힌다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.locator('[data-testid="write-diary-button"]').click();

    // 모달이 열릴 때까지 대기 (data-testid 기반)
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await modal.waitFor({ state: 'visible', timeout: 400 });

    // 닫기 버튼 클릭 (data-testid 기반)
    const closeButton = page.locator('[data-testid="diary-close-button"]');
    await closeButton.click();

    // 모달이 닫히는지 확인 (waitFor 사용)
    await modal.waitFor({ state: 'hidden', timeout: 400 });
    await expect(modal).not.toBeVisible();
  });

  // 일기 등록 완료 후 모달 닫기 테스트
  test('일기 작성 후 등록하기 버튼 클릭 시 모달이 닫힌다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.locator('[data-testid="write-diary-button"]').click();

    // 모달이 열릴 때까지 대기 (data-testid 기반)
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await modal.waitFor({ state: 'visible', timeout: 400 });

    // 제목 입력 (data-testid 기반)
    await page.locator('[data-testid="diary-title-input"]').fill('테스트 일기 제목');

    // 내용 입력 (data-testid 기반)
    await page.locator('[data-testid="diary-content-textarea"]').fill('테스트 일기 내용입니다.');

    // 등록하기 버튼 클릭 (data-testid 기반)
    const submitButton = page.locator('[data-testid="diary-submit-button"]');
    await submitButton.click();

    // 모달이 닫히는지 확인 (waitFor 사용)
    await modal.waitFor({ state: 'hidden', timeout: 400 });
    await expect(modal).not.toBeVisible();
  });

  // 감정 라디오 버튼 선택 기능 테스트
  test('감정 선택이 정상적으로 작동한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.locator('[data-testid="write-diary-button"]').click();

    // 모달이 열릴 때까지 대기 (data-testid 기반)
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await modal.waitFor({ state: 'visible', timeout: 400 });

    // 기본적으로 첫 번째 감정(HAPPY)이 선택되어 있는지 확인 (data-testid 기반)
    const firstRadio = page.locator('[data-testid="emotion-radio-happy"]');
    await expect(firstRadio).toBeChecked();

    // 다른 감정(SAD) 선택 (data-testid 기반)
    const secondRadio = page.locator('[data-testid="emotion-radio-sad"]');
    await secondRadio.click();

    // 두 번째 감정이 선택되었는지 확인
    await expect(secondRadio).toBeChecked();
    await expect(firstRadio).not.toBeChecked();
  });

  // 감정 라디오 그룹 전체 기능 테스트
  test('모든 감정 옵션이 정상적으로 작동한다', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.locator('[data-testid="write-diary-button"]').click();

    // 모달이 열릴 때까지 대기
    const modal = page.locator('[data-testid="diary-new-modal"]');
    await modal.waitFor({ state: 'visible', timeout: 400 });

    // 감정 라디오 그룹이 표시되는지 확인
    const emotionGroup = page.locator('[data-testid="emotion-radio-group"]');
    await expect(emotionGroup).toBeVisible();

    // 각 감정 옵션이 모두 존재하는지 확인 (실제 ENUM 값 사용)
    const emotions = ['happy', 'sad', 'surprise', 'angry', 'etc'];
    
    for (const emotion of emotions) {
      const radioButton = page.locator(`[data-testid="emotion-radio-${emotion}"]`);
      await expect(radioButton).toBeVisible();
      
      // 각 라디오 버튼 클릭 테스트
      await radioButton.click();
      await expect(radioButton).toBeChecked();
    }
  });
});
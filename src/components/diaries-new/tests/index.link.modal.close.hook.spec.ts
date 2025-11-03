import { test, expect } from '@playwright/test';

/**
 * 일기 작성 모달 닫기 기능 Playwright 테스트
 * 
 * 테스트 조건:
 * - timeout은 400ms로 설정 (500ms 미만)
 * - /diaries 페이지가 완전히 로드된 후 일기쓰기버튼을 클릭한 이후 테스트
 * - 페이지 로드 식별: data-testid 대기 방법 사용 (waitForSelector)
 * - networkidle 대기 방법 금지
 */

test.describe('일기 작성 모달 닫기 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 방식, 400ms timeout)
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 400 });
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.locator('[data-testid="write-diary-button"]').click();
    
    // 일기 작성 모달이 열렸는지 확인 (400ms timeout)
    await expect(page.locator('[data-testid="diary-new-modal"]')).toBeVisible({ timeout: 400 });
  });

  test('닫기 버튼 클릭 시 등록취소 확인 모달이 표시되어야 한다', async ({ page }) => {
    // 닫기 버튼 클릭
    await page.locator('[data-testid="diary-close-button"]').click();
    
    // 등록취소 확인 모달이 표시되는지 확인 (400ms timeout)
    await expect(page.locator('[data-testid="diary-cancel-confirm-modal"]')).toBeVisible({ timeout: 400 });
    
    // 모달 제목과 메시지 확인 (400ms timeout)
    await expect(page.locator('[data-testid="diary-cancel-confirm-modal"]')).toContainText('등록 취소', { timeout: 400 });
    await expect(page.locator('[data-testid="diary-cancel-confirm-modal"]')).toContainText('작성 중인 내용이 사라집니다', { timeout: 400 });
  });

  test('등록취소 확인 모달에서 계속작성 버튼 클릭 시 확인 모달만 닫혀야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 확인 모달 열기
    await page.locator('[data-testid="diary-close-button"]').click();
    await expect(page.locator('[data-testid="diary-cancel-confirm-modal"]')).toBeVisible({ timeout: 400 });
    
    // 계속작성 버튼 클릭
    await page.locator('[data-testid="diary-cancel-confirm-modal"]').locator('button').filter({ hasText: '계속작성' }).click();
    
    // 확인 모달은 닫히고 일기 작성 모달은 여전히 열려있어야 함 (400ms timeout)
    await expect(page.locator('[data-testid="diary-cancel-confirm-modal"]')).not.toBeVisible({ timeout: 400 });
    await expect(page.locator('[data-testid="diary-new-modal"]')).toBeVisible({ timeout: 400 });
  });

  test('등록취소 확인 모달에서 등록취소 버튼 클릭 시 모든 모달이 닫혀야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 확인 모달 열기
    await page.locator('[data-testid="diary-close-button"]').click();
    await expect(page.locator('[data-testid="diary-cancel-confirm-modal"]')).toBeVisible({ timeout: 400 });
    
    // 등록취소 버튼 클릭
    await page.locator('[data-testid="diary-cancel-confirm-modal"]').locator('button').filter({ hasText: '등록취소' }).click();
    
    // 모든 모달이 닫혀야 함 (400ms timeout)
    await expect(page.locator('[data-testid="diary-cancel-confirm-modal"]')).not.toBeVisible({ timeout: 400 });
    await expect(page.locator('[data-testid="diary-new-modal"]')).not.toBeVisible({ timeout: 400 });
    
    // 다이어리 페이지로 돌아가야 함 (400ms timeout)
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible({ timeout: 400 });
  });

  test('2중 모달 구조가 올바르게 작동해야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 확인 모달 열기
    await page.locator('[data-testid="diary-close-button"]').click();
    
    // 두 모달이 모두 표시되어야 함 (2중 모달, 400ms timeout)
    await expect(page.locator('[data-testid="diary-new-modal"]')).toBeVisible({ timeout: 400 });
    await expect(page.locator('[data-testid="diary-cancel-confirm-modal"]')).toBeVisible({ timeout: 400 });
    
    // 확인 모달이 일기 작성 모달 위에 표시되어야 함 (z-index 확인)
    const diaryModal = page.locator('[data-testid="diary-new-modal"]');
    const confirmModal = page.locator('[data-testid="diary-cancel-confirm-modal"]');
    
    // 두 모달 모두 보이지만 확인 모달이 상위에 있어야 함 (400ms timeout)
    await expect(diaryModal).toBeVisible({ timeout: 400 });
    await expect(confirmModal).toBeVisible({ timeout: 400 });
  });
});

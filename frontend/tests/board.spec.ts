import { test, expect } from '@playwright/test';

test('board supports adding, deleting, renaming and reset', async ({ page }) => {
 await page.goto('/'); await expect(page.locator('main[data-ready=true]')).toBeAttached(); await expect(page.locator('section.column')).toHaveCount(5);
 const column = page.getByRole('region', { name: 'ایده‌ها' });
 await column.getByRole('button', { name: 'افزودن کارت' }).click(); await page.getByLabel('عنوان کارت').fill('کار آزمایشی'); await page.getByLabel('جزئیات').fill('جزئیات آزمایش'); await page.getByRole('dialog').getByRole('button', { name: 'افزودن کارت' }).click();
 await expect(column.getByText('کار آزمایشی')).toBeVisible(); await column.getByRole('button', { name: 'حذف کار آزمایشی' }).click(); await expect(column.getByText('کار آزمایشی')).toHaveCount(0);
 await column.getByRole('button', { name: 'تغییر نام ایده‌ها' }).click(); await page.getByLabel('نام ستون').fill('برنامه جدید'); await page.getByLabel('نام ستون').press('Enter'); await expect(page.getByRole('region', { name: 'برنامه جدید' })).toBeVisible();
 await page.reload(); await expect(page.getByRole('region', { name: 'ایده‌ها' })).toBeVisible();
});
test('drags a card to another column', async ({ page }) => {
 await page.goto('/'); await expect(page.locator('main[data-ready=true]')).toBeAttached(); const from = page.getByRole('region', { name: 'ایده‌ها' }); const to = page.getByRole('region', { name: 'برای انجام' }); const handle = from.getByRole('button', { name: 'جابه‌جایی ایده‌پردازی برای پروژه' });
 const a = await handle.boundingBox(); const b = await to.boundingBox(); if (!a || !b) throw new Error('Missing drag targets'); await page.mouse.move(a.x+a.width/2,a.y+a.height/2); await page.mouse.down(); await page.mouse.move(b.x+b.width/2,b.y+100,{steps:20}); await page.mouse.up(); await expect(to.getByText('ایده‌پردازی برای پروژه')).toBeVisible();
});
test('supports keyboard access and a mobile viewport', async ({ page }) => {
 await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/'); await expect(page.locator('main[data-ready=true]')).toBeAttached(); await expect(page.getByRole('heading', { name: 'ایده‌ها را به انجام برسانید.' })).toBeVisible(); const button = page.getByRole('region', { name: 'ایده‌ها' }).getByRole('button', { name: 'افزودن کارت' }); await button.focus(); await page.keyboard.press('Enter'); await expect(page.getByRole('dialog')).toBeVisible(); await page.getByLabel('عنوان کارت').fill('کار موبایل'); await page.getByRole('dialog').getByRole('button', { name: 'افزودن کارت' }).click(); await expect(page.getByText('کار موبایل')).toBeVisible();
});


test('moves a card using the keyboard', async ({ page }) => {
 await page.goto('/'); await expect(page.locator('main[data-ready=true]')).toBeAttached();
 const from = page.getByRole('region', { name: 'ایده‌ها' }); const to = page.getByRole('region', { name: 'برای انجام' });
 await from.getByRole('button', { name: 'جابه‌جایی ایده‌پردازی برای پروژه' }).focus(); await page.keyboard.press('Space'); await expect(page.getByRole('button', { name: 'جابه‌جایی ایده‌پردازی برای پروژه' })).toHaveAttribute('aria-pressed', 'true'); for (let i = 0; i < 9; i++) { await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(30); } await page.keyboard.press('Space');
 await expect(to.getByText('ایده‌پردازی برای پروژه')).toBeVisible();
});



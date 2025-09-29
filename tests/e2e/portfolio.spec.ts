import { test, expect } from '@playwright/test'

test.describe('Portfolio Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio/)
    await expect(page.locator('h1')).toContainText('Himanshu')
  })

  test('should navigate to different pages', async ({ page }) => {
    // Test navigation to About page
    await page.click('a[href="/about"]')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText('About')

    // Test navigation to Work page
    await page.click('a[href="/work"]')
    await expect(page).toHaveURL('/work')
    await expect(page.locator('h1')).toContainText('Work')

    // Test navigation to Articles page
    await page.click('a[href="/articles"]')
    await expect(page).toHaveURL('/articles')
    await expect(page.locator('h1')).toContainText('Articles')

    // Test navigation to Contact page
    await page.click('a[href="/contact"]')
    await expect(page).toHaveURL('/contact')
    await expect(page.locator('h1')).toContainText('Contact')

    // Test navigation to Now page
    await page.click('a[href="/now"]')
    await expect(page).toHaveURL('/now')
    await expect(page.locator('h1')).toContainText('Now')
  })

  test('should toggle theme mode', async ({ page }) => {
    const themeToggle = page.locator('[aria-label*="Switch to"]')
    
    // Click theme toggle
    await themeToggle.click()
    
    // Check if dark mode is applied
    await expect(page.locator('html')).toHaveClass(/dark/)
    
    // Click again to switch back
    await themeToggle.click()
    
    // Check if light mode is applied
    await expect(page.locator('html')).not.toHaveClass(/dark/)
  })

  test('should toggle recruiter mode', async ({ page }) => {
    const recruiterToggle = page.locator('[aria-label*="recruiter mode"]')
    
    // Click recruiter mode toggle
    await recruiterToggle.click()
    
    // Check if recruiter mode banner appears
    await expect(page.locator('text=Recruiter Mode Active')).toBeVisible()
    
    // Click again to disable
    await recruiterToggle.click()
    
    // Check if banner disappears
    await expect(page.locator('text=Recruiter Mode Active')).not.toBeVisible()
  })


  test('should submit contact form', async ({ page }) => {
    await page.goto('/contact')
    
    // Fill contact form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="subject"]', 'Test Subject')
    await page.fill('textarea[name="message"]', 'This is a test message')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Check for success message
    await expect(page.locator('text=Message sent successfully')).toBeVisible({ timeout: 10000 })
  })

  test('should display project cards with animations', async ({ page }) => {
    await page.goto('/work')
    
    // Check if project cards are visible
    const projectCards = page.locator('[data-testid="project-card"]')
    await expect(projectCards).toHaveCount.greaterThan(0)
    
    // Check if cards have hover effects
    await projectCards.first().hover()
    await expect(projectCards.first()).toHaveCSS('transform', /scale/)
  })

  test('should show progress tracker on scroll', async ({ page }) => {
    // Scroll down to trigger progress tracker
    await page.evaluate(() => window.scrollTo(0, 500))
    
    // Check if progress tracker is visible
    await expect(page.locator('text=% explored')).toBeVisible()
  })

  test('should activate easter egg with Konami code', async ({ page }) => {
    // Press Konami code sequence
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('KeyB')
    await page.keyboard.press('KeyA')
    
    // Check if easter egg modal appears
    await expect(page.locator('text=Konami Code Activated')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if mobile menu button is visible
    await expect(page.locator('[aria-label="Toggle menu"]')).toBeVisible()
    
    // Open mobile menu
    await page.click('[aria-label="Toggle menu"]')
    
    // Check if mobile menu is open
    await expect(page.locator('a[href="/about"]')).toBeVisible()
  })

  test('should have proper accessibility features', async ({ page }) => {
    // Check for skip link
    await expect(page.locator('a[href="#main-content"]')).toBeVisible()
    
    // Check for proper heading structure
    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)
    
    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()
    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('should load Now page with current focus items', async ({ page }) => {
    await page.goto('/now')
    
    // Check if current focus items are displayed
    await expect(page.locator('[data-testid="focus-item"]')).toHaveCount.greaterThan(0)
    
    // Check if learning section is visible
    await expect(page.locator('text=Currently Learning')).toBeVisible()
    
    // Check if goals section is visible
    await expect(page.locator('text=Short-term Goals')).toBeVisible()
  })
})

import { test, expect } from '@playwright/test';

test.describe('Negative Test Cases', () => {

  // Test case 1: Checkout button should not be visible when cart is empty
  test('Checkout button should not be visible when cart is empty', async ({ page }) => {
    await page.goto('/');

    // Navigate to cart page
    await page.locator('a.ico-cart').first().click();
    await expect(page).toHaveURL(/\/cart/);

    // Verify checkout button is not visible when cart is empty
    const checkoutButton = page.locator('button#checkout');
    await expect(checkoutButton).toHaveCount(0);
  });

  // Test case 2: Checkout with invalid email format should display an error
  test('Checkout with invalid email format should display an error', async ({ page }) => {
    await page.goto('/');

    // **Scroll to and add "14.1-inch Laptop" to cart**
    const product = page.locator('.product-item').filter({ hasText: '14.1-inch Laptop' }).first();

    // Scroll into view and click "Add to cart"
    await product.scrollIntoViewIfNeeded();
    await product.locator('text=Add to cart').click();

    // Wait for success message and close it
    const successMessage = page.locator('.bar-notification.success');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    await successMessage.locator('span.close').click();

    // Navigate to cart and proceed to checkout
    await page.locator('a.ico-cart').first().click();
    await expect(page).toHaveURL(/\/cart/);

    // **Agree to terms of service checkbox**
    const termsCheckbox = page.locator('#termsofservice');
    await termsCheckbox.scrollIntoViewIfNeeded();
    await termsCheckbox.check();

    // Click checkout
    await page.locator('button#checkout').click();

    

    
//Invalid email format for login

  const emailInput = page.locator('input#Email');
  const passwordInput = page.locator('input#Password');
  
  // Correct XPath for login button
  const loginButtonXPath = '/html/body/div[4]/div[1]/div[4]/div[2]/div/div[2]/div[1]/div[2]/div[2]/form/div[5]/input';

  // Navigate to the login page (assuming it's a login page URL)
  await page.goto('/login');
  
  // Ensure email and password inputs are visible
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  // Fill in an invalid email format
  await emailInput.fill('invalid-email');
  await passwordInput.fill('123456'); // Use the correct password

  
    // Wait for the login button to be visible using XPath and click it
    const loginButton = page.locator(`xpath=${loginButtonXPath}`);
    await loginButton.click();

    // **Verify invalid email error message**
    const emailErrorMessage = page.locator('span[for="Email"]'); // Correct selector based on the provided tag
    await expect(emailErrorMessage).toBeVisible();
    await expect(emailErrorMessage).toHaveText('Please enter a valid email address.');
  


  });

});

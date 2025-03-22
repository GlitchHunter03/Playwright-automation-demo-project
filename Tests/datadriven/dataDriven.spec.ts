import { test, expect } from '@playwright/test';

const products = ['Build your own expensive computer', 'Build your own cheap computer'];

test.describe('Data-Driven Testing for adding products to the cart', () => {
  
  // Loop through each product name
  products.forEach((product) => {
    test(`Add ${product} to the cart`, async ({ page }) => {
      await page.goto('/');
    
      //Search

      const searchBox = page.locator('#small-searchterms');
      await expect(searchBox).toBeVisible();
      await searchBox.fill(product);
  
      await page.locator('input[type="submit"][value="Search"]').click();
      await expect(page).toHaveURL(/\/search/);
  
      const productItems = page.locator('.product-item');
      const productCount = await productItems.count();
      expect(productCount).toBeGreaterThan(0);


      // Locate the product using the name and click "Add to Cart"
      const productLocator = page.locator('.product-item').filter({ hasText: product }).first();
      await productLocator.scrollIntoViewIfNeeded();
      await productLocator.locator('text=Add to cart').click();

      // Locate the product using the name and click "Add to Cart"
      const productLocator2 = page.locator('.product-essential')
      await productLocator2.scrollIntoViewIfNeeded();
      await productLocator2.locator('text=Add to cart').click();

      // Wait for the success message and verify it contains the expected generic text
      const successMessage = page.locator('.bar-notification.success');
      await expect(successMessage).toBeVisible();
      
      // Verify the generic success message instead of expecting product-specific text
      await expect(successMessage).toContainText('The product has been added to your shopping cart');
      
      // Optionally close the success message
      await successMessage.locator('span.close').click();
    });
  });

});

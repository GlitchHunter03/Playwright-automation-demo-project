import { test, expect } from '@playwright/test';

test.describe('E-commerce Functionality Tests', () => {

  test('Search Functionality - User can search for a product and view results', async ({ page }) => {
    await page.goto('/');

    const searchBox = page.locator('#small-searchterms');
    await expect(searchBox).toBeVisible();
    await searchBox.fill('laptop');

    await page.locator('input[type="submit"][value="Search"]').click();
    await expect(page).toHaveURL(/\/search/);

    const productItems = page.locator('.product-item');
    const productCount = await productItems.count();
    expect(productCount).toBeGreaterThan(0);

    const productTitles = productItems.locator('.product-title a');
    const titles = await productTitles.allTextContents();

    console.log('Product Titles:', titles);
    for (const title of titles) {
      expect(title.toLowerCase()).toContain('laptop');
    }
  });

  test('Add to Cart - User can add a product to the cart', async ({ page }) => {
    await page.goto('/');

    const searchBox = page.locator('#small-searchterms');
    await searchBox.fill('laptop');
    await page.locator('input[type="submit"][value="Search"]').click();

    const firstProduct = page.locator('.product-item').first();
    const productTitle = await firstProduct.locator('.product-title a').textContent();
    const productPrice = await firstProduct.locator('.prices').textContent();

    // Click "Add to Cart"
    await firstProduct.locator('input[value="Add to cart"]').click();

    // Wait for the confirmation message
    const successMessage = page.locator('.bar-notification.success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('The product has been added to your shopping cart');

    // Store title and price for validation
    test.info().annotations.push({ type: 'productTitle', description: productTitle ?? '' });
    test.info().annotations.push({ type: 'productPrice', description: productPrice ?? '' });
  });
  
  

  //Adding cart validation here below



  test('User can add a product to the cart and validate the cart details', async ({ page }) => {
    await page.goto('/');

    // Search for a product
    const searchBox = page.locator('#small-searchterms');
    await expect(searchBox).toBeVisible();
    await searchBox.fill('laptop');

    await page.locator('input[type="submit"][value="Search"]').click();
    await expect(page).toHaveURL(/\/search/);

    // Select the first product from search results
    const firstProduct = page.locator('.product-item').first();

    const productTitle = await firstProduct.locator('.product-title a').textContent({ timeout: 5000 });
    const productPrice = await firstProduct.locator('.prices').textContent({ timeout: 5000 });

    // Add product to cart
    await firstProduct.locator('input[value="Add to cart"]').click();

    // Verify success message and close it
    const successMessage = page.locator('.bar-notification.success');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    await expect(successMessage).toContainText('The product has been added to your shopping cart');
    await successMessage.locator('span.close').click();

    // Navigate to shopping cart
    await page.locator('a.ico-cart').first().click();
    await expect(page).toHaveURL(/\/cart/);
    await page.waitForLoadState('networkidle');

    // Wait for cart items to load
    await page.waitForSelector('.cart-item-row', { timeout: 10000 });

    const cartItems = page.locator('.cart-item-row');
    
    const itemCount = await cartItems.count();
    expect(itemCount).toBeGreaterThan(0);

    const cartItem = cartItems.first();

    // Debugging: Output cart item structure if needed
    const cartItemHTML = await cartItem.innerHTML();
    console.log("Cart Item HTML:\n", cartItemHTML);

    const cartProductTitleLocator = cartItem.locator('td.product a');
    const cartProductPriceLocator = cartItem.locator('td.unit-price span.product-unit-price');

    await expect(cartProductTitleLocator).toBeVisible({ timeout: 5000 });
    await expect(cartProductPriceLocator).toBeVisible({ timeout: 5000 });

    const cartProductTitle = await cartProductTitleLocator.textContent({ timeout: 5000 });
    const cartProductPrice = await cartProductPriceLocator.textContent({ timeout: 5000 });

    console.log(`Product Title (Search): ${productTitle?.trim()}`);
    console.log(`Product Title (Cart): ${cartProductTitle?.trim()}`);
    console.log(`Product Price (Search): ${productPrice?.trim()}`);
    console.log(`Product Price (Cart): ${cartProductPrice?.trim()}`);

    expect(cartProductTitle?.trim()).toBe(productTitle?.trim());
    expect(cartProductPrice?.trim()).toBe(productPrice?.trim());
  });










});

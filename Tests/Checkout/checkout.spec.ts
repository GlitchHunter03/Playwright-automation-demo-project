import { test, expect } from '@playwright/test';

test.describe('Checkout Process', () => {

  test('User can complete the checkout process', async ({ page }) => {
    await page.goto('/');

    // **Select and add "14.1-inch Laptop" to cart**
    const laptopProduct = page.locator('.product-item').filter({ hasText: '14.1-inch Laptop' }).first();

    // Scroll into view and click "Add to cart"
    await laptopProduct.scrollIntoViewIfNeeded();
    await laptopProduct.locator('input[value="Add to cart"]').click();

    // Wait for success message and close it
    const successMessage = page.locator('.bar-notification.success');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    await successMessage.locator('span.close').click();

    // Proceed to cart
    await page.locator('a.ico-cart').first().click();
    await expect(page).toHaveURL(/\/cart/);

    // Agree to terms and proceed to checkout
    await page.locator('#termsofservice').scrollIntoViewIfNeeded();
    await page.locator('#termsofservice').check();


    // Proceed to checkout
    await page.locator('button#checkout').click();
    await expect(page).toHaveURL(/\/checkout/);

    // **Login with email and password (instead of checkout as guest)**
    const emailInput = page.locator('input#Email');
    const passwordInput = page.locator('input#Password');
    
    // Correct XPath for login button
    const loginButtonXPath = '/html/body/div[4]/div[1]/div[4]/div[2]/div/div[2]/div[1]/div[2]/div[2]/form/div[5]/input';

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill('john01@mailinator.com');
    await passwordInput.fill('123456'); // Replace with the correct password

    // Wait for the login button to be visible using XPath
    const loginButton = page.locator(`xpath=${loginButtonXPath}`);
    await loginButton.click();


  
    //Select Only 1 item in Cart
    await page.locator('xpath=/html/body/div[4]/div[1]/div[4]/div/div/div[2]/div/form/table/tbody/tr/td[5]/input').fill('1'); // Set quantity to 1



    // Wait for the "Country" dropdown to be visible and select "United States"
    const countryDropdown = page.locator('select#CountryId');
    await expect(countryDropdown).toBeVisible();
    await countryDropdown.selectOption({ label: 'United States' });


    // **Agree to terms before checkout (checkbox)**
    
    await page.locator('#termsofservice').scrollIntoViewIfNeeded();
    await page.locator('#termsofservice').check();
    // Scroll into view to make sure the checkbox is visible and click it
   


    // **Proceed to Checkout**
    const checkoutButton = page.locator('button#checkout');
    await expect(checkoutButton).toBeVisible();

    // Scroll into view to make sure the button is visible and click it
    await checkoutButton.scrollIntoViewIfNeeded();
    await checkoutButton.click();

 
 // **Click continue after filling billing address**
 await page.locator('xpath=/html/body/div[4]/div[1]/div[4]/div/div/div[2]/ol/li[1]/div[2]/div/input').click();  // Click the first continue button

 await page.waitForTimeout(1000); // Wait for 1 seconds (1000 milliseconds)
 await page.locator('xpath=/html/body/div[4]/div[1]/div[4]/div/div/div[2]/ol/li[2]/div[2]/div/input').click();  // Click the Second continue button

 await page.waitForTimeout(1000); // Wait for 1 seconds (1000 milliseconds)

 await page.locator('input.button-1.shipping-method-next-step-button[type="button"][value="Continue"]').click();// Click Third Continue

 await page.waitForTimeout(1000); // Wait for 1 seconds (1000 milliseconds)

 // **Payment Method Section**

 await page.locator('input[type="radio"][name="paymentmethod"][value="Payments.Manual"]').click(); // Select the Second payment method (Credit Card)
 await page.locator('input.button-1.payment-method-next-step-button[type="button"][value="Continue"]').click();
 await page.waitForTimeout(1000); 




 // **Payment Info Section**
 await page.fill('input#CardNumber[name="CardNumber"]', '4111 1111 1111 1111') // Card Number (replace with real test card)
 await page.fill('input#CardholderName[name="CardholderName"]', 'John Doe');// Name on card
 await page.selectOption('select#ExpireYear[name="ExpireYear"]', { value: '2026' }); // Expiry Date
 await page.fill('input#CardCode[name="CardCode"]', '123');  // CVV

 // **Click continue after filling payment information**
 //await page.locator('input.button-1 payment-info-next-step-button[type="button"][value="Continue"]').click();
 await page.locator('//input[@class="button-1 payment-info-next-step-button" and @type="button" and @value="Continue"]').click();



await page.locator('//input[@class="button-1 confirm-order-next-step-button" and @type="button" and @value="Confirm"]').click();
//Last Continue button, Order is complete after this


// Check for the success message
await expect(page.locator('strong:has-text("Your order has been successfully processed!")')).toBeVisible({ timeout: 5000 });
// **Verify Order Completion**

await expect(page.locator('.page-title')).toHaveText('Thank you');


  });

});
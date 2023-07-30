const { test, expect } = require('@playwright/test');

const login = async (page) => {
    await page.goto('http://localhost:7777/auth/login');
    await page.fill('input[name="email"]', 'admin@admin.com');
    await page.fill('input[name="password"]', '123456');

    const [response] = await Promise.all([
        page.waitForResponse("**/*"),
        page.click('#login')
    ]);

    return response;
}

// 1
test('should display the correct title in root', async ({ page }) => {
    await page.goto('http://localhost:7777/');
    const content = await page.textContent('body');
    expect(content).toContain('Hello world!');
});

// 2
test('it should login a user', async ({ page }) => {
    const response = await login(page);
    expect(response.status()).toBe(302);
});

// 3
test('should display the correct title in lists', async ({ page }) => {
    // Tests fail if user is not logged in
    await login(page);

    await page.goto('http://localhost:7777/topics');
    const content = await page.textContent('body');
    expect(content).toContain('Topics');
});

// 4
test('should display the correct title in lists', async ({ page }) => {
    // Tests fail if user is not logged in
    await login(page);

    await page.goto('http://localhost:7777/quiz');
    const content = await page.textContent('body');
    expect(content).toContain('Choose a topic for Quiz');
});


// 5
test('it should register a user', async ({ page }) => {
    await page.goto('http://localhost:7777/auth/register');
    await page.fill('input[name="email"]', 'test05@test.com');
    await page.fill('input[name="password"]', 'password');
    const [response] = await Promise.all([
        page.waitForResponse("**/*"),
        page.click('#register')
    ]);
    expect(response.status()).toBe(302);
});
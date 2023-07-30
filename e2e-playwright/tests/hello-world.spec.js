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
test('should display the correct title in topics', async ({ page }) => {
    // Tests fail if user is not logged in
    await login(page);

    await page.goto('http://localhost:7777/topics');
    const content = await page.textContent('body');
    expect(content).toContain('Topics');
});

// 4
test('should display the correct title in quizzes', async ({ page }) => {
    // Tests fail if user is not logged in
    await login(page);

    await page.goto('http://localhost:7777/quiz');
    const content = await page.textContent('body');
    expect(content).toContain('Choose a topic for Quiz');
});


// 5
test('it should register a user', async ({ page }) => {
    await page.goto('http://localhost:7777/auth/register');
    await page.fill('input[name="email"]', 'test08@test.com');
    await page.fill('input[name="password"]', 'password');
    const [response] = await Promise.all([
        page.waitForResponse("**/*"),
        page.click('#register')
    ]);
    expect(response.status()).toBe(302);
});

// 6
test('it should add new topic', async ({ page }) => {
    // Tests fail if user is not logged in
    await login(page);

    await page.goto('http://localhost:7777/topics');
    await page.locator("input[type=text]").type("TestItem");
    const [response] = await Promise.all([
        page.waitForResponse("**/*"),
        page.click('#new-topic')
    ]);
    await page.goto('http://localhost:7777/topics');
    const content = await page.textContent('body');
    expect(content).toContain('TestItem');
});

// 7
test('should display the correct title in Topic Info', async ({ page }) => {
    // Tests fail if user is not logged in
    await login(page);

    await page.goto('http://localhost:7777/topics/1');
    const content = await page.textContent('body');
    expect(content).toContain('Topic Info');
});

// 8
test('it should add new question', async ({ page }) => {
    // Tests fail if user is not logged in
    await login(page);

    await page.goto('http://localhost:7777/topics/1');
    await page.locator("input[type=text]").type("TestItem");
    await Promise.all([
        page.waitForResponse("**/*"),
        page.click('#new-question')
    ]);
    await page.goto('http://localhost:7777/topics/1');
    const content = await page.textContent('body');
    expect(content).toContain('TestItem');
});

// 9
test('it should not login a user with incorrect credentials', async ({ page }) => {
    await page.goto('http://localhost:7777/auth/login');
    await page.fill('input[name="email"]', 'nonexistent@test.com');
    await page.fill('input[name="password"]', 'wrongpassword');

    await Promise.all([
        page.waitForResponse("**/*"),
        page.click('#login')
    ]);
    const url = page.url();
    expect(url).toBe('http://localhost:7777/auth/login');
});

// 10
test('it should redirect non-logged in users to login page', async ({ page }) => {
    await page.goto('http://localhost:7777/topics');
    const url = page.url();
    expect(url).toBe('http://localhost:7777/auth/login');
});
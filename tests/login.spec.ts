import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';

test.describe("Login Tests", ()=>{
    test('Standard user can log in successfully. @smoke @regression', async ({page}) => {
        
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            users.standard.username,
            users.standard.password
        );

        await expect(page).toHaveURL(/inventory.html/);

        await expect(page.locator('.title')).toHaveText('Products');
    });
});
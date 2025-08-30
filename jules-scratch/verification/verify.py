import asyncio
import time
from playwright.async_api import async_playwright, expect

async def main():
    # Give the server some time to start
    time.sleep(10)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:3000")

        # Wait for the main heading to be visible
        await expect(page.get_by_role("heading", name="Ankur Halder - API Documentation")).to_be_visible()

        await page.screenshot(path="jules-scratch/verification/verification.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

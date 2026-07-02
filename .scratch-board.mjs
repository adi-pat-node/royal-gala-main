import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

await page.goto("http://localhost:8084/sponsors", { waitUntil: "domcontentloaded" });
await page.waitForSelector("text=PRESIDENT", { timeout: 30000 });
await page.locator("text=PRESIDENT").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: "verify-board-1280.png" });

// Also check tablet width (sm breakpoint, 2-col grid) to confirm nothing broke
const page2 = await browser.newPage({ viewport: { width: 700, height: 1200 } });
await page2.goto("http://localhost:8084/sponsors", { waitUntil: "domcontentloaded" });
await page2.waitForSelector("text=PRESIDENT", { timeout: 30000 });
await page2.locator("text=PRESIDENT").scrollIntoViewIfNeeded();
await page2.waitForTimeout(500);
await page2.screenshot({ path: "verify-board-700.png" });

await browser.close();
console.log("DONE");

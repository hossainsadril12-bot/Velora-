import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(__dirname, "..", "public", "brochure");

test("24 square WebP pages + thumbs + pdf exist", async () => {
  for (let n = 1; n <= 24; n++) {
    const id = String(n).padStart(2, "0");
    const page = await sharp(path.join(root, "pages", `page-${id}.webp`)).metadata();
    expect(page.width).toBe(1600);
    expect(page.height).toBe(1600);
    const thumb = await sharp(path.join(root, "thumbs", `page-${id}.webp`)).metadata();
    expect(thumb.width).toBe(240);
    expect(thumb.height).toBe(240);
  }
  expect(fs.existsSync(path.join(root, "velora-brochure.pdf"))).toBe(true);
});

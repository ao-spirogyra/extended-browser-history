import puppeteer from 'puppeteer';
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';

export const takeSnapshots = async (url,accessToken) => {
  try {
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable​-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({
      width: 1920,
      height: 1080
    });
    try {
      await page.goto(url);
      await page.screenshot({path: 'puppeteer/tmp.png', fullPage:true});
    } catch (error) {
      throw new Error(error)
    } finally {
      await browser.close();
    }
  } catch (error) {
    throw new Error(error)
  }

  const formData = new FormData();
  formData.append('access_token', accessToken);
  formData.append('referer_url', url);
  formData.append('desc', '#traveler-s-diary');

  const imagedata = fs.createReadStream('puppeteer/tmp.png');
  formData.append('imagedata', imagedata);
  
  await fetch('https://upload.gyazo.com/api/upload', {
    method: 'POST',
    body: formData
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error('there was a problem. Status Code: ' + response.status)
    }
  },(e) => {
    throw new Error('Fetch error'+ e);
  });
}

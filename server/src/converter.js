const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

async function createPDF(data) {
  const templateHtml = fs.readFileSync(
    path.join(process.cwd(), 'pdf-template.html'),
    'utf8'
  );
  const template = handlebars.compile(templateHtml);
  const html = template(data);

  const pdfPath = path.join('pdf', `${data.name}.pdf`);

  const options = {
    format: 'A4',
    headerTemplate: '<p></p>',
    footerTemplate: '<p></p>',
    displayHeaderFooter: false,
    margin: {
      top: '40px',
      bottom: '100px',
    },
    printBackground: true,
    path: pdfPath,
  };

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(`${html}`, {
    waitUntil: 'networkidle0',
  });

  await page.pdf(options);
  await browser.close();
}

// pull data from db for the template
const data = {
  title: 'A new Resume',
  date: '08/06/2020',
  name: 'Volkan Van',
  age: 39,
  birthdate: '01/04/1981',
  course: 'Computer Science',
  summary: 'Summary of what I have done so far',
};

createPDF(data);

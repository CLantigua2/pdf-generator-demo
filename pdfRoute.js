const router = require("express").Router();
const mockData = require("./mock_data.json");
const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const moment = require("moment");

// compiles the hbs document
const compile = async function(templateName, data) {
  const filePath = path.join(__dirname, "templates", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};

// register helpers to use in hbs file
// in this case importing moment
hbs.registerHelper("dataFormat", (value, format) => {
  console.log("formatting", value, format);
  return moment(value).format(format);
});

const main = async (fileName, data) => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  const content = await compile(fileName, data);
  await page.setContent(content);
  await page.emulateMedia("screen");
  const pdf = await page.pdf({
    // if I don't specify a path I should get a buffer or binary back
    // need to return or pipe it to a response to send to client
    // path: "mypdf.pdf",
    format: "A4",
    printBackground: true
  });
  return pdf;
};

router.post("/pdf", async (req, res) => {
  try {
    const pdf = await main("self", mockData);
    res.contentType("application/pdf");
    res.send(pdf);
    // await browser.close();
    // process.exit(0);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

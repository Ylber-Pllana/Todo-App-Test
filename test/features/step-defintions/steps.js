const { When, Then, Given, Before, AfterAll } = require("cucumber");
const puppeteer = require("puppeteer");
var { setDefaultTimeout } = require("cucumber");
const { expect } = require("chai");
const fs = require("fs/promises");

setDefaultTimeout(60 * 1000);
let browser, page;
Before(async function () {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 10,
    devtools: false,
    args: ["--start-maximized", "--window-size=1920,1080"],
  });
  page = await browser.newPage();
});

Given(
  "I am in the todo Homepage and I want to create a new task",
  async function () {
    await page.goto("http://localhost:8080/");
  }
);

When("I Click the Add Button", async function () {
  let addButtonSelector = [".ant-btn"];
  await page.waitForSelector(addButtonSelector);
  let addButton = await page.$(addButtonSelector);
  await addButton.click();
});

When("Give a valid todo name", async function () {
  let inputTextSelector = [".ant-input"];
  await page.waitForSelector(inputTextSelector);
  let inputText = await page.$(inputTextSelector);
  await inputText.type("Learn Automation Testing", { delay: 300 });
});

When("Click the done button", async function () {
  let submitButtonSelector = [".ant-btn-primary"];
  await page.waitForSelector(submitButtonSelector);
  let submitButton = await page.$(submitButtonSelector);
  await submitButton.click();
});

Then("A new task is added into the homepage", async function () {
  await page.waitForSelector(".ant-list-items");
  await page.focus(".ant-list-items");
});

Then("I can mark the task as finished", async function () {
  let checkboxSelector = [".ant-checkbox-input"];
  await page.waitForSelector(checkboxSelector);
  let checkbox = await page.$(checkboxSelector);
  await checkbox.click();

  var taskName = await page.$$eval("._3MUtatz4RPU3O9iHX86edZ", (elements) =>
    elements.map((item) => item.textContent)
  );
  expect(taskName).to.include("Learn Automation Testing");

  console.log(taskName);
});

AfterAll(async () => {
  await page.waitForTimeout(5000);
  await browser.close();
});

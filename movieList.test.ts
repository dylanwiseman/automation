import { Builder, Capabilities, By } from "selenium-webdriver"
import { afterAll, beforeAll, expect, test } from "@jest/globals"
const chromedriver = require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('Adds movie to the page', async () => {
    let input = await driver.findElement(By.id('input'))
    await input.sendKeys('Batman')
    let button = await driver.findElement(By.xpath('//button'))
    await button.click()
})
test('Crosses off movie', async () => {
    let movie = await driver.findElement(By.xpath('//span'))
    await movie.click()
})
test('Check that the watched movie message is correct', async () => {
    let aside = await driver.findElement(By.xpath('//aside'))
    let asideText = await aside.getText()
    let movie = await driver.findElement(By.xpath('//span'))
    let movieText = await movie.getText()
    expect(asideText).toBe(`${movieText} watched!`)
})
test('Deletes movie from page', async () => {
    let deleteButton = await driver.findElement(By.xpath('//button[text()="x"]'))
    await deleteButton.click()
})
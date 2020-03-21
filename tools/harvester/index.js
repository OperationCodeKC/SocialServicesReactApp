const fs = require("fs");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const rootUrl = "https://harvesters.org";
const output = "./output";

const downloadPage = async url => {
  const response = await fetch(url);
  const html = await response.text();
  return cheerio.load(html);
};

const parseCityStateZip = s => {
  const arr = s.split(" ");
  const zip = arr[arr.length - 1];
  const state = arr[arr.length - 2];
  const city = arr.slice(0, arr.length - 2).join(" ");
  return [city, state, zip];
};

(async function() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }

  const zip = "66224";
  const radius = 10;
  const serviceType = 1;
  const $ = await downloadPage(
    `${rootUrl}/Get-Help/Service-Locator.aspx?locale=${zip}&radius=${radius}&serviceType=${serviceType}`
  );

  const foodBanks = [];
  const results = $(".row.assistance-result");
  console.log(`${results.length} results`);
  const count = results.length;
  for (let i = 0; i < count; i++) {
    const name = $(results[i].firstChild.firstChild).text();
    const address = $(results[i].firstChild.childNodes[1].firstChild)
      .html()
      .split("<br>");
    const streetAddress = address[0].trim();
    const [city, state, zip] = parseCityStateZip(address[1]);
    const phone = address[2];
    const link = `${rootUrl}${$(
      results[i].childNodes[1].childNodes[1].firstChild
    ).attr("href")}`;
    // console.log($("div > div", results[i]).html());
    const $page = await downloadPage(link);
    const html = $page.html();
    const regEx = /sll=([0-9-.]+),([0-9-.]+)/m;
    const match = html.match(regEx);
    const lat = match[1];
    const lng = match[2];
    console.log({
      name,
      streetAddress,
      city,
      state,
      zip,
      phone,
      link,
      lat,
      lng
    });
  }
  //fs.writeFileSync(filename, JSON.stringify(foodBanks))
})();

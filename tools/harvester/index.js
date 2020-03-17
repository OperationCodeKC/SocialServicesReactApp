const fs = require("fs");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const rootUrl = "https://harvesters.org";
const output = "./output";

const downloadPage = async url => {
  const response = await fetch(rootUrl + url);
  const html = await response.text();
  return cheerio.load(html);
};

(async function() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }

  const zip = "66224";
  const radius = 10;
  const serviceType = 1;
  const $ = await downloadPage(
    `/Get-Help/Service-Locator.aspx?locale=${zip}&radius=${radius}&serviceType=${serviceType}`
  );

  const foodBanks = [];
  const results = $(".row.assistance-result");
  console.log(`${results.length} results`);
  for (let i = 0; i < results.length; i++) {
    console.log($(results[i]).html());
  }
  //fs.writeFileSync(filename, JSON.stringify(foodBanks))
})();

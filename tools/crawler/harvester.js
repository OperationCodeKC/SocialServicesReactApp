require("dotenv").config();
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

const downloadJson = async url => {
  const response = await fetch(url);
  return await response.json();
};

const parseCityStateZip = s => {
  const arr = s.split(" ");
  const zip = arr[arr.length - 1];
  const state = arr[arr.length - 2];
  const city = arr.slice(0, arr.length - 2).join(" ");
  return [city, state, zip];
};

const searchByZip = async (zip, radius = 30, serviceType = -1) => {
  console.log(`seaching zip ${zip}...`);
  const $ = await downloadPage(
    `${rootUrl}/Get-Help/Service-Locator.aspx?locale=${zip}&radius=${radius}&serviceType=${serviceType}`
  );

  const results = $(".row.assistance-result");
  console.log(`${results.length} results`);
  const count = results.length;
  for (let i = 0; i < count; i++) {
    const name = $(results[i].firstChild.firstChild)
      .text()
      .trim();
    const address = $(results[i].firstChild.childNodes[1].firstChild)
      .html()
      .split("<br>");
    const streetAddress = address[0].trim().replace(/\s{2}/g, " ");
    const [city, state, zip] = parseCityStateZip(address[1]);
    const phone = address[2];
    const link = `${rootUrl}${$(
      results[i].childNodes[1].childNodes[1].firstChild
    ).attr("href")}`;
    const id = link.match(/id=(\d+)/)[1];
    const filename = `./output/${id} ${name}.json`;
    // Skip if file already exists
    if (fs.existsSync(filename)) continue;

    const mapAddress = `${streetAddress},${city},${state} ${zip}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${escape(
      mapAddress
    )}&key=${process.env.API_KEY}`;
    const json = await downloadJson(url);
    const geometry = json.results[0].geometry;
    const lat = geometry.location.lat;
    const lng = geometry.location.lng;
    const location = {
      Type: "FoodBank",
      Name: name,
      Phone: phone,
      Address: streetAddress,
      City: city,
      State: state,
      Zipcode: zip,
      lat,
      lng,
      link
    };
    fs.writeFileSync(filename, JSON.stringify(location, undefined, 2));
  }
};
(async function() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }
  const zips = fs.readFileSync("zips.txt", "utf-8").split("\n");
  for (let i = 0; i < zips.length; i++) {
    await searchByZip(zips[i]);
  }
  console.log("merging geoBanks.json...");
  const geoJson = [];
  fs.readdirSync(output).forEach(path => {
    const json = fs.readFileSync(`${output}/${path}`, "utf-8");
    geoJson.push(JSON.parse(json));
  });
  fs.writeFileSync(
    "../../src/components/geoBanks.json",
    JSON.stringify(geoJson, null, 2)
  );
  console.log("Done!");
})();

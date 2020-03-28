require("dotenv").config();
const fs = require("fs");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const rootUrl = "https://shelterlist.com";
const output = "./output-sl";

const downloadPage = async url => {
  const response = await fetch(url);
  const html = await response.text();
  return cheerio.load(html);
};

const downloadJson = async url => {
  const response = await fetch(url);
  return await response.json();
};

const searchByZip = async zip => {
  console.log(`seaching zip ${zip}...`);
  const $ = await downloadPage(`${rootUrl}/zip/${zip}`);

  const results = $(".listings div");
  console.log(`${results.length} results`);
  const count = results.length;
  for (let i = 0; i < count; i++) {
    const name = $("h3", $(results[i]))
      .text()
      .trim();
    const $a = $("div h3 a", $(results[i]));
    const streetAddress = $(".street").html();
    const cityStateZip = $(".cityState")
      .html()
      .split(" ");
    const zip = cityStateZip[cityStateZip.length - 1];
    const state = cityStateZip[cityStateZip.length - 2];
    const city = cityStateZip.slice(0, cityStateZip.length - 2).join(" ");
    let phone = $(".phone")
      .html()
      .split(" ");
    phone = `${phone[0]}-${phone[1]}`;
    // console.log({ name, streetAddress, city, state, zip, phone });
    const link = `${rootUrl}${$a.attr("href").substr(1)}`;
    // console.log(link);
    const id = name;
    const filename = `./output-sl/${id} ${name}.json`;
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
      Type: "Shelter",
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
    if (zips[i].startsWith("#")) continue;
    await searchByZip(zips[i]);
  }
  console.log("merging geoShelters.json...");
  const geoJson = [];
  fs.readdirSync(output).forEach(path => {
    const json = fs.readFileSync(`${output}/${path}`, "utf-8");
    geoJson.push(JSON.parse(json));
  });
  fs.writeFileSync(
    "../../src/components/geoShelters.json",
    JSON.stringify(geoJson, null, 2)
  );
  console.log("Done!");
})();

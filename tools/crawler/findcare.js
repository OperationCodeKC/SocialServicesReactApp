require("dotenv").config();
const fs = require("fs");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const rootUrl = "https://findcare.org";
const output = "./output-fc";

const downloadPage = async url => {
  const response = await fetch(url);
  const html = await response.text();
  return cheerio.load(html);
};

const downloadJson = async url => {
  const response = await fetch(url);
  return await response.json();
};

const parseAddress = s => {
  const arr = s
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);
  const streetAddress = arr[0].replace(/,$/, "");
  const city = arr[1].replace(/,$/, "");
  const [state, zip] = arr[2].split("\t").filter(line => line.length > 0);
  const [phone] = arr[3].split("\t");
  return [streetAddress, city, state, zip, phone];
};

const searchByZip = async (zip, radius = 30, page = 1) => {
  console.log(`seaching zip ${zip} page ${page}...`);
  const $ = await downloadPage(
    `${rootUrl}/search?location=${zip}&distance=${radius}&page=${page}`
  );

  const results = $(".listing_row");
  console.log(`${results.length} results`);
  const count = results.length;
  for (let i = 0; i < count; i++) {
    const name = $("h3", $(results[i]))
      .text()
      .trim();
    const $a = $("h6 a", $(results[i]));
    const [streetAddress, city, state, zip, phone] = parseAddress($a.text());
    const link = `${rootUrl}${$a.attr("href").substr(1)}`;
    const id = link.match(/clinic_id=(\d+)/)[1];
    // console.log({ streetAddress, city, state, zip, phone, link, id });
    const filename = `./output-fc/${id} ${name}.json`;
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
      Type: "HealthCenter",
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
  return count;
};
(async function() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }
  const zips = fs.readFileSync("zips.txt", "utf-8").split("\n");
  for (let i = 0; i < zips.length; i++) {
    if (zips[i].startsWith("#")) continue;
    let page = 1;
    let count = 0;
    do {
      count = await searchByZip(zips[i], 30, page++);
    } while (count > 0);
  }
  console.log("merging geoHealth.json...");
  const geoJson = [];
  fs.readdirSync(output).forEach(path => {
    const json = fs.readFileSync(`${output}/${path}`, "utf-8");
    geoJson.push(JSON.parse(json));
  });
  fs.writeFileSync(
    "../../src/components/geoHealth.json",
    JSON.stringify(geoJson, null, 2)
  );
  console.log("Done!");
})();

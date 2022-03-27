const fetch = require("cross-fetch");
const cheerio = require("cheerio");

const opts = {
  headers: {
    cookie: "hasCookie=true",
  },
};

async function getData() {
  try {
    const res = await fetch(`https://codequiz.azurewebsites.net/`, opts);
    let body = await res.text();
    const $ = cheerio.load(body);

    const table = $("table tr td");
    var args = process.argv.slice(2);
    let next = false;
    table.each((idx, el) => {
      let val = $(el).text();
      if (next) {
        console.log(val);
        return false;
      }

      if (val === args[0]) next = true;
    });
  } catch (err) {
    console.error(err);
  }
}

getData();

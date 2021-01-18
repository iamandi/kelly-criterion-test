const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./spy_historical_data.csv"),
  console: false,
});

function median(values) {
  if (values.length === 0) return 0;

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

let totalLines = 0;
let _2pc = 0;
const _2pcArr = [];
const valueArr = [];
let total = 0;
let _2pcTotal = 0;
readInterface
  .on("line", function (line) {
    const row = line.split(",");
    if (row[7] && row[7] !== '"Change %"') {
      try {
        const pc =
          row[7].replace("%", "").replace('"', "").replace('"', "") * 1;
        //console.log(pc);

        if (pc > 1.9 || pc < -1.9) {
          _2pc++;
          _2pcArr.push(pc);
          _2pcTotal++;
        }

        valueArr.push(pc);

        total = total + pc;

        totalLines++;
      } catch (e) {}
    }
  })
  .on("close", () => {
    console.log("_2pc = ", _2pc);
    console.log("totalLines", totalLines);
    console.log("_2pc percentage", (_2pc / totalLines) * 100);

    console.log("_2pcArr mean", _2pcTotal / _2pcArr.length);
    console.log("_2pcArr median", median(_2pcArr));

    console.log("valueArr mean", total / totalLines);
    console.log("valueArr median", median(valueArr));
  });

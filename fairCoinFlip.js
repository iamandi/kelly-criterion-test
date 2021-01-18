const _ = require("lodash");

const flip = _.sample([true, false]);

if (process.argv.length !== 3)
  throw new Error("Sample size needs to be provided!");

let numOfFlips = process.argv[2];
let payoff = process.argv[3] || 7; // 2 to 1 odd by default
let potSize = process.argv[4] || 1000; // default $100;
const winOdds = 1 / 6; //0.5;

while (numOfFlips > 0) {
  numOfFlips--;

  // kellyFactor = prob of win - (prob of loss / net odds received)
  const kellyFactor = winOdds - (1 - winOdds) / payoff;
  betSize = potSize * kellyFactor;
  potSize = potSize - betSize;

  console.log(`>>> before: potSize=${potSize} betSize=${betSize}`);

  if (_.sample([true, false])) potSize = potSize + 3 * betSize;

  console.log(`After: potSize=${potSize} betSize=${betSize} <<<`);
}

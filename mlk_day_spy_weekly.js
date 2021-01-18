const spy_returns = [
  -1.62,
  1.84,
  0.51,
  -4.48,
  0.15,
  -1.41,
  -2.03,
  -0.02,
  0.41,
  -2.14,
  -3.9,
  -0.76,
  2.04,
  1.14,
  -2.63,
  1.6,
  1.41,
  -0.15,
  0.86,
  -0.22,
  -1.03,
];

let start = 1998;
let end = 2020;
let diff = end - start - 1;
let _2pc = 0;
let _2pcInaugurationYear = 0;
spy_returns.map((res, i) => {
  if (res > 1.8 || res < -1.8) _2pc++;

  if (i % 4 === 0 && (res > 1.8 || res < -1.8)) {
    _2pcInaugurationYear++;
    console.log("year = ", i + 2000);
  }
});

console.log("_2pc = ", _2pc);
console.log("_2pcInaugurationYear = ", _2pcInaugurationYear);

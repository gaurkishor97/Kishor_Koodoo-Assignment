const {
  standardDeviation,
  sanitizeAmounts,
  roundToTwoDp,
  analysePayments,
} = require("./analyze.js");
const test = require("ava");


test('1- Standard Deviation should be correct for Basic Data', t => {
    //First Argument for t.is is actual, second is expected
     t.deepEqual(standardDeviation([2, 4, 8, 6, 10, 12]), 3.42);
})

test("2- standardDeviation should be correct for Integers", (t) => {
  //First Argument for t.deepEqual is actual, second is expected
  t.deepEqual(standardDeviation([2, -4, 8, -6, 10, -12, 0]), 7.21);
});

test("3- standardDeviation should show NaN for empty array", (t) => {
  //First Argument for t.deepEqual is actual, second is expected
  t.deepEqual(standardDeviation([]), NaN);
});

test("4- standardDeviation should show NaN for special Characters array", (t) => {
  //First Argument for t.deepEqual is actual, second is expected
  t.deepEqual(standardDeviation([1, 2, "@", "!", "#", 4]), NaN);
});

test("5- standardDeviation should be correct for huge integer value", (t) => {
  //First Argument for t.deepEqual is actual, second is expected
  t.deepEqual(standardDeviation([9999999999999999999999999999999999999999, 9999999999999999999999999999999999999999]), 0);
});


test('6- analysePayments should return correct result for the Integers', t => {
    //First Argument for t.is is actual, second is expected
    t.deepEqual(analysePayments([{
            "Amount": -1,
            "TransactionInformation": "Payment One"
        },
        {
            "Amount": 1,
            "TransactionInformation": "Payment Two"
        },
        {
                    "Amount": 9999999999,
                    "TransactionInformation": "Payment Two"
                },
        {
            "Amount": -3000,
            "TransactionInformation": "Payment Three"
        },
        {
            "Amount": 0,
            "TransactionInformation": "Payment Four"
        }
    ]), {
        max: 9999999999,
        mean: 1999999399.8,
        median: 0,
        min: -3000,
        standardDeviation:4000000299.6,
    })
})

test("7- analysePayments should return correct result for multiple combinations", (t) => {
  //First Argument for t.deepEqual is actual, second is expected
  t.deepEqual(
    analysePayments([
      {
        Amount: 10.97,
        TransactionInformation: "50 Dogs Bar",
      },
      {
        TransactionInformation: "Bank Account Verification",
      },
      {},
      {
        Amount: -50,
      },
      {
        Amount: "750",
        TransactionInformation: "Koodoo Mortgage Co.",
      },
      {
        amount: 100,
      },
      {
        Amount: 0,
      },
    ]),
    {
      max: 750,
      mean: 177.74,
      median: 5.485,
      min: -50,
      standardDeviation: 331.19,
    }
  );
});

test("8- analysePayments should return correct result for array with one object", (t) => {
  t.deepEqual(analysePayments([{ Amount: 1 }]),
  {
      min: 1,
      mean: 1,
      median: 1,
      max: 1,
      standardDeviation: 0,
    }
    );
});

test("9- analysePayments should return correct result for empty array", (t) => {
   t.deepEqual(analysePayments([]),
  {
      min: Infinity,
      mean: NaN,
      median: NaN,
      max: -Infinity,
      standardDeviation: NaN,
    }
  );
});

test("10- analysePayments should return NaN for special characters array", (t) => {
  //First Argument for t.deepEqual is actual, second is expected
  t.deepEqual(
    analysePayments([
      {
        Amount: "$500",
        TransactionInformation: "50 Dogs Bar",
      }
    ]),
    {
      max: NaN,
      mean: NaN,
      median: NaN,
      min: NaN,
      standardDeviation: NaN,
    }
  );
});



test("11- sanitizeAmounts should sanitize the payments array", (t) => {
  t.deepEqual(sanitizeAmounts([
                                  {
                                    Amount: 10.97,
                                    TransactionInformation: "50 Dogs Bar",
                                  },
                                  {
                                    TransactionInformation: "Bank Account Verification",
                                  },
                                  {},
                                  {
                                    Amount: -50,
                                  },
                                  {
                                    Amount: "750",
                                    TransactionInformation: "Koodoo Mortgage Co.",
                                  },
                                  {
                                    amount: 100,
                                  },
                                  {
                                    Amount: 0,
                                  },
                                ]),
                               [10.97, -50, 750, 0] );
});

test("12- sanitizeAmounts should return empty array for empty payments array", (t) => {
  t.deepEqual(sanitizeAmounts([]), []);
});

test("13- sanitizeAmounts should return correct value for empty amount", (t) => {
    t.deepEqual(sanitizeAmounts([{ Amount: " " }]), [0]);
});

test("14- sanitizeAmounts should return correct result for array with single object", (t) => {
  t.deepEqual(sanitizeAmounts([{ Amount: 1 }]), [1]);
});

test("15- sanitizeAmounts should return NaN for non-numeric amount", (t) => {
   t.deepEqual(sanitizeAmounts([{ Amount:  "hundred" }]), [NaN]);
  });

test("16- sanitizeAmounts should return NaN for special character amount", (t) => {
    t.deepEqual(sanitizeAmounts([{ Amount: "$-300" }]), [NaN]);
  });



test("17- roundToTwoDp should round a number to two upper digits", (t) => {
  t.deepEqual(roundToTwoDp(99.67946), 99.68);
});

test("18- roundToTwoDp should round a number to two lower digits", (t) => {
  t.deepEqual(roundToTwoDp(99.67446), 99.67);
});

test("19- roundToTwoDp should round a negative number to two digits", (t) => {
  t.deepEqual(roundToTwoDp(-99.67946), -99.68);
});

test("20- roundToTwoDp should round a number to two lower negative digits", (t) => {
  t.deepEqual(roundToTwoDp(-99.67446), -99.67);
});

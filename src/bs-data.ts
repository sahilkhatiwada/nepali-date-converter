// Minimal BS/AD mapping data for proof of concept
// Each year contains the number of days in each month for that BS year
// Real implementation should extend this data for full range

export const bsMonthData: { [year: number]: number[] } = {
  2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2001: [31, 31, 32, 31, 32, 31, 29, 30, 30, 29, 30, 30],
  2002: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
};

// The AD date corresponding to the start of BS 2000 (Baisakh 1, 2000 BS)
export const bsEpoch = {
  bs: { year: 2000, month: 1, day: 1 },
  ad: { year: 1943, month: 4, day: 14 },
}; 
"use strict";
// Nepali Date Converter - Core API
// Provides conversion between Gregorian (AD) and Bikram Sambat (BS) calendars
// and date formatting utilities.
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertADToBS = convertADToBS;
exports.convertBSToAD = convertBSToAD;
exports.formatDate = formatDate;
exports.getDayOfWeek = getDayOfWeek;
const bs_data_1 = require("./bs-data");
function daysBetweenAD(ad1, ad2) {
    // Returns the number of days from ad1 to ad2 (ad2 - ad1)
    const d1 = new Date(ad1.year, ad1.month - 1, ad1.day);
    const d2 = new Date(ad2.year, ad2.month - 1, ad2.day);
    return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}
function addDaysToBS(bs, days) {
    var _a;
    let { year, month, day } = bs;
    day += days;
    while (true) {
        const daysInMonth = (_a = bs_data_1.bsMonthData[year]) === null || _a === void 0 ? void 0 : _a[month - 1];
        if (!daysInMonth)
            break;
        if (day > daysInMonth) {
            day -= daysInMonth;
            month++;
            if (month > 12) {
                month = 1;
                year++;
            }
        }
        else {
            break;
        }
    }
    return { year, month, day };
}
function subtractDaysFromBS(bs, days) {
    var _a;
    let { year, month, day } = bs;
    day -= days;
    while (day < 1) {
        month--;
        if (month < 1) {
            year--;
            month = 12;
        }
        const daysInMonth = (_a = bs_data_1.bsMonthData[year]) === null || _a === void 0 ? void 0 : _a[month - 1];
        if (!daysInMonth)
            break;
        day += daysInMonth;
    }
    return { year, month, day };
}
function daysBetweenBS(bs1, bs2) {
    var _a;
    // Returns the number of days from bs1 to bs2 (bs2 - bs1)
    let days = 0;
    let { year, month, day } = bs1;
    while (year < bs2.year || (year === bs2.year && month < bs2.month) || (year === bs2.year && month === bs2.month && day < bs2.day)) {
        day++;
        days++;
        const daysInMonth = (_a = bs_data_1.bsMonthData[year]) === null || _a === void 0 ? void 0 : _a[month - 1];
        if (!daysInMonth) {
            throw new Error(`Unsupported BS year: ${year}`);
        }
        if (day > daysInMonth) {
            day = 1;
            month++;
            if (month > 12) {
                month = 1;
                year++;
            }
        }
    }
    return days;
}
/**
 * Converts a Gregorian (AD) date to Bikram Sambat (BS).
 * @param adDate - The AD date to convert.
 * @returns The corresponding BS date.
 */
function convertADToBS(adDate) {
    // Validate input
    if (adDate.month < 1 || adDate.month > 12 || adDate.day < 1 || adDate.day > 31) {
        throw new Error('Invalid AD date');
    }
    // Only supports AD dates between 1943-04-14 and 1945-04-13 (BS 2000-2002)
    const days = daysBetweenAD(bs_data_1.bsEpoch.ad, adDate);
    if (days < 0 || days > 1095) { // ~3 years
        throw new Error('AD date outside supported range (1943-1945)');
    }
    return addDaysToBS(bs_data_1.bsEpoch.bs, days);
}
/**
 * Converts a Bikram Sambat (BS) date to Gregorian (AD).
 * @param bsDate - The BS date to convert.
 * @returns The corresponding AD date.
 */
function convertBSToAD(bsDate) {
    // Validate input
    if (bsDate.month < 1 || bsDate.month > 12 || bsDate.day < 1 || bsDate.day > 32) {
        throw new Error('Invalid BS date');
    }
    // Only supports BS dates between 2000-01-01 and 2002-12-31
    if (bsDate.year < 2000 || bsDate.year > 2002) {
        throw new Error('BS date outside supported range (2000-2002)');
    }
    // Find days between bsEpoch.bs and bsDate
    const days = daysBetweenBS(bs_data_1.bsEpoch.bs, bsDate);
    const d = new Date(bs_data_1.bsEpoch.ad.year, bs_data_1.bsEpoch.ad.month - 1, bs_data_1.bsEpoch.ad.day);
    d.setDate(d.getDate() + days);
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}
const nepaliMonths = ['बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुण', 'चैत्र'];
const englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nepaliNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
function toNepaliNumber(num) {
    return num.toString().split('').map(d => { var _a; return (_a = nepaliNumerals[+d]) !== null && _a !== void 0 ? _a : d; }).join('');
}
function formatDate(date, format) {
    let isBS = false;
    let bs;
    let ad;
    // Check if it's a BS date in supported range
    if (date.year >= 2000 && date.year <= 2002) {
        isBS = true;
        bs = date;
        ad = convertBSToAD(bs);
    }
    else if (date.year >= 1943 && date.year <= 1945) {
        // AD date in supported range
        ad = date;
        bs = convertADToBS(ad);
    }
    else {
        // For dates outside supported range, treat as AD date for English formatting
        // and throw error for Nepali formatting since we can't convert
        ad = date;
        if (format.startsWith('nepali')) {
            throw new Error('Cannot format date in Nepali: date outside supported range');
        }
        // For English formatting, use the AD date as-is
        const year = ad.year;
        const month = englishMonths[ad.month - 1];
        const day = ad.day;
        if (format === 'english-full') {
            return `${day} ${month} ${year}`;
        }
        else {
            return `${year}/${ad.month}/${day}`;
        }
    }
    if (format.startsWith('nepali')) {
        // Nepali format
        const year = toNepaliNumber(bs.year);
        const month = nepaliMonths[bs.month - 1];
        const day = toNepaliNumber(bs.day);
        if (format === 'nepali-full') {
            return `${year} ${month} ${day}`;
        }
        else {
            return `${year}/${toNepaliNumber(bs.month)}/${day}`;
        }
    }
    else {
        // English format
        const year = ad.year;
        const month = englishMonths[ad.month - 1];
        const day = ad.day;
        if (format === 'english-full') {
            return `${day} ${month} ${year}`;
        }
        else {
            return `${year}/${ad.month}/${day}`;
        }
    }
}
const nepaliWeekdays = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];
const englishWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function isBSDate(date) {
    // Only treat as BSDate if year is in the supported BS range
    return (typeof date.year === 'number' &&
        typeof date.month === 'number' &&
        typeof date.day === 'number' &&
        date.year >= 2000 && date.year <= 2002 &&
        date.month >= 1 && date.month <= 12 &&
        date.day >= 1 && date.day <= 32);
}
function getDayOfWeek(date, locale = 'en') {
    // Validate locale
    if (locale !== 'ne' && locale !== 'en') {
        throw new Error('Invalid locale. Use "ne" for Nepali or "en" for English');
    }
    let ad;
    if ('year' in date && 'month' in date && 'day' in date) {
        // Validate date structure
        if (date.month < 1 || date.month > 12 || date.day < 1 || date.day > 32) {
            throw new Error('Invalid date object');
        }
        if (isBSDate(date)) {
            // BSDate logic
            if (date.year <= 2002) {
                try {
                    ad = convertBSToAD(date);
                }
                catch (error) {
                    throw new Error('BS date outside supported range');
                }
            }
            else {
                throw new Error('BS date outside supported range');
            }
        }
        else {
            // Treat as ADDate
            ad = date;
        }
    }
    else {
        throw new Error('Invalid date object');
    }
    const jsDate = new Date(ad.year, ad.month - 1, ad.day);
    const dayIdx = jsDate.getDay();
    return locale === 'ne' ? nepaliWeekdays[dayIdx] : englishWeekdays[dayIdx];
}

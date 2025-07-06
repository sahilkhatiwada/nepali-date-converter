"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe('Weekday Calculation Tests', () => {
    describe('getDayOfWeek with English locale', () => {
        test('should return correct English weekday for known BS date', () => {
            // 2000-01-01 BS = 1943-04-14 AD = Wednesday
            const bsDate = { year: 2000, month: 1, day: 1 };
            const result = (0, index_1.getDayOfWeek)(bsDate, 'en');
            expect(result).toBe('Wednesday');
        });
        test('should return correct English weekday for known AD date', () => {
            // 1943-04-14 AD = Wednesday
            const adDate = { year: 1943, month: 4, day: 14 };
            const result = (0, index_1.getDayOfWeek)(adDate, 'en');
            expect(result).toBe('Wednesday');
        });
        test('should return all English weekdays correctly', () => {
            const expectedWeekdays = [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ];
            // Test a week of dates to ensure all weekdays are covered
            for (let i = 0; i < 7; i++) {
                const adDate = { year: 1943, month: 4, day: 14 + i };
                const result = (0, index_1.getDayOfWeek)(adDate, 'en');
                expect(expectedWeekdays).toContain(result);
            }
        });
        test('should use English as default locale', () => {
            const bsDate = { year: 2000, month: 1, day: 1 };
            const result1 = (0, index_1.getDayOfWeek)(bsDate);
            const result2 = (0, index_1.getDayOfWeek)(bsDate, 'en');
            expect(result1).toBe(result2);
        });
    });
    describe('getDayOfWeek with Nepali locale', () => {
        test('should return correct Nepali weekday for known BS date', () => {
            // 2000-01-01 BS = 1943-04-14 AD = बुधबार (Wednesday)
            const bsDate = { year: 2000, month: 1, day: 1 };
            const result = (0, index_1.getDayOfWeek)(bsDate, 'ne');
            expect(result).toBe('बुधबार');
        });
        test('should return correct Nepali weekday for known AD date', () => {
            // 1943-04-14 AD = बुधबार (Wednesday)
            const adDate = { year: 1943, month: 4, day: 14 };
            const result = (0, index_1.getDayOfWeek)(adDate, 'ne');
            expect(result).toBe('बुधबार');
        });
        test('should return all Nepali weekdays correctly', () => {
            const expectedWeekdays = [
                'आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार',
                'बिहीबार', 'शुक्रबार', 'शनिबार'
            ];
            // Test a week of dates to ensure all weekdays are covered
            for (let i = 0; i < 7; i++) {
                const adDate = { year: 1943, month: 4, day: 14 + i };
                const result = (0, index_1.getDayOfWeek)(adDate, 'ne');
                expect(expectedWeekdays).toContain(result);
            }
        });
    });
    describe('Weekday consistency', () => {
        test('should return same weekday for same date regardless of input type', () => {
            const bsDate = { year: 2000, month: 1, day: 1 };
            const adDate = { year: 1943, month: 4, day: 14 };
            const bsWeekday = (0, index_1.getDayOfWeek)(bsDate, 'en');
            const adWeekday = (0, index_1.getDayOfWeek)(adDate, 'en');
            expect(bsWeekday).toBe(adWeekday);
        });
        test('should maintain weekday consistency across different dates', () => {
            // Test that weekdays follow the correct sequence
            const weekdays = [];
            for (let i = 0; i < 7; i++) {
                const adDate = { year: 1943, month: 4, day: 14 + i };
                weekdays.push((0, index_1.getDayOfWeek)(adDate, 'en'));
            }
            const expectedSequence = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'];
            expect(weekdays).toEqual(expectedSequence);
        });
    });
    describe('Edge cases', () => {
        test('should handle month boundary dates', () => {
            const bsDate = { year: 2000, month: 12, day: 31 };
            const result = (0, index_1.getDayOfWeek)(bsDate, 'en');
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).toContain(result);
        });
        test('should handle leap year dates', () => {
            const adDate = { year: 1944, month: 2, day: 29 };
            const result = (0, index_1.getDayOfWeek)(adDate, 'en');
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).toContain(result);
        });
        test('should handle year boundary dates', () => {
            const adDate = { year: 1943, month: 12, day: 31 };
            const result = (0, index_1.getDayOfWeek)(adDate, 'en');
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).toContain(result);
        });
    });
    describe('Input validation', () => {
        test('should throw error for invalid date object', () => {
            const invalidDate = { year: 2000, month: 13, day: 32 };
            expect(() => (0, index_1.getDayOfWeek)(invalidDate, 'en')).toThrow();
        });
        test('should throw error for unsupported BS date range', () => {
            const unsupportedBS = { year: 2078, month: 6, day: 24 };
            expect(() => (0, index_1.getDayOfWeek)(unsupportedBS, 'en')).toThrow();
        });
        test('should handle unsupported AD date range gracefully', () => {
            const unsupportedAD = { year: 2021, month: 10, day: 10 };
            expect(() => (0, index_1.getDayOfWeek)(unsupportedAD, 'en')).toThrow();
        });
    });
    describe('Locale handling', () => {
        test('should handle both locale types correctly', () => {
            const bsDate = { year: 2000, month: 1, day: 1 };
            const englishResult = (0, index_1.getDayOfWeek)(bsDate, 'en');
            const nepaliResult = (0, index_1.getDayOfWeek)(bsDate, 'ne');
            expect(englishResult).toBe('Wednesday');
            expect(nepaliResult).toBe('बुधबार');
            expect(englishResult).not.toBe(nepaliResult);
        });
        test('should handle case sensitivity in locale parameter', () => {
            const bsDate = { year: 2000, month: 1, day: 1 };
            expect(() => (0, index_1.getDayOfWeek)(bsDate, 'EN')).toThrow();
            expect(() => (0, index_1.getDayOfWeek)(bsDate, 'NE')).toThrow();
        });
    });
    describe('Performance and consistency', () => {
        test('should return consistent results for same input', () => {
            const bsDate = { year: 2000, month: 1, day: 1 };
            const result1 = (0, index_1.getDayOfWeek)(bsDate, 'en');
            const result2 = (0, index_1.getDayOfWeek)(bsDate, 'en');
            expect(result1).toBe(result2);
        });
        test('should handle multiple calls without errors', () => {
            const bsDate = { year: 2000, month: 1, day: 1 };
            for (let i = 0; i < 100; i++) {
                expect(() => (0, index_1.getDayOfWeek)(bsDate, 'en')).not.toThrow();
                const result = (0, index_1.getDayOfWeek)(bsDate, 'en');
                expect(result).toBe('Wednesday');
            }
        });
    });
});

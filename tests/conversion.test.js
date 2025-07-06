"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe('Date Conversion Tests', () => {
    describe('convertADToBS', () => {
        test('should convert known AD date to BS correctly', () => {
            // Known mapping: 1943-04-14 AD = 2000-01-01 BS
            const adDate = { year: 1943, month: 4, day: 14 };
            const expected = { year: 2000, month: 1, day: 1 };
            const result = (0, index_1.convertADToBS)(adDate);
            expect(result).toEqual(expected);
        });
        test('should convert AD date within supported range', () => {
            // Test a date in the middle of supported range
            const adDate = { year: 1944, month: 6, day: 15 };
            const result = (0, index_1.convertADToBS)(adDate);
            expect(result.year).toBeGreaterThanOrEqual(2000);
            expect(result.year).toBeLessThanOrEqual(2002);
            expect(result.month).toBeGreaterThanOrEqual(1);
            expect(result.month).toBeLessThanOrEqual(12);
            expect(result.day).toBeGreaterThanOrEqual(1);
            expect(result.day).toBeLessThanOrEqual(32);
        });
        test('should handle leap year conversion', () => {
            // Test conversion around leap year
            const adDate = { year: 1944, month: 2, day: 29 };
            const result = (0, index_1.convertADToBS)(adDate);
            expect(result).toBeDefined();
            expect(typeof result.year).toBe('number');
            expect(typeof result.month).toBe('number');
            expect(typeof result.day).toBe('number');
        });
        test('should throw error for unsupported AD date range', () => {
            // Test date outside supported range
            const adDate = { year: 2021, month: 10, day: 10 };
            expect(() => (0, index_1.convertADToBS)(adDate)).toThrow();
        });
    });
    describe('convertBSToAD', () => {
        test('should convert known BS date to AD correctly', () => {
            // Known mapping: 2000-01-01 BS = 1943-04-14 AD
            const bsDate = { year: 2000, month: 1, day: 1 };
            const expected = { year: 1943, month: 4, day: 14 };
            const result = (0, index_1.convertBSToAD)(bsDate);
            expect(result).toEqual(expected);
        });
        test('should convert BS date within supported range', () => {
            // Test a date in the middle of supported range
            const bsDate = { year: 2001, month: 6, day: 15 };
            const result = (0, index_1.convertBSToAD)(bsDate);
            expect(result.year).toBeGreaterThanOrEqual(1943);
            expect(result.year).toBeLessThanOrEqual(1945);
            expect(result.month).toBeGreaterThanOrEqual(1);
            expect(result.month).toBeLessThanOrEqual(12);
            expect(result.day).toBeGreaterThanOrEqual(1);
            expect(result.day).toBeLessThanOrEqual(31);
        });
        test('should handle month transitions correctly', () => {
            // Test conversion at month boundaries
            const bsDate = { year: 2000, month: 12, day: 31 };
            const result = (0, index_1.convertBSToAD)(bsDate);
            expect(result).toBeDefined();
            expect(typeof result.year).toBe('number');
            expect(typeof result.month).toBe('number');
            expect(typeof result.day).toBe('number');
        });
        test('should throw error for unsupported BS date range', () => {
            // Test date outside supported range
            const bsDate = { year: 2078, month: 6, day: 24 };
            expect(() => (0, index_1.convertBSToAD)(bsDate)).toThrow();
        });
    });
    describe('Round-trip conversion', () => {
        test('should maintain consistency in round-trip conversion', () => {
            const originalAD = { year: 1944, month: 8, day: 15 };
            const bsDate = (0, index_1.convertADToBS)(originalAD);
            const convertedAD = (0, index_1.convertBSToAD)(bsDate);
            expect(convertedAD).toEqual(originalAD);
        });
        test('should handle edge cases in round-trip conversion', () => {
            const originalAD = { year: 1943, month: 12, day: 31 };
            const bsDate = (0, index_1.convertADToBS)(originalAD);
            const convertedAD = (0, index_1.convertBSToAD)(bsDate);
            expect(convertedAD).toEqual(originalAD);
        });
    });
    describe('Input validation', () => {
        test('should handle invalid month values', () => {
            const invalidAD = { year: 1944, month: 13, day: 1 };
            expect(() => (0, index_1.convertADToBS)(invalidAD)).toThrow();
        });
        test('should handle invalid day values', () => {
            const invalidAD = { year: 1944, month: 2, day: 32 };
            expect(() => (0, index_1.convertADToBS)(invalidAD)).toThrow();
        });
        test('should handle zero values', () => {
            const invalidAD = { year: 1944, month: 0, day: 0 };
            expect(() => (0, index_1.convertADToBS)(invalidAD)).toThrow();
        });
    });
});

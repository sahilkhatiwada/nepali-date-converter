"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe('Integration Tests', () => {
    describe('Complete workflow scenarios', () => {
        test('should handle complete date conversion and formatting workflow', () => {
            // Start with AD date
            const adDate = { year: 1943, month: 4, day: 14 };
            // Convert to BS
            const bsDate = (0, index_1.convertADToBS)(adDate);
            expect(bsDate).toEqual({ year: 2000, month: 1, day: 1 });
            // Format in different ways
            const nepaliFull = (0, index_1.formatDate)(bsDate, 'nepali-full');
            const nepaliShort = (0, index_1.formatDate)(bsDate, 'nepali-short');
            const englishFull = (0, index_1.formatDate)(adDate, 'english-full');
            const englishShort = (0, index_1.formatDate)(adDate, 'english-short');
            expect(nepaliFull).toBe('२००० बैशाख १');
            expect(nepaliShort).toBe('२०००/१/१');
            expect(englishFull).toBe('14 April 1943');
            expect(englishShort).toBe('1943/4/14');
            // Get weekday in both languages
            const englishWeekday = (0, index_1.getDayOfWeek)(bsDate, 'en');
            const nepaliWeekday = (0, index_1.getDayOfWeek)(bsDate, 'ne');
            expect(englishWeekday).toBe('Wednesday');
            expect(nepaliWeekday).toBe('बुधबार');
        });
        test('should handle round-trip conversion with formatting', () => {
            // Start with BS date
            const originalBS = { year: 2001, month: 6, day: 15 };
            // Convert to AD
            const adDate = (0, index_1.convertBSToAD)(originalBS);
            // Convert back to BS
            const convertedBS = (0, index_1.convertADToBS)(adDate);
            // Should be the same
            expect(convertedBS).toEqual(originalBS);
            // Format both in Nepali
            const originalFormatted = (0, index_1.formatDate)(originalBS, 'nepali-full');
            const convertedFormatted = (0, index_1.formatDate)(convertedBS, 'nepali-full');
            expect(originalFormatted).toBe(convertedFormatted);
        });
    });
    describe('Real-world use case simulations', () => {
        test('should simulate government form date handling', () => {
            // Simulate user entering AD date in form
            const userInputAD = { year: 1944, month: 8, day: 15 };
            // Convert to BS for display
            const bsDate = (0, index_1.convertADToBS)(userInputAD);
            // Display in Nepali format
            const displayDate = (0, index_1.formatDate)(bsDate, 'nepali-full');
            // Get weekday for form validation
            const weekday = (0, index_1.getDayOfWeek)(bsDate, 'ne');
            // Verify all outputs are valid
            expect(bsDate.year).toBeGreaterThanOrEqual(2000);
            expect(bsDate.year).toBeLessThanOrEqual(2002);
            expect(displayDate).toMatch(/^[०-९]+ [\u0900-\u097F]+ [०-९]+$/);
            expect(['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार']).toContain(weekday);
        });
        test('should simulate academic calendar conversion', () => {
            // Academic year start and end dates in AD
            const academicStartAD = { year: 1943, month: 4, day: 15 };
            const academicEndAD = { year: 1944, month: 4, day: 14 };
            // Convert to BS
            const academicStartBS = (0, index_1.convertADToBS)(academicStartAD);
            const academicEndBS = (0, index_1.convertADToBS)(academicEndAD);
            // Format for display
            const startDisplay = (0, index_1.formatDate)(academicStartBS, 'nepali-full');
            const endDisplay = (0, index_1.formatDate)(academicEndBS, 'nepali-full');
            // Verify academic year spans correctly
            expect(academicStartBS.year).toBe(2000);
            expect(academicEndBS.year).toBe(2001);
            expect(startDisplay).toContain('२०००');
            expect(endDisplay).toContain('२००१');
        });
        test('should simulate banking application date validation', () => {
            // Simulate date input validation
            const testDates = [
                { year: 2000, month: 1, day: 1 },
                { year: 2001, month: 6, day: 15 },
                { year: 2002, month: 12, day: 31 }
            ];
            testDates.forEach(bsDate => {
                // Validate BS date by converting to AD
                const adDate = (0, index_1.convertBSToAD)(bsDate);
                // Format both for display
                const bsFormatted = (0, index_1.formatDate)(bsDate, 'nepali-short');
                const adFormatted = (0, index_1.formatDate)(adDate, 'english-short');
                // Get weekday for both
                const bsWeekday = (0, index_1.getDayOfWeek)(bsDate, 'ne');
                const adWeekday = (0, index_1.getDayOfWeek)(adDate, 'en');
                // Verify all conversions are valid
                expect(adDate.year).toBeGreaterThanOrEqual(1943);
                expect(adDate.year).toBeLessThanOrEqual(1945);
                expect(bsFormatted).toMatch(/^[०-९]+\/[०-९]+\/[०-९]+$/);
                expect(adFormatted).toMatch(/^\d{4}\/\d{1,2}\/\d{1,2}$/);
                expect(['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार']).toContain(bsWeekday);
                expect(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).toContain(adWeekday);
            });
        });
    });
    describe('Error handling integration', () => {
        test('should handle unsupported date ranges gracefully', () => {
            const unsupportedDates = [
                { year: 2078, month: 6, day: 24 }, // Future BS date
                { year: 2021, month: 10, day: 10 } // Recent AD date
            ];
            unsupportedDates.forEach(date => {
                expect(() => {
                    if (date.year > 2100) {
                        (0, index_1.convertBSToAD)(date);
                    }
                    else {
                        (0, index_1.convertADToBS)(date);
                    }
                }).toThrow();
            });
        });
        test('should maintain consistency across all functions for valid dates', () => {
            const validAD = { year: 1944, month: 6, day: 15 };
            // All functions should work together without conflicts
            const bsDate = (0, index_1.convertADToBS)(validAD);
            const adDate = (0, index_1.convertBSToAD)(bsDate);
            // Round-trip should be consistent
            expect(adDate).toEqual(validAD);
            // Formatting should work for both
            const bsFormatted = (0, index_1.formatDate)(bsDate, 'nepali-full');
            const adFormatted = (0, index_1.formatDate)(adDate, 'english-full');
            // Weekday should be consistent
            const bsWeekday = (0, index_1.getDayOfWeek)(bsDate, 'en');
            const adWeekday = (0, index_1.getDayOfWeek)(adDate, 'en');
            expect(bsWeekday).toBe(adWeekday);
            expect(bsFormatted).toBeDefined();
            expect(adFormatted).toBeDefined();
        });
    });
    describe('Performance integration', () => {
        test('should handle multiple operations efficiently', () => {
            const testDate = { year: 2000, month: 6, day: 15 };
            // Perform multiple operations
            const results = [];
            for (let i = 0; i < 10; i++) {
                const adDate = (0, index_1.convertBSToAD)(testDate);
                const bsDate = (0, index_1.convertADToBS)(adDate);
                const formatted = (0, index_1.formatDate)(bsDate, 'nepali-full');
                const weekday = (0, index_1.getDayOfWeek)(bsDate, 'ne');
                results.push({ adDate, bsDate, formatted, weekday });
            }
            // All results should be consistent
            results.forEach(result => {
                expect(result.bsDate).toEqual(testDate);
                expect(result.formatted).toBe('२००० असार १५');
                expect(result.weekday).toBeDefined();
            });
        });
    });
});

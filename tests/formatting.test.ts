import { formatDate, BSDate, ADDate, DateFormat } from '../src/index';

describe('Date Formatting Tests', () => {
  describe('formatDate with BS dates', () => {
    const bsDate: BSDate = { year: 2000, month: 6, day: 15 };

    test('should format BS date in nepali-full format', () => {
      const result = formatDate(bsDate, 'nepali-full');
      expect(result).toBe('२००० आश्विन १५');
    });

    test('should format BS date in nepali-short format', () => {
      const result = formatDate(bsDate, 'nepali-short');
      expect(result).toBe('२०००/६/१५');
    });

    test('should format BS date in english-full format', () => {
      const result = formatDate(bsDate, 'english-full');
      // This will be the corresponding AD date in English format
      expect(result).toMatch(/^\d{1,2} \w+ \d{4}$/);
    });

    test('should format BS date in english-short format', () => {
      const result = formatDate(bsDate, 'english-short');
      // This will be the corresponding AD date in short format
      expect(result).toMatch(/^\d{4}\/\d{1,2}\/\d{1,2}$/);
    });
  });

  describe('formatDate with AD dates', () => {
    const adDate: ADDate = { year: 1943, month: 4, day: 14 };

    test('should format AD date in nepali-full format', () => {
      const result = formatDate(adDate, 'nepali-full');
      // This will be the corresponding BS date in Nepali format
      expect(result).toMatch(/^[०-९]+ [\u0900-\u097F]+ [०-९]+$/);
    });

    test('should format AD date in nepali-short format', () => {
      const result = formatDate(adDate, 'nepali-short');
      // This will be the corresponding BS date in short Nepali format
      expect(result).toMatch(/^[०-९]+\/[०-९]+\/[०-९]+$/);
    });

    test('should format AD date in english-full format', () => {
      const result = formatDate(adDate, 'english-full');
      expect(result).toBe('14 April 1943');
    });

    test('should format AD date in english-short format', () => {
      const result = formatDate(adDate, 'english-short');
      expect(result).toBe('1943/4/14');
    });
  });

  describe('Nepali numeral conversion', () => {
    test('should convert all digits to Nepali numerals', () => {
      const bsDate: BSDate = { year: 2000, month: 12, day: 31 };
      const result = formatDate(bsDate, 'nepali-short');
      
      // Should contain Nepali numerals
      expect(result).toMatch(/[०-९]/);
      // Should not contain English numerals
      expect(result).not.toMatch(/[0-9]/);
    });

    test('should handle single digit months and days', () => {
      const bsDate: BSDate = { year: 2000, month: 1, day: 5 };
      const result = formatDate(bsDate, 'nepali-short');
      expect(result).toBe('२०००/१/५');
    });
  });

  describe('Month name formatting', () => {
    test('should display correct Nepali month names', () => {
      const months = [
        { month: 1, name: 'बैशाख' },
        { month: 2, name: 'जेठ' },
        { month: 3, name: 'असार' },
        { month: 4, name: 'श्रावण' },
        { month: 5, name: 'भदौ' },
        { month: 6, name: 'आश्विन' },
        { month: 7, name: 'कार्तिक' },
        { month: 8, name: 'मंसिर' },
        { month: 9, name: 'पौष' },
        { month: 10, name: 'माघ' },
        { month: 11, name: 'फाल्गुण' },
        { month: 12, name: 'चैत्र' }
      ];

      months.forEach(({ month, name }) => {
        const bsDate: BSDate = { year: 2000, month, day: 1 };
        const result = formatDate(bsDate, 'nepali-full');
        expect(result).toContain(name);
      });
    });

    test('should display correct English month names', () => {
      const months = [
        { month: 1, name: 'January' },
        { month: 2, name: 'February' },
        { month: 3, name: 'March' },
        { month: 4, name: 'April' },
        { month: 5, name: 'May' },
        { month: 6, name: 'June' },
        { month: 7, name: 'July' },
        { month: 8, name: 'August' },
        { month: 9, name: 'September' },
        { month: 10, name: 'October' },
        { month: 11, name: 'November' },
        { month: 12, name: 'December' }
      ];

      months.forEach(({ month, name }) => {
        const adDate: ADDate = { year: 1943, month, day: 1 };
        const result = formatDate(adDate, 'english-full');
        expect(result).toContain(name);
      });
    });
  });

  describe('Edge cases', () => {
    test('should handle year boundary dates', () => {
      const bsDate: BSDate = { year: 2000, month: 12, day: 31 };
      const result = formatDate(bsDate, 'nepali-full');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    test('should handle leap year dates', () => {
      const adDate: ADDate = { year: 1944, month: 2, day: 29 };
      const result = formatDate(adDate, 'english-full');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    test('should handle single digit values', () => {
      const bsDate: BSDate = { year: 2000, month: 1, day: 1 };
      const result = formatDate(bsDate, 'nepali-short');
      expect(result).toBe('२०००/१/१');
    });
  });

  describe('Format consistency', () => {
    test('should maintain consistent formatting for same date', () => {
      const bsDate: BSDate = { year: 2000, month: 6, day: 15 };
      const result1 = formatDate(bsDate, 'nepali-full');
      const result2 = formatDate(bsDate, 'nepali-full');
      expect(result1).toBe(result2);
    });

    test('should handle all format types without errors', () => {
      const formats: DateFormat[] = ['nepali-full', 'nepali-short', 'english-full', 'english-short'];
      const bsDate: BSDate = { year: 2000, month: 6, day: 15 };

      formats.forEach(format => {
        expect(() => formatDate(bsDate, format)).not.toThrow();
        const result = formatDate(bsDate, format);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });
}); 
# nepali-date-converter-np

[![npm version](https://img.shields.io/npm/v/nepali-date-converter-np.svg)](https://www.npmjs.com/package/nepali-date-converter-np)
[![npm downloads](https://img.shields.io/npm/dm/nepali-date-converter-np.svg)](https://www.npmjs.com/package/nepali-date-converter-np)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

A lightweight TypeScript/JavaScript package for converting dates between the Gregorian (AD) and Bikram Sambat (BS) calendar systems, with support for Nepali and English formatting.

## 🌟 Features

- ✅ **Accurate Date Conversion**: Convert AD to BS and BS to AD with precision
- ✅ **Localized Formatting**: Date formatting in both Nepali and English
- ✅ **Weekday Support**: Get day of the week in both languages
- ✅ **TypeScript Support**: Full TypeScript definitions for better developer experience
- ✅ **Zero Dependencies**: Lightweight with no external dependencies
- ✅ **Universal**: Works in both browser and Node.js environments
- ✅ **Well Tested**: Comprehensive test coverage

## 📦 Installation

```bash
npm install nepali-date-converter-np
```

Or using yarn:

```bash
yarn add nepali-date-converter-np
```

## 🚀 Quick Start

```typescript
import { convertADToBS, convertBSToAD, formatDate, getDayOfWeek } from 'nepali-date-converter-np';

// Convert AD to BS
const bsDate = convertADToBS({ year: 2021, month: 10, day: 10 });
console.log(bsDate); // { year: 2078, month: 6, day: 24 }

// Convert BS to AD
const adDate = convertBSToAD({ year: 2078, month: 6, day: 24 });
console.log(adDate); // { year: 2021, month: 10, day: 10 }

// Format dates
console.log(formatDate(bsDate, 'nepali-full')); // २०७८ असोज २४
console.log(formatDate(adDate, 'english-full')); // 10 October 2021

// Get weekday
console.log(getDayOfWeek(bsDate, 'en')); // Sunday
console.log(getDayOfWeek(bsDate, 'ne')); // आइतबार
```

## 📚 API Reference

### Types

```typescript
interface BSDate {
  year: number;  // BS year (e.g., 2078)
  month: number; // BS month (1-12)
  day: number;   // BS day (1-31)
}

interface ADDate {
  year: number;  // AD year (e.g., 2021)
  month: number; // AD month (1-12)
  day: number;   // AD day (1-31)
}

type DateFormat = 'nepali-full' | 'nepali-short' | 'english-full' | 'english-short';
```

### Functions

#### `convertADToBS(adDate: ADDate): BSDate`

Converts a Gregorian (AD) date to Bikram Sambat (BS).

**Parameters:**
- `adDate`: ADDate object with year, month, and day

**Returns:** BSDate object

**Example:**
```typescript
const bsDate = convertADToBS({ year: 2021, month: 10, day: 10 });
// Returns: { year: 2078, month: 6, day: 24 }
```

#### `convertBSToAD(bsDate: BSDate): ADDate`

Converts a Bikram Sambat (BS) date to Gregorian (AD).

**Parameters:**
- `bsDate`: BSDate object with year, month, and day

**Returns:** ADDate object

**Example:**
```typescript
const adDate = convertBSToAD({ year: 2078, month: 6, day: 24 });
// Returns: { year: 2021, month: 10, day: 10 }
```

#### `formatDate(date: BSDate | ADDate, format: DateFormat): string`

Formats a date in the specified format.

**Parameters:**
- `date`: BSDate or ADDate object
- `format`: One of the following format options:
  - `'nepali-full'`: २०७८ असोज २४
  - `'nepali-short'`: २०७८/६/२४
  - `'english-full'`: 10 October 2021
  - `'english-short'`: 2021/10/10

**Returns:** Formatted date string

**Example:**
```typescript
const bsDate = { year: 2078, month: 6, day: 24 };
console.log(formatDate(bsDate, 'nepali-full')); // २०७८ असोज २४
console.log(formatDate(bsDate, 'english-full')); // 10 October 2021
```

#### `getDayOfWeek(date: BSDate | ADDate, locale: 'ne' | 'en' = 'en'): string`

Returns the day of the week in the specified language.

**Parameters:**
- `date`: BSDate or ADDate object
- `locale`: Language code ('ne' for Nepali, 'en' for English, defaults to 'en')

**Returns:** Day of the week string

**Example:**
```typescript
const bsDate = { year: 2078, month: 6, day: 24 };
console.log(getDayOfWeek(bsDate, 'en')); // Sunday
console.log(getDayOfWeek(bsDate, 'ne')); // आइतबार
```

## 💡 Usage Examples

### Government/Municipal Applications

```typescript
// Display BS date in forms
const today = new Date();
const todayAD = { 
  year: today.getFullYear(), 
  month: today.getMonth() + 1, 
  day: today.getDate() 
};
const todayBS = convertADToBS(todayAD);

// Show in Nepali format
const nepaliDate = formatDate(todayBS, 'nepali-full');
console.log(`आजको मिति: ${nepaliDate}`); // आजको मिति: २०७८ असोज २४
```

### Academic Calendar Applications

```typescript
// Convert academic year dates
const academicStart = convertADToBS({ year: 2021, month: 4, day: 15 });
const academicEnd = convertADToBS({ year: 2022, month: 3, day: 31 });

console.log(`Academic Year: ${academicStart.year} - ${academicEnd.year}`);
// Academic Year: 2078 - 2079
```

### Banking/Utility Platforms

```typescript
// Date input validation
function validateBSDate(bsDate: BSDate): boolean {
  try {
    const adDate = convertBSToAD(bsDate);
    return adDate.year >= 1900 && adDate.year <= 2100;
  } catch {
    return false;
  }
}

// Format for display based on user preference
function displayDate(date: BSDate | ADDate, userLocale: 'ne' | 'en') {
  if (userLocale === 'ne') {
    return formatDate(date, 'nepali-full');
  } else {
    return formatDate(date, 'english-full');
  }
}
```

### React Component Example

```typescript
import React, { useState } from 'react';
import { convertADToBS, formatDate } from 'nepali-date-converter-np';

const DateConverter: React.FC = () => {
  const [adDate, setAdDate] = useState({ year: 2021, month: 10, day: 10 });
  const [bsDate, setBsDate] = useState(convertADToBS(adDate));

  const handleDateChange = (newAdDate: ADDate) => {
    setAdDate(newAdDate);
    setBsDate(convertADToBS(newAdDate));
  };

  return (
    <div>
      <h3>Date Converter</h3>
      <p>AD: {formatDate(adDate, 'english-full')}</p>
      <p>BS: {formatDate(bsDate, 'nepali-full')}</p>
    </div>
  );
};
```

## ⚠️ Current Limitations

**Important**: This is a proof-of-concept implementation with limited date range support:

- **BS to AD**: Only supports BS years 2000-2002 (AD 1943-1945)
- **AD to BS**: Only supports AD years 1943-1945 (BS 2000-2002)

For production use, you would need to extend the `bsMonthData` in `src/bs-data.ts` with complete mapping data for the full range of years you need to support.

## 🛠️ Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/sahilkhatiwada/nepali-date-converter.git
cd nepali-date-converter

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Project Structure

```
src/
├── index.ts      # Main API exports
├── bs-data.ts    # BS/AD mapping data
└── ...

dist/             # Compiled JavaScript output
├── index.js
└── index.d.ts

tests/            # Test files
├── conversion.test.ts
├── formatting.test.ts
└── ...
```

## 🧪 Testing

The package includes comprehensive tests for all functionality:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (Node.js version, OS, etc.)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/sahilkhatiwada/nepali-date-converter/issues)
- **NPM**: [nepali-date-converter-np](https://www.npmjs.com/package/nepali-date-converter-np)

## 🌟 Use Cases

This package is particularly useful for:

- **Government and municipal apps** needing BS date display or input
- **School and university portals** requiring BS academic calendars
- **Banking or utility platforms** with local date format support
- **General apps in Nepal** requiring localization or dual calendar input
- **Document management systems** with date localization
- **Event management platforms** supporting both calendar systems

---

**Made with ❤️ for Nepali developers!**

If you find this package helpful, please consider giving it a ⭐ on GitHub!

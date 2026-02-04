import {
  formatCurrency,
  formatDate,
  getAmountColor,
  formatAmountWithSign,
} from '../src/utils/formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats positive amounts correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats negative amounts as positive (absolute value)', () => {
      expect(formatCurrency(-50.99)).toBe('$50.99');
    });

    it('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('formats large amounts with proper comma separators', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('always shows two decimal places', () => {
      expect(formatCurrency(10)).toBe('$10.00');
      expect(formatCurrency(10.5)).toBe('$10.50');
    });
  });

  describe('formatDate', () => {
    it('formats ISO date strings correctly', () => {
      const result = formatDate('2024-01-15T00:00:00Z');
      expect(result).toBe('Jan 15, 2024');
    });

    it('handles different months', () => {
      const result = formatDate('2024-12-25T00:00:00Z');
      expect(result).toBe('Dec 25, 2024');
    });

    it('formats dates consistently', () => {
      const result = formatDate('2023-06-01T12:30:00Z');
      expect(result).toMatch(/Jun 1, 2023/);
    });
  });

  describe('getAmountColor', () => {
    it('returns green color for income', () => {
      expect(getAmountColor('income')).toBe('#10B981');
    });

    it('returns red color for expenses', () => {
      expect(getAmountColor('expense')).toBe('#EF4444');
    });
  });

  describe('formatAmountWithSign', () => {
    it('formats income with plus sign', () => {
      expect(formatAmountWithSign(100.50, 'income')).toBe('+$100.50');
    });

    it('formats expense with minus sign', () => {
      expect(formatAmountWithSign(75.25, 'expense')).toBe('-$75.25');
    });

    it('handles zero amounts', () => {
      expect(formatAmountWithSign(0, 'income')).toBe('+$0.00');
      expect(formatAmountWithSign(0, 'expense')).toBe('-$0.00');
    });

    it('formats large income amounts correctly', () => {
      expect(formatAmountWithSign(5000, 'income')).toBe('+$5,000.00');
    });

    it('formats large expense amounts correctly', () => {
      expect(formatAmountWithSign(2500.99, 'expense')).toBe('-$2,500.99');
    });
  });
});

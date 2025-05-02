import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { expect } from '@jest/globals';

// Mock fetch globally
global.fetch = jest.fn();

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} alt={alt} {...props} unoptimized="true" />;
  },
}));

// Add TextEncoder and TextDecoder to global scope
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Extend expect matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null;
    return {
      pass,
      message: () => `expected ${received} to be in the document`,
    };
  },
  toHaveAttribute(received, attr, value) {
    const pass = received.hasAttribute(attr) && (!value || received.getAttribute(attr) === value);
    return {
      pass,
      message: () => `expected ${received} to have attribute ${attr}${value ? ` with value ${value}` : ''}`,
    };
  },
  toHaveTextContent(received, text) {
    const pass = received.textContent === text;
    return {
      pass,
      message: () => `expected ${received} to have text content ${text}`,
    };
  },
  toHaveLength(received, length) {
    const pass = received.length === length;
    return {
      pass,
      message: () => `expected ${received} to have length ${length}`,
    };
  },
}); 
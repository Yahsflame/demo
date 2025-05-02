import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string): R;
      toHaveLength(length: number): R;
    }
  }
}

declare module '@testing-library/jest-dom' {
  export interface Matchers<R = void> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveTextContent(text: string): R;
    toHaveLength(length: number): R;
  }
}

export {}; 
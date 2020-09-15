module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!config/**',
    '!coverage/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '@entity/(.*)': '<rootDir>/src/entity/$1',
    '@controller/(.*)': '<rootDir>/src/controller/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@exceptions/(.*)': '<rootDir>/src/exceptions/$1',
  },
}

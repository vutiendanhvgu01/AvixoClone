const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    'pages/(.*)$': '<rootDir>/pages/$1',
    'common/(.*)$': '<rootDir>/common/$1',
    'modules/(.*)$': '<rootDir>/modules/$1',
    '^uuid$': 'uuid',
  },
  testEnvironment: 'jest-environment-jsdom',
};
module.exports = createJestConfig(customJestConfig);

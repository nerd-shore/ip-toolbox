/**
 * @type {import("@jest/types/build/Config").ProjectConfig}
 */
const config = {
  transform: { '^.+\\.ts': 'ts-jest' },
  silent: false,
  verbose: true,
  maxWorkers: 1,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
};

module.exports = config;

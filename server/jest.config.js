/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.ts"], // tell jest where to find the tests
  verbose: true, // report during the test run
  forceExit: true // force exit after finish all tests. It is useful to clear the running resources
  // clearMocks: true
};
export default {
  // Which files to test
  testMatch: ['**/**/*.test.ts'],

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Always exits even if there is pending handlers
  forceExit: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // Folders to ignore
  modulePathIgnorePatterns: ['./dist'],

  testEnvironment: 'node',
};

module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  testMatch: [
    '**/test/**/*.spec.ts'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary', 'html']
}
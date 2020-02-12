module.exports = {
    rootDir: __dirname,
    verbose: false,
    silent: false,
    browser: false,
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: ['<rootDir>/src/**/*', '!<rootDir>/**/*.d.ts'],
    coverageDirectory: '<rootDir>/coverage',
    modulePaths: ['<rootDir>/src/'],
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'ts-jest'
    },
    testPathIgnorePatterns: [],
    resetMocks: false
}

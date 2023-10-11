export = {
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transformIgnorePatterns: [
        "/node_modules/(?!@babel/runtime/helpers/esm/)",
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/index.ts",
        "!src/app.ts",
        "!src/database/migrations/**",
        "!src/database/seeders/**",
        "!src/database/models/**",
        "!src/routes/**",
        "!src/middlewares/**",
        "!src/services/**",
        "!src/controllers/**",
    ],
    coverageDirectory: "coverage",
};
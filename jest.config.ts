module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest', // or other ESM presets
  setupFilesAfterEnv: ['jest-extended'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: true,
    },
  },
};

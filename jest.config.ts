module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest', // or other ESM presets
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: true,
    },
  },
};

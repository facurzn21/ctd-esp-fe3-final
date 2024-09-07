const nextJest = require('next/jest');

process.env.TZ = 'UTC';

const createJestConfig = nextJest({
    dir: './', // Provee la ruta a tu aplicación Next.js para cargar next.config.js y archivos .env en tu entorno de prueba
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^dh-marvel/components/(.*)$': '<rootDir>/components/$1',
        '^dh-marvel/features/(.*)$': '<rootDir>/features/$1',
        '^dh-marvel/services/(.*)$': '<rootDir>/services/$1',
        '^dh-marvel/pages/(.*)$': '<rootDir>/pages/$1',
        '^dh-marvel/test/(.*)$': '<rootDir>/test/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'components/**/*.ts',
        'components/**/*.tsx',
        '!components/**/*.stories.tsx', // Excluye archivos stories
        'features/**/*.ts',
        'features/**/*.tsx',
        'pages/**/*.route.ts',
        'pages/**/*.page.tsx',
        'services/**/*.ts',
        '!pages/_app.page.tsx', // Exclusiones específicas
        '!pages/_document.page.tsx',
        '!**/*.test.tsx', // Evita recolectar cobertura de archivos de pruebas
        '!**/*.spec.tsx',
    ],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50,
        },
        './services/checkout': {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    testTimeout: 30000, // Incrementa el timeout a 30 segundos
};

// Exporta createJestConfig de esta manera para asegurar que next/jest pueda cargar la configuración de Next.js que es asíncrona
module.exports = createJestConfig(customJestConfig);
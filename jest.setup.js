import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';
import { server } from './test/server.ts';

process.env.MARVEL_API_URL = 'https://gateway.marvel.com/v1/public';
process.env.MARVEL_API_PRIVATE_KEY = 'PRIVATE_KEY';
process.env.MARVEL_API_PUBLIC_KEY = 'PUBLIC_KEY';

// Configura el servidor de pruebas
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
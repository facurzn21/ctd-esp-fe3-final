import 'whatwg-fetch'
import '@testing-library/jest-dom/extend-expect'
import {server} from './test/server.ts'

process.env.MARVEL_API_URL = 'https://gateway.marvel.com/v1/public/comics?ts=1725664435355&apikey=3264e96d88a07f6ebbbab7c563acdf81&hash=026c340ddfbe003fc0399d9cf3db66c7&limit=12'
process.env.MARVEL_API_PRIVATE_KEY = 'PRIVATE_KEY'
process.env.MARVEL_API_PUBLIC_KEY = 'PUBLIC_KEY'

beforeAll(() => server.listen())
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
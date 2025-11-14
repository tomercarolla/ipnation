import '@testing-library/jest-dom';
import { server } from "./testing/msw/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
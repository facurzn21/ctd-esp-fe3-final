import handler from "../../../pages/api/characters/[id]/comics/index.route";
import { getComicsByCharacterId } from "../../../services/marvel/marvel.service";
import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_BAD_PARAMETERS_REQUESTS,
  ERROR_BAD_REQUEST,
  ERROR_SERVER,
} from "../../../services/comic/comic.errors";
import { createMocks } from "node-mocks-http";

// Mock de la función getComicsByCharacterId
jest.mock("../../../services/marvel/marvel.service");

describe("/api/characters/[id]/comics API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return comics for a character with status 200", async () => {
    const mockComicsResponse = {
      code: 200,
      data: {
        results: [
          { id: 1, title: "Comic 1" },
          { id: 2, title: "Comic 2" },
        ],
      },
    };

    (getComicsByCharacterId as jest.Mock).mockResolvedValueOnce(
      mockComicsResponse
    );

    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "100", // ID de personaje
        limit: "10",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockComicsResponse);
  });

  it("should return 401 if invalid credentials", async () => {
    const mockInvalidCredentialsResponse = {
      code: "InvalidCredentials",
    };

    (getComicsByCharacterId as jest.Mock).mockResolvedValueOnce(
      mockInvalidCredentialsResponse
    );

    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "100",
        limit: "10",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual(ERROR_INVALID_CREDENTIALS);
  });

  it("should return 409 if there are bad parameters", async () => {
    const mockBadParametersResponse = {
      code: 409,
    };

    (getComicsByCharacterId as jest.Mock).mockResolvedValueOnce(
      mockBadParametersResponse
    );

    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "invalid",
        limit: "10",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(409);
    expect(JSON.parse(res._getData())).toEqual(ERROR_BAD_PARAMETERS_REQUESTS);
  });

  it("should return 400 for bad request", async () => {
    const mockBadRequestResponse = {
      code: 400,
    };

    (getComicsByCharacterId as jest.Mock).mockResolvedValueOnce(
      mockBadRequestResponse
    );

    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "100",
        limit: "10",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(ERROR_BAD_REQUEST);
  });

  it("should return 500 if the service throws an error", async () => {
    (getComicsByCharacterId as jest.Mock).mockRejectedValueOnce(
      new Error("Server error")
    );

    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "100",
        limit: "10",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(ERROR_SERVER);
  });
});
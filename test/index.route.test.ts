import handler from "../pages/api/comics/[id]/index.route";
import { getComic } from "../services/marvel/marvel.service";
import { ERROR_SERVER } from "../services/comic/comic.errors";
import { createMocks } from "node-mocks-http";

// Mock de la función getComic
jest.mock("../services/marvel/marvel.service");

describe("/api/comics/[id] API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a comic when the id is valid", async () => {
    // Mockear un cómic que será devuelto por getComic
    const mockComic = {
      id: 1,
      title: "Test Comic",
      description: "This is a test comic.",
    };

    (getComic as jest.Mock).mockResolvedValueOnce(mockComic);

    // Crear mock para request y response
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "1",
      },
    });

    // Llamada a la ruta API
    await handler(req, res);

    // Verificar que la respuesta sea correcta
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockComic);
  });

  it("should return a 500 error if getComic throws an error", async () => {
    // Simular que getComic lanza un error
    (getComic as jest.Mock).mockRejectedValueOnce(new Error("Server error"));

    // Crear mock para request y response
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "999", // ID no existente o inválido
      },
    });

    // Llamada a la ruta API
    await handler(req, res);

    // Verificar que se devuelva el error 500
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(ERROR_SERVER);
  });
});

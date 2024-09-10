// comic.service.test.ts
import {
  getComicsByPage,
  getComicsById,
  getComicsByCharacterId,
} from "../services/comic/comic.service";

// Mocking fetch globally
global.fetch = jest.fn();

describe("Comic Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada test
  });

  it("should fetch comics by page with offset and limit", async () => {
    // Aquí usamos mockResolvedValueOnce para simular una respuesta exitosa de fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: "mocked data" }), // Mock de la función json()
    });

    const qtyOfCards = 10;
    const pageNumber = 1;
    const result = await getComicsByPage(qtyOfCards, pageNumber);

    expect(fetch).toHaveBeenCalledWith("/api/comics?offset=0&limit=10");
    expect(result).toEqual({ data: "mocked data" });
  });

  it("should handle a failed fetch request", async () => {
    // Simulación de un fetch que devuelve un error
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Server error" }), // Mock de la respuesta de error
    });

    try {
      await getComicsByPage(10, 1);
    } catch (error) {
      expect(error).toEqual(new Error("Server error"));
    }
  });
});

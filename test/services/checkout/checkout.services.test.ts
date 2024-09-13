import { postCheckout } from "../../../services/checkout/checkout.service";
import { ICheckout } from "types/ICheckout.type";

// Mock de fetch
global.fetch = jest.fn();

const mockCheckoutData: ICheckout = {
  customer: {
    name: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    address: {
      address1: "123 Marvel St",
      address2: "",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
  },
  card: {
    number: "4111111111111111",
    cvc: "123",
    expDate: "12/23",
    nameOnCard: "John Doe",
  },
  order: {
    name: "Marvel Comic #1",
    image: "http://image.com/marvel-comic.jpg",
    price: 100,
  },
};

describe("postCheckout", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada test
  });

  it("should post checkout data successfully and return the response", async () => {
    // Simulamos una respuesta exitosa de fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const response = await postCheckout(mockCheckoutData);

    expect(fetch).toHaveBeenCalledWith("/api/checkout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(mockCheckoutData),
    });

    // Verificar que la respuesta sea la esperada
    expect(response).toEqual({ success: true });
  });

  it("should throw an error when the post request fails", async () => {
    // Simulamos una respuesta fallida de fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Error processing checkout" }),
    });

    try {
      await postCheckout(mockCheckoutData);
    } catch (error) {
      expect(error).toEqual({ error: "Error processing checkout" });
    }

    expect(fetch).toHaveBeenCalledWith("/api/checkout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(mockCheckoutData),
    });
  });
});

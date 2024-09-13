import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SuccessCheckout from "../../../pages/success/index.page";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter } from "next/router";
import { ICheckout } from "types/ICheckout.type";

// Mock de next/router para simular la navegación
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const createMockRouter = (router: Partial<NextRouter>): NextRouter => ({
  basePath: "",
  pathname: "/success",
  route: "/success",
  query: {},
  asPath: "/success",
  back: jest.fn(),
  beforePopState: jest.fn(),
  prefetch: jest.fn(),
  push: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: "en",
  domainLocales: [],
  isPreview: false,
  ...router,
});

describe("SuccessCheckout Page", () => {
  let router: NextRouter;

  beforeEach(() => {
    router = createMockRouter({});
    (jest.requireMock("next/router").useRouter as jest.Mock).mockReturnValue(
      router
    );
    jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(
      JSON.stringify({
        customer: { name: "John", lastname: "Doe" },
        order: { name: "Marvel Comic", price: 100 },
      } as ICheckout)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render the checkout data when it is available in localStorage", async () => {
    render(<SuccessCheckout />);

    // Verificamos que los datos del checkout aparezcan en la pantalla
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Marvel Comic")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });
  });

  it("should redirect to home if no checkout data is found", async () => {
    // Simular que no hay datos en el localStorage
    jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(null);

    render(<SuccessCheckout />);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/");
    });
  });

  it("should show the loader while data is loading", () => {
    // Eliminar cualquier mock anterior para este test
    jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(null);

    render(<SuccessCheckout />);

    // Esperar que el componente Loader esté presente
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});

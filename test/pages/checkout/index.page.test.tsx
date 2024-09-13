import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkout from "../../../pages/checkout/index.page";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter } from "next/router";
import { getComicsById } from "dh-marvel/services/comic/comic.service";
import { IComic } from "types/IComic.type";

// Mock de la función getComicsById
jest.mock("dh-marvel/services/comic/comic.service");

const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
  return {
    basePath: "",
    pathname: "/checkout",
    route: "/checkout?comic=82967",
    query: { comic: "82967" },
    asPath: "/checkout?comic=82967",
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
  };
};

// Simulamos un objeto de cómic completo basado en IComic
const mockComicData: IComic = {
  id: 82967,
  digitalId: 0,
  title: "Marvel Previews (2017)",
  issueNumber: 0,
  variantDescription: "",
  description: "Marvel Previews (2017) description",
  modified: "2021-01-01T00:00:00Z",
  isbn: "1234567890",
  upc: "75960608839302811",
  diamondCode: "",
  ean: "",
  issn: "",
  format: "Comic",
  pageCount: 112,
  textObjects: [],
  resourceURI: "http://gateway.marvel.com/v1/public/comics/82967",
  urls: [],
  series: {
    resourceURI: "http://gateway.marvel.com/v1/public/series/23665",
    name: "Marvel Previews (2017 - Present)",
  },
  variants: [],
  collections: [],
  collectedIssues: [],
  dates: [
    {
      type: "onsaleDate",
      date: "2021-12-01T00:00:00Z",
    },
  ],
  prices: [{ type: "printPrice", price: 0 }],
  price: 48,
  oldPrice: 87,
  stock: 2,
  thumbnail: {
    path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
    extension: "jpg",
  },
  images: [],
  creators: {
    available: 1,
    collectionURI: "http://gateway.marvel.com/v1/public/comics/82967/creators",
    items: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/creators/10021",
        name: "John Doe",
        role: "writer",
      },
    ],
    returned: 1,
  },
  characters: {
    available: 0,
    collectionURI:
      "http://gateway.marvel.com/v1/public/comics/82967/characters",
    items: [],
    returned: 0,
  },
  stories: {
    available: 2,
    collectionURI: "http://gateway.marvel.com/v1/public/comics/82967/stories",
    items: [
      {
        resourceURI: "http://gateway.marvel.com/v1/public/stories/183698",
        name: "cover from Marvel Previews (2017)",
        type: "cover",
      },
      {
        resourceURI: "http://gateway.marvel.com/v1/public/stories/183699",
        name: "story from Marvel Previews (2017)",
        type: "interiorStory",
      },
    ],
    returned: 2,
  },
  events: {
    available: 0,
    collectionURI: "http://gateway.marvel.com/v1/public/comics/82967/events",
    items: [],
    returned: 0,
  },
};

let router = createMockRouter({});

describe("Checkout Page", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada test
  });

  it("should render the loading state if the comic data is not yet loaded", () => {
    router = createMockRouter({ query: {} }); // No pasamos el ID del comic
    render(
      <RouterContext.Provider value={router}>
        <Checkout />
      </RouterContext.Provider>
    );
    // Esperamos que el Loader esté en el documento
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should render the comic data correctly once it's loaded", async () => {
    // Simular la respuesta de getComicsById con el objeto mockComicData
    (getComicsById as jest.Mock).mockResolvedValueOnce(mockComicData);

    render(
      <RouterContext.Provider value={router}>
        <Checkout />
      </RouterContext.Provider>
    );

    // Esperamos que el título del cómic aparezca una vez que los datos sean cargados
    await waitFor(() => {
      expect(screen.getByText("Marvel Previews (2017)")).toBeInTheDocument();
    });
  });

  it("should handle when the comic ID is not provided in the query", () => {
    router = createMockRouter({ query: { comic: undefined } });
    render(
      <RouterContext.Provider value={router}>
        <Checkout />
      </RouterContext.Provider>
    );

    // Verificamos que si no hay comic ID, el Loader esté presente
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});

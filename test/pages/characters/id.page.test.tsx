import { render, screen, waitFor } from "@testing-library/react";
import Character, {
  getStaticProps,
  getStaticPaths,
} from "../../../pages/characters/[id].page";
import {
  getCharacter,
  getCharacters,
} from "../../../services/marvel/marvel.service";
import { getComicsByCharacterId } from "../../../services/comic/comic.service";
import { useRouter } from "next/router";
import { Loader } from "../../../components/loading/loading.component";
import { GetStaticPropsContext, GetStaticPathsContext } from "next";
import { ParsedUrlQuery } from "querystring";

// Mock de las funciones
jest.mock("../../../services/marvel/marvel.service");
jest.mock("../../../services/comic/comic.service");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Character Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      isFallback: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render character details correctly", async () => {
    const mockCharacter = {
      id: 1,
      name: "Spider-Man",
      description: "A superhero character",
      thumbnail: {
        path: "http://example.com/spiderman",
        extension: "jpg",
      },
    };

    (getCharacter as jest.Mock).mockResolvedValueOnce(mockCharacter);

    const context: GetStaticPropsContext = {
      params: { id: "1" } as ParsedUrlQuery,
    };

    const result = await getStaticProps(context);

    if ("props" in result) {
      const { character } = result.props;

      render(<Character character={character} />);

      expect(screen.getByText("Spider-Man")).toBeInTheDocument();
      expect(screen.getByText("A superhero character")).toBeInTheDocument();
      expect(screen.getByAltText("Spider-Man")).toHaveAttribute(
        "src",
        "http://example.com/spiderman.jpg"
      );
    }
  });

  it("should show fallback loader when the page is in fallback mode", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      isFallback: true,
    });

    render(<Loader />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should render comics related to the character", async () => {
    const mockComics = {
      code: 200,
      data: {
        results: [
          { id: 1, title: "Comic 1" },
          { id: 2, title: "Comic 2" },
        ],
      },
    };

    (getComicsByCharacterId as jest.Mock).mockResolvedValueOnce(mockComics);

    const mockCharacter = {
      id: 1,
      name: "Spider-Man",
      description: "A superhero character",
      thumbnail: {
        path: "http://example.com/spiderman",
        extension: "jpg",
      },
    };

    const context: GetStaticPropsContext = {
      params: { id: "1" } as ParsedUrlQuery,
    };

    const result = await getStaticProps(context);

    if ("props" in result) {
      const { character } = result.props;

      render(<Character character={character} />);

      await waitFor(() => {
        expect(screen.getByText("Comic 1")).toBeInTheDocument();
        expect(screen.getByText("Comic 2")).toBeInTheDocument();
      });
    }
  });
});

describe("getStaticProps and getStaticPaths", () => {
  it("should return correct paths and fallback for getStaticPaths", async () => {
    const mockCharactersResponse = {
      data: {
        results: [{ id: 1 }, { id: 2 }],
      },
    };

    (getCharacters as jest.Mock).mockResolvedValueOnce(mockCharactersResponse);

    // Pasamos un context vacío como argumento a getStaticPaths
    const pathsResult = await getStaticPaths({} as GetStaticPathsContext);

    expect(pathsResult.paths).toEqual([
      { params: { id: "1" } },
      { params: { id: "2" } },
    ]);
    expect(pathsResult.fallback).toBe(true);
  });

  it("should fetch character data for getStaticProps", async () => {
    const mockCharacter = {
      id: 1,
      name: "Spider-Man",
    };

    (getCharacter as jest.Mock).mockResolvedValueOnce(mockCharacter);

    const context: GetStaticPropsContext = {
      params: { id: "1" } as ParsedUrlQuery,
    };

    const result = await getStaticProps(context);

    if ("props" in result) {
      const { character } = result.props;
      expect(character).toEqual(mockCharacter);
    }
  });
});
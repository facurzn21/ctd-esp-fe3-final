import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ComicDetail from "../../../components/detail/ComicDetail";

const mockComic = {
  id: 1,
  title: "Amazing Spider-Man",
  description: "A great comic about Spider-Man",
  thumbnail: {
    path: "http://example.com/spiderman",
    extension: "jpg",
  },
  price: 15,
  oldPrice: 20,
  stock: 5,
  characters: [
    { id: 101, name: "Spider-Man" },
    { id: 102, name: "Green Goblin" },
  ],
};

describe("ComicDetail Component", () => {
  it("should display comic details correctly", () => {
    render(<ComicDetail comic={mockComic} />);

    // Verificar que el título, descripción y precio se muestran correctamente
    expect(screen.getByText("Amazing Spider-Man")).toBeInTheDocument();
    expect(
      screen.getByText("A great comic about Spider-Man")
    ).toBeInTheDocument();
    expect(screen.getByText("Price: $15")).toBeInTheDocument();
    expect(screen.getByText("Old Price: $20")).toBeInTheDocument();
  });

  it("should display the 'Buy Now' button when the comic is in stock", () => {
    render(<ComicDetail comic={mockComic} />);

    const buyNowButton = screen.getByRole("button", { name: /buy now/i });
    expect(buyNowButton).toBeInTheDocument();
    expect(buyNowButton).toBeEnabled();
  });

  it("should disable the 'Buy Now' button when the comic is out of stock", () => {
    const outOfStockComic = { ...mockComic, stock: 0 };
    render(<ComicDetail comic={outOfStockComic} />);

    const outOfStockButton = screen.getByRole("button", {
      name: /out of stock/i,
    });
    expect(outOfStockButton).toBeInTheDocument();
    expect(outOfStockButton).toBeDisabled();
  });

  it("should display the list of characters correctly", () => {
    render(<ComicDetail comic={mockComic} />);

    // Verificar que los personajes se muestran correctamente
    expect(screen.getByText("Characters:")).toBeInTheDocument();
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("Green Goblin")).toBeInTheDocument();
  });

  it("should display 'In Stock' when stock is greater than 0", () => {
    render(<ComicDetail comic={mockComic} />);

    expect(screen.getByText("Stock: In Stock")).toBeInTheDocument();
  });

  it("should display 'Out of Stock' when stock is 0", () => {
    const outOfStockComic = { ...mockComic, stock: 0 };
    render(<ComicDetail comic={outOfStockComic} />);

    expect(screen.getByText("Stock: Out of Stock")).toBeInTheDocument();
  });
});

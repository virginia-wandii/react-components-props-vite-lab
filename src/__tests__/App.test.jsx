
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../components/App";
import Header from "../components/Header";
import About from "../components/About";
import ArticleList from "../components/ArticleList";

describe("Blog Components", () => {
  test("Header displays the blog name passed through props", () => {
    render(<Header name="Underreacted" />);

    expect(
      screen.getByRole("heading", { name: "Underreacted" }),
    ).toBeInTheDocument();
  });

  test("About displays the description and logo", () => {
    render(<About image="logo.png" about="A blog about learning React" />);

    expect(screen.getByText("A blog about learning React")).toBeInTheDocument();

    expect(screen.getByAltText("blog logo")).toBeInTheDocument();
  });

  test("ArticleList displays all articles", () => {
    const posts = [
      {
        id: 1,
        title: "Components 101",
        date: "December 15, 2020",
        preview: "Setting up the building blocks of your site",
      },
      {
        id: 2,
        title: "React Data Flow",
        date: "December 11, 2020",
        preview: "Passing props is never passé",
      },
    ];

    render(<ArticleList posts={posts} />);

    expect(screen.getByText("Components 101")).toBeInTheDocument();

    expect(screen.getByText("React Data Flow")).toBeInTheDocument();

    expect(
      screen.getByText("Passing props is never passé"),
    ).toBeInTheDocument();
  });

  test("Header dynamically updates when props change", () => {
    const { rerender } = render(<Header name="My First Blog" />);

    expect(
      screen.getByRole("heading", { name: "My First Blog" }),
    ).toBeInTheDocument();

    rerender(<Header name="My React Blog" />);

    expect(
      screen.getByRole("heading", { name: "My React Blog" }),
    ).toBeInTheDocument();
  });
  test("renders the correct child components", () => {
    const { container } = render(<App />);
    expect(container.querySelector(".App")).toBeInTheDocument();
    expect(container.querySelector(".App header")).toBeInTheDocument();
    expect(container.querySelector(".App aside")).toBeInTheDocument();
    expect(container.querySelector(".App main")).toBeInTheDocument();
  });
});

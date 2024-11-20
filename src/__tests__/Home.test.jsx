import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useTranslation } from "react-i18next";
import Home from "../components/Home/Home";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: function (key) {
      const translations = {
        home_title: "home_title",
        home_title2: "home_title2",
        home_title3: "home_title3",
        home_description: "home_description",
        home_get_started: "home_get_started",
      };
      return translations[key];
    },
  }),
}));

describe("Home Component", () => {
  it("renders the component with correct text", () => {
    render(<Home />);

    const homeTitleElements = screen.getAllByText(/home_title/i);
    expect(homeTitleElements).toHaveLength(2); 

    expect(screen.getByText(/home_title2/i)).toBeInTheDocument();
    expect(screen.getByText(/home_title3/i)).toBeInTheDocument();
    expect(screen.getByText(/home_description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /home_get_started/i })
    ).toBeInTheDocument();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import MainNav from "../../components/MainNav";
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";
// Mock the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("MainNav Component", () => {
  test("Render MainNav", () => {
    // Create a mock router object with a push method
    const mockRouter = {
      push: jest.fn(),
    };

    // Mock the useRouter hook to return the mock router object
    useRouter.mockReturnValue(mockRouter);

    // Render the MainNav component
    render(<MainNav />);

    // Now, you can test the behavior when the component is clicked
    // For example, if there is a logout button in MainNav component, you can simulate the click event and check the count after the click.
  });

  // Check the behavior of the login button
  test("Login button click", async () => {
    // Create a mock router object with a push method
    const mockRouter = {
      push: jest.fn(),
    };

    // Mock the useRouter hook to return the mock router object
    useRouter.mockReturnValue(mockRouter);

    // Render the MainNav component
    const { container } = render(<MainNav />);

    // Simulate the click event
    const user = userEvent.setup();
    const loginButton = container.querySelector("#login");
    await user.click(loginButton);
    // Check the count of the push method
    expect(loginButton.innerHTML).toContain("Login");
  });

  // Check the behavior of the home button
  test("Home button click", async () => {
    // Create a mock router object with a push method
    const mockRouter = {
      push: jest.fn(),
    };

    // Mock the useRouter hook to return the mock router object
    useRouter.mockReturnValue(mockRouter);

    // Render the MainNav component
    const { container } = render(<MainNav />);

    // Simulate the click event
    const user = userEvent.setup();
    const homeButton = container.querySelector("#home");
    await user.click(homeButton);
    // Check the count of the push method
    expect(homeButton.innerHTML).toContain("Home");
  });

  // Check that NavBar contains the text "Internal Dispatch System"
  test("NavBar contains the text 'Internal Dispatch System'", async () => {
    // Create a mock router object with a push method
    const mockRouter = {
      push: jest.fn(),
    };

    // Mock the useRouter hook to return the mock router object
    useRouter.mockReturnValue(mockRouter);

    // Render the MainNav component
    const { container } = render(<MainNav />);

    // Simulate the click event
    const navBar = container.querySelector("#navbar");
    // Check the count of the push method
    expect(navBar.innerHTML).toContain("Internal Dispatch System");
  });
});

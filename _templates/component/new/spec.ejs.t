---
to: modules/<%= module %>/components/<%= h.changeCase.pascal(name) %>/spec.tsx
---
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import <%= h.changeCase.pascal(name) %> from "@psi/<%= module %>/components/<%= h.changeCase.pascal(name) %>";

test("should render", () => {
  render(<<%= h.changeCase.pascal(name) %> maximum={3} />);

  const firstText = screen.getByText("Hello, I am the <%= h.changeCase.pascal(name) %> component.");
  const secondText = screen.getByText("You clicked me 0 times.");
  const thirdText = screen.getByText("I will reset when you click me 3 times.");

  expect(firstText).toBeInTheDocument();
  expect(secondText).toBeInTheDocument();
  expect(thirdText).toBeInTheDocument();
});

test("should change count on click", () => {
  render(<<%= h.changeCase.pascal(name) %> maximum={3} />);

  const text = screen.getByText("You clicked me 0 times.");

  fireEvent.click(text);
  fireEvent.click(text);

  expect(text).toHaveTextContent("You clicked me 2 times.");
});

test("should reset count 1000ms after it reaches maximum", async () => {
  render(<<%= h.changeCase.pascal(name) %> maximum={3} />);

  const text = screen.getByText("You clicked me 0 times.");

  fireEvent.click(text);
  fireEvent.click(text);
  fireEvent.click(text);

  expect(text).toHaveTextContent("You clicked me 3 times.");

  await waitFor(() =>
    expect(text).toHaveTextContent("You clicked me 0 times."),
  );
});

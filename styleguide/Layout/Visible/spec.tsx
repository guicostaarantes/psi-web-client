import Visible from "styleguide/Layout/Visible";
import { render } from "@testing-library/react";

test("testing visible", () => {
  render(
    <Visible xs sm>
      testing visible
    </Visible>
  );

  // TODO: tests
  expect(1 + 1).toBe(2);
});

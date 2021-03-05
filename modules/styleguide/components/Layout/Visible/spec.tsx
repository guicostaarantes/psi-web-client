import Visible from "@psi/styleguide/components/Layout/Visible";
import { render } from "@testing-library/react";

test("Visible renders", () => {
  render(
    <Visible xs sm>
      testing visible
    </Visible>,
  );

  // TODO: tests
  expect(1 + 1).toBe(2);
});

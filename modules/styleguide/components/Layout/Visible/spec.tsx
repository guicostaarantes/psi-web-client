import { render } from "@testing-library/react";

import Visible from "@psi/styleguide/components/Layout/Visible";

test("Visible renders", () => {
  render(
    <Visible xs sm>
      testing visible
    </Visible>,
  );

  // TODO: tests
  expect(1 + 1).toBe(2);
});

import { createState } from "@hookstate/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Term from "@psi/profiles/components/Term";

test("should render with two lines and change state when clicked", async () => {
  const message = `Termo de uso referente ao preço\nTermo com duas linhas`;

  const agreement = createState<boolean>(false);

  render(<Term agreement={agreement} name="price" message={message} />);

  const firstParagraph = screen.getByText("Termo de uso referente ao preço");
  const secondParagraph = screen.getByText("Termo com duas linhas");
  const checkbox = screen.getByText("Li e estou de acordo");

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
  fireEvent.click(checkbox);
  await waitFor(() => {
    expect(agreement.value).toEqual(true);
  });
  fireEvent.click(checkbox);
  await waitFor(() => {
    expect(agreement.value).toEqual(false);
  });
});

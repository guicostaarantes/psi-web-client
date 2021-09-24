import { render, screen } from "@testing-library/react";
import { createRef } from "react";

import AvatarInput from "@psi/styleguide/components/AvatarInput";

test("AvatarInput renders", () => {
  const ref = createRef<HTMLInputElement>();

  render(
    <AvatarInput
      currentAvatar={<div>current avatar</div>}
      name="test"
      label="testing avatar input"
      reference={ref}
    />,
  );
  const avatarInput = screen.getByLabelText(
    "testing avatar input",
  ) as HTMLInputElement;

  expect(avatarInput).toBeInTheDocument();
});

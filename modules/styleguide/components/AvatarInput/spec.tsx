import { render, screen } from "@testing-library/react";

import AvatarInput from "@psi/styleguide/components/AvatarInput";

test("AvatarInput renders", () => {
  render(
    <AvatarInput
      currentAvatar={<div>current avatar</div>}
      name="test"
      label="testing avatar input"
    />,
  );
  const avatarInput = screen.getByLabelText(
    "testing avatar input",
  ) as HTMLInputElement;

  expect(avatarInput).toBeInTheDocument();
});

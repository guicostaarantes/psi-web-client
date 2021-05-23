import { useState } from "@hookstate/core";
import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "@psi/styleguide/components/Modal";

const TestComponent = () => {
  const open = useState(false);

  return (
    <div id="__next">
      <div>
        <div>
          <Modal open={open.value} onClose={() => open.set(false)}>
            Testing modal
          </Modal>
        </div>
      </div>
      <div>
        <button onClick={() => open.set(true)}>Open modal</button>
      </div>
    </div>
  );
};

test("should open modal", () => {
  render(<TestComponent />);

  const openBtn = screen.getByText("Open modal");
  const modalContent = screen.queryByText("Testing modal");
  expect(modalContent).toBeFalsy();

  fireEvent.click(openBtn);

  const modalContent2 = screen.queryByText("Testing modal");
  expect(modalContent2).toBeTruthy();
});

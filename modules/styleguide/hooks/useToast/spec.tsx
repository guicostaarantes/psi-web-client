import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import useToast from "@psi/styleguide/hooks/useToast";

jest.useFakeTimers();

const ToastTestComponent = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div>
      {toasts.map((toast) => (
        <div key={toast.id}>
          <span>{toast.header}</span>
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)}>
            removeToast{toast.header}
          </button>
        </div>
      ))}
    </div>
  );
};

const CreatorTestComponent = () => {
  const { addToast } = useToast();

  return (
    <div>
      <button onClick={() => addToast({ header: "1", message: "Message 1" })}>
        addToast1
      </button>
      <button onClick={() => addToast({ header: "2", message: "Message 2" })}>
        addToast2
      </button>
      <button onClick={() => addToast({ header: "3", message: "Message 3" })}>
        addToast3
      </button>
    </div>
  );
};

test("add and remove toasts between unrelated components", async () => {
  render(
    <>
      <ToastTestComponent />
      <CreatorTestComponent />
    </>,
  );

  const btn1 = screen.getByText("addToast1");
  screen.getByText("addToast2");
  const btn3 = screen.getByText("addToast3");
  let rmv1: HTMLElement;
  let rmv2: HTMLElement;
  let rmv3: HTMLElement;

  fireEvent.click(btn1);
  fireEvent.click(btn3);

  await waitFor(() => {
    rmv1 = screen.getByText("removeToast1");
    rmv2 = screen.queryByText("removeToast2");
    rmv3 = screen.getByText("removeToast3");
  });

  expect(rmv1).not.toBe(null);
  expect(rmv2).toBe(null);
  expect(rmv3).not.toBe(null);

  fireEvent.click(rmv1);

  act(jest.runOnlyPendingTimers);

  await waitFor(() => {
    rmv1 = screen.queryByText("removeToast1");
    rmv3 = screen.getByText("removeToast3");
  });

  expect(rmv1).toBe(null);
  expect(rmv2).toBe(null);
  expect(rmv3).not.toBe(null);
});

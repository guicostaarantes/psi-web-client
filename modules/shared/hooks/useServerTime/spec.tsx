import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import { GetServerTimeDocument } from "@psi/shared/graphql";
import useServerTime from "@psi/shared/hooks/useServerTime";

const timeMock = [
  {
    request: {
      query: GetServerTimeDocument,
    },
    result: {
      data: {
        time: 1621456020,
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: GetServerTimeDocument,
    },
    result: {
      data: null,
    },
  },
];

const TestComponent = () => {
  const serverTime = useServerTime();

  const serverDate = serverTime ? new Date(1000 * serverTime) : undefined;

  return <div>the current time is {serverDate?.toISOString()}</div>;
};

test("should show server time", async () => {
  render(
    <MockedProvider mocks={timeMock}>
      <TestComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const div = screen.getByText(
      "the current time is 2021-05-19T20:27:00.000Z",
    );
    expect(div).toBeInTheDocument();
  });
});

test("should not show server time if errors", async () => {
  render(
    <MockedProvider mocks={errorMock}>
      <TestComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const div = screen.getByText("the current time is");
    expect(div).toBeInTheDocument();
  });
});

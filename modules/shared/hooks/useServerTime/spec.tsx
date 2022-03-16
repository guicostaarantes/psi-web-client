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
        time: new Date(2021, 1, 3, 4, 47, 58),
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

  return <div>the current time is {serverTime?.toISOString()}</div>;
};

test("should show server time", async () => {
  render(
    <MockedProvider mocks={timeMock}>
      <TestComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const div = screen.getByText(
      "the current time is 2021-02-03T09:47:58.000Z",
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

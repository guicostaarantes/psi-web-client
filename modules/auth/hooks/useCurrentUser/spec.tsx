import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { GraphQLError } from "graphql";

import useCurrentUser from "@psi/auth/hooks/useCurrentUser";
import GetOwnUser from "@psi/auth/hooks/useCurrentUser/graphql";

const successMock = [
  {
    request: { query: GetOwnUser },
    result: {
      data: {
        getOwnUser: {
          id: "6c82b9eb-722a-48f5-9418-0fcd3fbbca47",
          email: "tom.brady@psi.com.br",
          role: "PSYCHOLOGIST",
        },
      },
    },
  },
];

const errorMock = [
  {
    request: { query: GetOwnUser },
    result: {
      errors: [new GraphQLError("forbidden")],
    },
  },
];

const TestComponent = () => {
  const { id } = useCurrentUser();

  return <div>current user id is {id}</div>;
};

test("should load user id if retrieved", async () => {
  render(
    <MockedProvider mocks={successMock}>
      <TestComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText(
      "current user id is 6c82b9eb-722a-48f5-9418-0fcd3fbbca47",
    );
    expect(text).toBeInTheDocument();
  });
});

test("should redirect to login if user not found", async () => {
  render(
    <MockedProvider mocks={errorMock}>
      <TestComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.queryByText(
      "current user id is 6c82b9eb-722a-48f5-9418-0fcd3fbbca47",
    );
    expect(text).not.toBeInTheDocument();
  });
});

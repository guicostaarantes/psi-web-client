import { GraphQLError } from "graphql";
import { MockedProvider } from "@apollo/client/testing";
import GetOwnUser from "@src/graphql/GetOwnUser";
import useCurrentUser from "@src/hooks/useCurrentUser";
import { render, screen, waitFor } from "@testing-library/react";

const mockPushRoute = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPushRoute,
  }),
}));

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
  const { id } = useCurrentUser(true);

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
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("should redirect to login if user not found", async () => {
  render(
    <MockedProvider mocks={errorMock}>
      <TestComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("current user id is");
    expect(text).toBeInTheDocument();
    expect(mockPushRoute).toBeCalled();
  });
});

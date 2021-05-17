import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { GraphQLError } from "graphql";

import usePagePermission from "@psi/auth/hooks/usePagePermission";
import { MyUser } from "@psi/auth/hooks/usePagePermission/graphql";

const mockPushRoute = jest
  .fn()
  .mockImplementation(() => new Promise((resolve) => resolve(0)));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPushRoute,
  }),
}));

beforeEach(() => {
  mockPushRoute.mockClear();
});

const successMock = [
  {
    request: { query: MyUser },
    result: {
      data: {
        myUser: {
          id: "6c82b9eb-722a-48f5-9418-0fcd3fbbca47",
          role: "PSYCHOLOGIST",
        },
      },
    },
  },
];

const notAuthenticatedMock = [
  {
    request: { query: MyUser },
    result: {
      errors: [new GraphQLError("forbidden")],
    },
  },
];

const userWithoutPatientProfileMock = [
  {
    request: { query: MyUser },
    result: {
      data: {
        myUser: {
          id: "6c82b9eb-722a-48f5-9418-0fcd3fbbca47",
          role: "PATIENT",
        },
      },
    },
  },
];

const PublicComponent = () => {
  const { pageStatus } = usePagePermission({ requiresAuth: false });

  return <div>current pageStatus is {pageStatus}</div>;
};

test("should not retrieve user if page is public", async () => {
  render(
    <MockedProvider mocks={successMock}>
      <PublicComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("current pageStatus is ready");
    expect(text).toBeInTheDocument();
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("should not redirect unauthenticated visitor since the page is public", async () => {
  render(
    <MockedProvider mocks={notAuthenticatedMock}>
      <PublicComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("current pageStatus is ready");
    expect(text).toBeInTheDocument();
    expect(mockPushRoute).not.toBeCalled();
  });
});

const PrivateComponent = () => {
  const { pageStatus } = usePagePermission({
    requiresAuth: true,
  });

  return <div>current pageStatus is {pageStatus}</div>;
};

test("should show id if page requires login", async () => {
  render(
    <MockedProvider mocks={successMock}>
      <PrivateComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("current pageStatus is ready");
    expect(text).toBeInTheDocument();
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("should redirect to /login if user not found", async () => {
  render(
    <MockedProvider mocks={notAuthenticatedMock}>
      <PrivateComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("current pageStatus is ready");
    expect(text).toBeInTheDocument();
    expect(mockPushRoute).toBeCalledWith("/login");
  });
});

const RestrictToPsychologistComponent = () => {
  const { pageStatus } = usePagePermission({
    requiresAuth: true,
    requiresRole: ["PSYCHOLOGIST"],
  });

  return <div>current pageStatus is {pageStatus}</div>;
};

test("should get pageStatus === notFound if user is logged in but has forbidden role", async () => {
  render(
    <MockedProvider mocks={userWithoutPatientProfileMock}>
      <RestrictToPsychologistComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("current pageStatus is notFound");
    expect(text).toBeInTheDocument();
    expect(mockPushRoute).not.toBeCalled();
  });
});

test("should get pageStatus === ready if user is logged in with permitted role", async () => {
  render(
    <MockedProvider mocks={successMock}>
      <RestrictToPsychologistComponent />
    </MockedProvider>,
  );

  await waitFor(() => {
    const text = screen.getByText("current pageStatus is ready");
    expect(text).toBeInTheDocument();
    expect(mockPushRoute).not.toBeCalled();
  });
});

import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import Home from "@psi/coordinatorStart/components/Home";
import { MyUserDocument } from "@psi/shared/graphql";

const mocks = [
  {
    request: { query: MyUserDocument },
    result: {
      data: {
        myUser: {
          id: "3c73a462-a580-4aeb-ad08-f7978a91be34",
          email: "coordinator@psi.com.br",
          role: "COORDINATOR",
        },
      },
    },
  },
];

test("should render coordinator home", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <Home />
    </MockedProvider>,
  );

  await waitFor(() => {
    const greeting = screen.getByText(
      "Painel do coordenador [coordinator@psi.com.br]",
    );
    expect(greeting).toBeInTheDocument();
  });
});

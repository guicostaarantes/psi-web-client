import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";

import CoordinatorGreeting from "@psi/coordinatorStart/components/Greeting";
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

test("should render correct coordinator email", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <CoordinatorGreeting />
    </MockedProvider>,
  );

  await waitFor(() => {
    screen.getByText("Painel do coordenador [coordinator@psi.com.br]");
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { useEffect, useState } from "react";

import useSearchParams from "@psi/shared/hooks/useSearchParams";

const TestComponent = () => {
  const { getSearchParam } = useSearchParams();

  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getSearchParam("token"));
  }, []);

  return <div>the token in search params is {token}</div>;
};

test("should get token from search params", async () => {
  Object.defineProperty(window, "location", {
    value: {
      search: "?foo=bar&token=valid-token",
    },
  });

  render(<TestComponent />);

  const div = screen.getByText("the token in search params is valid-token");

  await waitFor(() => expect(div).toBeInTheDocument());
});

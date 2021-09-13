import { render, screen, waitFor } from "@testing-library/react";
import fetch from "cross-fetch";

import Image from "@psi/styleguide/components/Image";

jest.mock("cross-fetch");
const mockedFetch = (fetch as unknown) as jest.Mock;
global.URL.createObjectURL = jest.fn((a) => `blob:${a}`);

test("Image renders", () => {
  render(
    <Image
      src="data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEXMzMyWlpacnJy+vr6jo6PFxcW3t7eqqqqxsbHbm8QuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAiklEQVRYhe3QMQ6EIBAF0C+GSInF9mYTs+1ewRsQbmBlayysKefYO2asXbbYxvxHQj6ECQMAEREREf2NQ/fCtp5Zky6vtRMkSJEzhyISynWJnzH6Z8oQlzS7lEc/fLmmQUSvc16OrCPqRl1JePxQYo1ZSWVj9nxrrOb5esw+eXdvzTWfTERERHRXH4tWFZGswQ2yAAAAAElFTkSuQmCC"
      label="example image"
    />,
  );
  const image = screen.getByAltText("example image");

  expect(image).toBeInTheDocument();
});

test("Image fetches with token if auth=true", async () => {
  mockedFetch.mockImplementationOnce((src) =>
    Promise.resolve({
      blob: () => Promise.resolve(src),
    }),
  );

  render(<Image auth src="1234abcd" label="fetched image" />);

  const image = screen.getByAltText("fetched image") as HTMLImageElement;

  await waitFor(() => {
    expect(mockedFetch).toBeCalledTimes(1);
    expect(image.src).toEqual("blob:http://localhost/static/1234abcd");
  });
});

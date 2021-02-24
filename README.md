# Psi web client

This is the web client application for Psi.

Psi is a project that aims to provide low-cost psychological treatment to people that are not able to afford the high prices of the market, and also to help people in vulnerable situations with volunteering, totally free appointments.

Feel free to open an issue or create a pull request. Please follow the rules:

- Be gentle with your colleagues 😊.
- Write code and documentation in English.
- Write issues and pull requests in English.
- Use variable names that explain what that variable/function is supposed to do.
- Prepend every commit message with an emoji 😎 to help others understand what you are doing there (use https://gitmoji.dev as a reference).

## Instructions to help you get going

### NextJS

- This project is based on React and NextJS.
- Make sure to read the [NextJS documentation](https://nextjs.org/docs) to better understand what is going on.

### Server

- This app consumes a GraphQL API available at [https://github.com/guicostaarantes/psi-server](https://github.com/guicostaarantes/psi-server).
- It is recommended to clone this repo and run it with `docker-compose up --build` so that you can fully test the features on the web client.

### Folder structure

- `./public`: static served files, [following NextJS documentation](https://nextjs.org/docs/basic-features/static-file-serving).
- `./src/pages`: a place for React components that represent whole pages of the application. [Following NextJS documentation](https://nextjs.org/docs/basic-features/pages), the route structure of the app will mimic the file structure under this folder.
- `./src/styleguide`: a place for React components that are small and likely to be used in other React components multiple times, such as a Button, an Input, etc.
- `./src/components`: a place for React components that are larger and not likely to be used in other React components multiple times, and also do not constitute the whole of a page, such as the login form, the registration form, etc.
- `./src/hooks`: a place for React custom hooks that are likely to be used in other React components multiple times.
- `./src/constants`: a place for numeric or string constants that are likely to be used multiple times in other files.
- `./src/graphql`: a place for GraphQL queries and mutations that shall be used in React components by the @apollo/client library.

### Component structure

- Every React component and hook is described in a folder with two files: `index.tsx` and `spec.tsx`.
- `index.tsx` files hold all the information for rendering the component (logic, markup and styles).
- Styles are delivered by using `<style jsx>` tags, [following NextJS documentation](https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js).
- `spec.tsx` files hold the tests for the React component or hook in the `index.tsx` file in the same folder.

### Environment variables

- Following NextJS documentation, environment variables for development purposes are declared in `./.env.development`. Set all necessary environment variables in this file so it can be used as a reference as to what environment variables to set when deploying in production.
- If you'd like to deploy this project manually, an easy way to set the environment variables for the production environment is to create a file `./.env.production` with the same keys as `./.env.development`. However remember not to commit this file to the repo as it probably contains secret information.
- [Following NextJS documentation](https://nextjs.org/docs/basic-features/environment-variables), in order to make an environment variable public (appear in the code client-side), prefix it with `NEXT_PUBLIC_`.

### State management

- State management in this application is handled by the [@hookstate/core](https://hookstate.js.org/docs/getting-started) library.
- This library provides a simple API for state that needs to be shared between multiple components. For global states, it is not necessary to wrap the whole application in a provider like the Context API.
- Global states should be handled by a custom hook in `./src/hooks`. Check `useToast` for an example.

### Import statements

- Import statements have absolute paths, [following NextJS documentation](https://nextjs.org/docs/advanced-features/module-path-aliases). The `@src/` prefix references the src folder. Do not use `../` in your imports as it makes the code less readable and movable.
- If you are using VSCode, install the `mike-co.import-sorter` extension that will help you organize your import statements.

### Linting

- You may run `yarn lint` to check all your files for static and formatting errors.
- If you are using VSCode, install the `dbaeumer.vscode-eslint` and `esbenp.prettier-vscode` extensions that will help you lint and organize your code.

### Unit testing

- You may run `yarn test` to run all the spec.tsx files.
- If you are using VSCode, install the `orta.vscode-jest` extension that runs the tests as you save the files.

### VSCode

- This repo has extension recommendations and settings if you are using VSCode. Make sure to use them for a better programming experience.

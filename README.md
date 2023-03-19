## To run locally
- Run `yarn install` to install dependencies defined in `package.json`
- Add a 'screenshots' folder at the root level of the project
- Run `npx playwright test tests/michigan-wisconsin.spec.ts`
  - If you want to see what's happening (i.e., NOT run it headlessly), add a `--headed` flag

## Note
- Michigan's and Wisconsin's websites are very close to being the same, which allows us to use the same element locators (for the most part). Illinois is gonna need a whole different "test".

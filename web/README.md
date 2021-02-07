# Web

This is an [AWS Amplify](https://docs.amplify.aws/start/q/integration/next) + [Next.js](https://nextjs.org/) app. See [documentation](../docs/Setup.md) to get started.

## Folders organization

- `amplify/` amplify backend definition and configuration
- `public/` files that should be available publicly, that aren't bundled by webpack
- `src/` Files bundled by webpack
  - `components/` React components (usually `.jsx` files), following atomic design
    - `atoms/` Basic building blocks (a button)
    - `molecules/` Groups of atoms (a subscribe button)
    - `organisms/` Groups of molecules (a navbar)
    - `templates/` Arrange children components following a specific layout
  - `consts/` Only exports constants
  - `graphql/` GraphQL queries, mutations and subscriptions
  - `lib/` Claptime related helpers
  - `pages/` Next.js route components
  - `styles/` CSS and LESS stylesheets
  - `utils/` Generic helpers

# Web

This is an [AWS Amplify](https://aws-amplify.github.io/) + [React](https://reactjs.org) app.

## Folders organization

- `amplify/` amplify configuration
- `public/` files that should be available publicly, outside of the webpack bundle
- `src/` Files bundled by webpack.
  - `components/` React components (usually `.jsx` files), following atomic design
    - `atoms/` Basic building blocks (a button)
    - `molecules/` Groups of atoms (a subscribe button)
    - `organisms/` Groups of molecules (a navbar)
    - `templates/` Arrange children components following a specific layout
  - `consts/` Only exports constants
  - `graphql/` GraphQL queries, mutations and subscriptions
  - `lib/` Claptime related helpers
  - `pages/` Next.js route components
  - `styles/` Less style
  - `utils/` Generic helpers

## Environments/Stages

### Production

- URL: [https://www.clap-time.com](https://www.clap-time.com)
- Git branch: `#master`

### Staging

- URL: [https://staging.clap-time.com](https://staging.clap-time.com)
- Git branch: `#develop`
- Username: `claptime`
- Password: `crackersstaging`

## Setup a new environment

```bash
git checkout develop
npm install
amplify checkout staging
amplify env add # No / {ENV_NAME} / Yes / {PROFILE_NAME}
amplify push # Yes / javascript / src/graphql/**/*.js / Yes / 8
claptime setup-env
claptime seed:all
```

## Local development

You can run the app locally: `npm run dev`. However you will have to configure CORS in order to load videos from the CDN. You can install [CORS Everywhere on Firefox](https://addons.mozilla.org/fr/firefox/addon/cors-everywhere/) or [Allow CORS on Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf).

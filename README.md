# fyre web

> web app for fyreapp.com using express.js and vue.js

[ ![Codeship Status for fyreapp/web](https://app.codeship.com/projects/9a72d500-ceb2-0134-b696-3e4d19dff638/status?branch=master)](https://app.codeship.com/projects/200620)

## Features

- Server Side Rendering
  - Vue + vue-router + vuex
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production

## Build setup

### Environment variables

You need a `.env` file at the root of your project to run the server and proxy calls to the Fyre API. It should look something like the following:

```text
PORT = 3030
API_PROTOCOL = 'http'
API_HOST = 'XX.XXX.XX.XXX'
API_PORT = 'XXXX'
APP_KEY = '<YOUR_API_KEY>'
APP_SECRET = '<YOUR_API_SECRET>'
```

### Build Process

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/web; npm install or yarn to rebuild yarn.lock file
    ```

3. Start app

    ``` bash
    # serve in dev mode, with hot reload at localhost:3030
    npm run dev

    # build for production
    npm run build

    # serve in production mode
    npm start
    ```

## Fyre UI Linking

When developing this app in conjunction with the [Fyre UI component library](https://github.com/fyreapp/ui), it is often useful to co-develop the components so you can immediately see how changes might look on the website. To do this, we are using [`npm link`](https://docs.npmjs.com/cli/link) to symlink your local package in place of the live npm package. Below are the commands to set this up:

```bash
System:ui User$ npm link
System:ui User$ cd ../web
System:web User$ npm link fyre-ui
```

Be sure to do this only after you have installed the `web` dependencies so that `/node_modules` is available to symlink.

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Linting

We use [eslint](http://eslint.org/) as our linting utility for JavaScript. It is configured to lint all client, server, and testing JS files inside the app, even inside `.vue` file script tags. Run the following command to execute the linting process in your terminal.

```bash
npm run eslint
```

**Note**: If you use [VS Code](https://code.visualstudio.com/) as your IDE, [check out this issue and comments](https://github.com/Microsoft/vscode-eslint/issues/42#issuecomment-264836417) in order to enable automatic linting of your `.vue` files

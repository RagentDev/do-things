# Things to add to this readme
## Project Setup
- Need to use Prettier and ESLint
- Line endings need to be set to "LF" - Unix and MacOS
  - git config --global core.autocrlf false

### Date Fns
- There is a library called DateFns for checking dates, use this.

### Logger
There is a special logger in the project, ONLY use this in runes/stores.
It's attached to a special on-screen console.
"console.error" should be reserved for SERIOUS errors only.
```javascript
logger.info
logger.success
logger.error
// ... and there's a few more.
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

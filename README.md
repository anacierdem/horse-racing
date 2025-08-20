# Horse Racing

## Project Setup

This project have a [devcontainer](https://containers.dev/) setup and if you have a compatible environment, you can quickly get up and running. e.g on vscode, you can simply reopen in container. That's also the reason why `dev` and `preview` scripts use the `--host` binding as otherwise you won't be able to access the server on your host machine.

Once you make sure you have proper node setup (or you're in the devcontainer),
install dependencies:

```sh
npm install
```

Start the dev. environement with hot reload support:

```sh
npm run dev
```

Type check, compile and build for production:

```sh
npm run build
```

Run linter:

```sh
npm run lint
```

Run prettier to format all files:

```sh
npm run format
```

## TODO:

- [ ] Create tests (both unit and e2e)
- [ ] Improve how the UI looks, it is currently pretty barebones

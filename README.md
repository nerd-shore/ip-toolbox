## Monorepo for IAS front-ends

This repository is meant to accumulate the steadily growing count of front-ends for easier package maintainability.

To support all this we use [lerna](https://lernajs.io)

#### Current IAS packages

- carrier-cockpit (cc)
- code-table-management (ctms)
- gsp-frontend (gsp)

#### Set-Up

```bash
npm install --global lerna yarn
yarn install
yarn bootstrap
```

#### Start

```bash
yarn start:${package_name_shortcut}
```

#### Workspaces

If workspaces don't work out-of-the-box perform

```bash
yarn config set workspaces-experimental true
```

#### To bump versions

```bash
yarn upgrade-interactive --latest
```

#### To add a new node module via yarn 

This will add the package to the workspace

```bash
yarn add ${package_name} -W
```

Add ```-D``` in case for devDependencies

#### Build a specific package

```bash
yarn build:${package_name_shortcut}
```

#### Run e2e tests for a certain package

```bash
yarn e2e:${package_name_shortcut}
```

#### Create version files for all packages

```bash
yarn buildversion
```

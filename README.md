## Monorepo for NerdShore node libraries

This repository is meant to accumulate the steadily growing count of front-ends for easier package maintainability.

To support all this we use [lerna](https://lernajs.io)

#### Current NerdShore packages

- ip-api
- ip-awe
- ip-calendar
- ip-common-styles
- ip-contextual-modules
- ip-design-elements
- ip-load-more
- ip-renderJSON
- ip-renderXML
- ip-redux-service-worker
- ip-redux-store-configuration
- ip-redux-store-modules
- ip-tslint-config
- ip-utils

#### Set-Up

```bash
npm install --global lerna
npm install
npm run bootstrap
```

#### Start

```bash
npm run start:${package_name_shortcut}
```

#### Workspaces

If workspaces don't work out-of-the-box perform

```bash
npm run config set workspaces-experimental true
```

#### To bump versions

```bash
npm run upgrade-interactive --latest
```

#### To add a new node module via yarn 

This will add the package to the workspace

```bash
npm run add ${package_name} -W
```

Add ```-D``` in case for devDependencies

#### Build a specific package

```bash
npm run build:${package_name_shortcut}
```

#### Run e2e tests for a certain package

```bash
npm run e2e:${package_name_shortcut}
```

#### Create version files for all packages

```bash
npm run buildversion
```

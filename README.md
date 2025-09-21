# namestack


## Installation/Setup
We use [pnpm workspaces](https://pnpm.io) and [Turborepo](https://turborepo.com) to
manage the (mono)repo.

Simply run `pnpm install` from the root directory to install dependencies across all
apps/packages in the repository.

## Adding new dependencies
Most dependency installations will happen _inside_ one of our apps or local packages.
Always make sure you're inside the directory for the app you want to install a dependency for
e.g. for the `web` app:

```bash
cd apps/web/
pnpm add [dependency] -E
```
or for dev-dependencies:

```bash
cd apps/web/
pnpm add [dependency] -DE
```

For dependencies that are **required** to be in the project root because they are used e.g.
for administering the repo (like `turbo`), you can install them from the root directory using
pnpm's `-w` flag :
```bash
pnpm add turbo -wE
```

### Exact versions
You'll note that all the commands above include pnpm's `-E` flag. We almost exclusively
install exact versions of dependencies to make sure dependency versions are consistent
across development, CI, canary and production machines, never mind the
[supply](https://www.ox.security/blog/npm-2-0-hack-40-npm-packages-hit-in-major-supply-chain-attack/)
[chain](https://www.paloaltonetworks.com/blog/cloud-security/npm-supply-chain-attack/)
security risks that come with automatic patch installations.

Use `-E` or `--save-exact` to make sure dependencies will be saved using exact versions.

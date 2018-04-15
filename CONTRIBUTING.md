# Contributing

## Setup

Use `npm` to install dependencies:

```
npm install
```

## Running tests

We use [ava](https://github.com/avajs/ava) to run tests. They are located in `specs` folder.
To run them all use;

```
npm test
```

## Updating changelog

It's manual work. Update `[Unreleased]` section of the CHANGELOG.md file with your changes.
On release, all `[Unreleased]` entries go to the released version section.

## Documentation

The documentation is generated from the comments in files from `lib` directory.
To make sure the documentation looks right, generate it locally:

```
npm run docs:generate
```

To update documentation, use

```
npm run docs:update
```

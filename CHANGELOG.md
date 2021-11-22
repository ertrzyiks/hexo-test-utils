# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
## [0.5.0]
- Add support for Hexo 5

## [0.4.1]
 - Fix the released code

## [0.4.0]
 - Add support for Hexo 4

## [0.3.1]
### Fixed
 - Fix return type of `sandboxFactoryFn`.

## [0.3.0]
### Added
 - add `skipInit` property to the sandbox factory function
 - a separate `init` function

## [0.2.1] - 2018-05-18
### Added
 - allow to pass object with `fixtureName` property to the sandbox factory function

## [0.2.0] - 2018-05-15
### Added
 - `hasRoute` can be called with regular expression

### Changed
 - `getHelper` returns a function already bound the the context, it's immediately callable

## [0.1.3] - 2018-04-22
### Fixed
 - make sure `_config.yml` can be read

## [0.1.2] - 2018-04-20]
### Fixed
 - `contentFor` for binary data

## [0.1.1] - 2018-04-20]
### Fixed
 - `contentFor` for buffers being strings and not found routes

## [0.1.0] - 2018-04-19
### Added
 - documentation

### Changed
 - reorganized modules, all functions are exported from the main module

## [0.0.3] - 2018-04-03
### Fixed
- index.js compilation

## [0.0.2] - 2018-04-03
### Added
- basic specs

### Changed
- The init function returned by `createSandbox` returns a Promise now

### Fixed
- `hasRoute` returns correct value for removed routes

## [0.0.1] - 2018-03-14
### Added
- Initial version
- `createSandbox` function
- `core/process` function
- `Added: ``core/mockConfig` function
- `helpers/getHelper` function
- `helpers/hasHelper` function
- `routing/contentFor` function
- `routing/hasRoute` function

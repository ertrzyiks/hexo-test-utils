# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
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

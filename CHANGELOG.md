# Changelog

## [1.7.0]

### Added
- Add check script in order to identify missing keys as part of the CICD pipeline of an application using this package.

## [1.6.0]

### Added
- Support for [JSON5](https://json5.org/) configuration file format, which allows for comments and in general more flexible, human-friendly syntax.

## [1.5.1]
### Fix
- Was not parsing booleans and number from secret manager

## [1.5.0]
### Added
- Added new configuration type: Javascript.

## [1.4.1]
### Changed
 - Update yarn.lock to fix vulnerabilities

## [1.4.0]
### Changed
 - Upgrade peer dependency `aws-sdk`

## [1.3.4]
### Changed
 - fix misprint in README for JSON config
 
## [1.3.3]
### Changed
 - Upgrade flat package to latest (patch)

## [1.3.2]
### Changed
 - Upgrade flat package to latest (patch)

## [1.3.1]
### Added
use `ConsistentRead: true` for Dynamo DB scanning params

## [1.3.0]
### Added
- Added support for AWS Secret Manager

# v2.0.3 (Mon Aug 07 2023)

#### ⚠️ Pushed to `main`

- chore(node): downgrade to node 18 ([@edwarddamato](https://github.com/edwarddamato))

#### Authors: 1

- Edward D'Amato ([@edwarddamato](https://github.com/edwarddamato))

---

# v2.0.2 (Mon Aug 07 2023)

#### 🐛 Bug Fix

- chore(package): publish dist folder to npm [#4](https://github.com/pleo-io/config-man/pull/4) ([@edwarddamato](https://github.com/edwarddamato))

#### 🏠 Internal

- Ensure packages, package managers, engine configuration [#3](https://github.com/pleo-io/config-man/pull/3) ([@andersfischernielsen](https://github.com/andersfischernielsen))

#### Authors: 2

- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Edward D'Amato ([@edwarddamato](https://github.com/edwarddamato))

---

# v2.0.1 (Mon Aug 07 2023)

#### 🐛 Bug Fix

- feat(aws-sdk): upgrade aws-sdk to v3 [#1](https://github.com/pleo-io/config-man/pull/1) ([@edwarddamato](https://github.com/edwarddamato))

#### ⚠️ Pushed to `main`

- Update the release workflow ([@andersfischernielsen](https://github.com/andersfischernielsen))
- empty commit ([@edwarddamato](https://github.com/edwarddamato))
- Fix dependencies ([@Fjandin](https://github.com/Fjandin))
- Fix package info and publish ([@Fjandin](https://github.com/Fjandin))
- Fix publish ([@Fjandin](https://github.com/Fjandin))
- Create SECURITY.md ([@Fjandin](https://github.com/Fjandin))
- Update issue templates ([@Fjandin](https://github.com/Fjandin))
- Update package.json ([@Fjandin](https://github.com/Fjandin))
- Fix tests ([@Fjandin](https://github.com/Fjandin))
- Workflow ([@Fjandin](https://github.com/Fjandin))
- Update main.workflow ([@Fjandin](https://github.com/Fjandin))
- test ([@Fjandin](https://github.com/Fjandin))
- Merge branch 'pr-test' of github.com:Fjandin/fjandin-config-man into pr-test-2 ([@Fjandin](https://github.com/Fjandin))
- Update README.md ([@Fjandin](https://github.com/Fjandin))
- Update test.yaml ([@Fjandin](https://github.com/Fjandin))
- Create test.yaml ([@Fjandin](https://github.com/Fjandin))
- Update publish.yaml ([@Fjandin](https://github.com/Fjandin))
- test and publish ([@Fjandin](https://github.com/Fjandin))
- Update nodejs.yml ([@Fjandin](https://github.com/Fjandin))
- Create CODE_OF_CONDUCT.md ([@Fjandin](https://github.com/Fjandin))
- Create LICENSE ([@Fjandin](https://github.com/Fjandin))
- upgrades ([@Fjandin](https://github.com/Fjandin))
- bump ([@Fjandin](https://github.com/Fjandin))
- fix ([@Fjandin](https://github.com/Fjandin))
- deploy ([@Fjandin](https://github.com/Fjandin))
- remove token ([@Fjandin](https://github.com/Fjandin))
- circleci ([@Fjandin](https://github.com/Fjandin))
- Use fs to load schema and not require ([@Fjandin](https://github.com/Fjandin))
- beta.8 ([@Fjandin](https://github.com/Fjandin))
- v1 ([@Fjandin](https://github.com/Fjandin))
- changes ([@Fjandin](https://github.com/Fjandin))
- wip ([@Fjandin](https://github.com/Fjandin))
- config-man ([@Fjandin](https://github.com/Fjandin))

#### Authors: 3

- Anders Fischer-Nielsen ([@andersfischernielsen](https://github.com/andersfischernielsen))
- Edward D'Amato ([@edwarddamato](https://github.com/edwarddamato))
- René Bischoff ([@Fjandin](https://github.com/Fjandin))

---

# Changelog

## [2.0.0]

### Added
- Upgraded from aws-sdk v2 to client specific v3 libraries (@aws-sdk/client-dynamodb & @aws-sdk/client-secrets-manager)

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

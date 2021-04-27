# [5.0.0-next.4](https://github.com/podium-lib/utils/compare/v5.0.0-next.3...v5.0.0-next.4) (2021-04-27)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.0.4 ([5ff49c0](https://github.com/podium-lib/utils/commit/5ff49c02e0999b2e7c105caad93f626d518d686f))
* **deps:** update dependency @podium/schemas to v4.0.5 ([9bf1a14](https://github.com/podium-lib/utils/commit/9bf1a1491a59d17b4715e06fd3692ba8f1907ffa))
* **deps:** update dependency @podium/schemas to v4.1.0 ([4ff5fe9](https://github.com/podium-lib/utils/commit/4ff5fe9ea31c7e999d953ca5acb5bd6417dbf3c5))
* **deps:** update dependency @podium/schemas to v4.1.1 ([f2cc938](https://github.com/podium-lib/utils/commit/f2cc93840039fc47cac7e9ef2cd95dbb1395c8e5))
* **deps:** update dependency @podium/schemas to v4.1.10 ([5a10235](https://github.com/podium-lib/utils/commit/5a10235b74a5faa7fc9cf65efc7aab69883f6781))
* **deps:** update dependency @podium/schemas to v4.1.11 ([20941c6](https://github.com/podium-lib/utils/commit/20941c6912b60a4dd3c654a3e674589a0713ae30))
* **deps:** update dependency @podium/schemas to v4.1.13 ([f677772](https://github.com/podium-lib/utils/commit/f6777726c06362b1de6acf1e613db1b0928456ba))
* **deps:** update dependency @podium/schemas to v4.1.14 ([0deb0d0](https://github.com/podium-lib/utils/commit/0deb0d0ffa14735d6a1e850291322bb670eb5436))
* **deps:** update dependency @podium/schemas to v4.1.15 ([446458c](https://github.com/podium-lib/utils/commit/446458c6bd75e2ca8efd21d37107188a7146cd1e))
* Update @podium/schema to version 4.1.9 to fix ajv error ([#110](https://github.com/podium-lib/utils/issues/110)) ([08ee7df](https://github.com/podium-lib/utils/commit/08ee7dfa6bc8b413bb8ee12dd778606f0c6c04e4))
* **deps:** update dependency @podium/schemas to v4.0.7 ([cbded99](https://github.com/podium-lib/utils/commit/cbded9938631209d7d1c3da3bf7600379d0524dc))
* **deps:** update dependency @podium/schemas to v4.1.2 ([04c7b1b](https://github.com/podium-lib/utils/commit/04c7b1be013fb6be5b6a1d5a18f2a12946f0273f))
* **deps:** update dependency @podium/schemas to v4.1.3 ([e663829](https://github.com/podium-lib/utils/commit/e66382960675a7770a77913611b67042efdf4755))
* **deps:** update dependency @podium/schemas to v4.1.4 ([4cb9bb6](https://github.com/podium-lib/utils/commit/4cb9bb65c6da0cc56bbb96b9f9555ce3067a1359))
* **deps:** update dependency @podium/schemas to v4.1.5 ([d920dab](https://github.com/podium-lib/utils/commit/d920dabf5f3ad3f5d55f3da204f01f36b83a1e17))
* **deps:** update dependency @podium/schemas to v4.1.6 ([f92062c](https://github.com/podium-lib/utils/commit/f92062c4d3d403aef90978efce41e554645b97b2))
* **deps:** update dependency @podium/schemas to v4.1.7 ([9eac72d](https://github.com/podium-lib/utils/commit/9eac72dc56b584ddfe9343757429f1b7daea86f3))
* **deps:** update dependency @podium/schemas to v4.1.8 ([c8fde78](https://github.com/podium-lib/utils/commit/c8fde78758d7a6e36e90d37d066f11806ffad885))
* **deps:** update dependency camelcase to v6.1.0 ([ef22149](https://github.com/podium-lib/utils/commit/ef2214918172d1b6044b72f44771c7fb22f5aa77))
* **deps:** update dependency camelcase to v6.2.0 ([3e9dec9](https://github.com/podium-lib/utils/commit/3e9dec90c4d511b5d6abe1360bf9a1a8195d2833))


### Features

* add .buildReactLinkAttributes and .buildReactScriptAttributes methods ([ffb0bff](https://github.com/podium-lib/utils/commit/ffb0bff96a998694cb7102e0f9dc14c943914f7a))
* add .toReactAttrs() method to AssetJs and AssetCss classes and integration tests ([7ab097f](https://github.com/podium-lib/utils/commit/7ab097f51d48001c884eb734eb823b0516e2eb24))
* Convert to ESM ([#119](https://github.com/podium-lib/utils/issues/119)) ([349c5b9](https://github.com/podium-lib/utils/commit/349c5b928726d8f808107ce4d0c0abfd1d15e937))


### BREAKING CHANGES

* Convert from CommonJS to ESM

* feat: convert to ESM

* fix: Remove outcommented code

* ci: Add build step for backward compat to CJS

* ci: Ignore linting dist directory

Co-authored-by: Trygve Lie <trygve.lie@finn.no>

# [5.0.0-next.3](https://github.com/podium-lib/utils/compare/v5.0.0-next.2...v5.0.0-next.3) (2020-07-27)


### Features

* Use ES private properties instead of Symbols for privacy ([#72](https://github.com/podium-lib/utils/issues/72)) ([4083fa1](https://github.com/podium-lib/utils/commit/4083fa17301630d3669f8c819978fa2a99e5274d))


### BREAKING CHANGES

* Due to dropping node 10.x support we use ES private properties instead of Symbols.

We've been using Symbols to define private properties in classes up until now. This has the downside that they are not true private and in later versions of node.js one would see these Symbols when inspecting an object. What we want is proper private properties.

This PR does also add a pretty printer which outputs an object literal or the object so when debugging one can see the getters and setters of the object.

Example: printing a object with `console.log()` would previously print the following:

```sh
PodiumHttpIncoming {
  [Symbol(podium:httpincoming:development)]: false,
  [Symbol(podium:httpincoming:response)]: {},
  [Symbol(podium:httpincoming:request)]: {},
  [Symbol(podium:httpincoming:context)]: {},
  [Symbol(podium:httpincoming:params)]: {},
  [Symbol(podium:httpincoming:proxy)]: false,
  [Symbol(podium:httpincoming:name)]: '',
  [Symbol(podium:httpincoming:view)]: {},
  [Symbol(podium:httpincoming:url)]: {},
  [Symbol(podium:httpincoming:css)]: [],
  [Symbol(podium:httpincoming:js)]: []
}
```

Now the following will be printed:

```sh
{
  development: false,
  response: {},
  request: {},
  context: {},
  params: {},
  proxy: false,
  name: '',
  view: {},
  url: {},
  css: [],
  js: []
}
```

Co-authored-by: Trygve Lie <trygve.lie@finn.no>

# [5.0.0-next.2](https://github.com/podium-lib/utils/compare/v5.0.0-next.1...v5.0.0-next.2) (2020-07-15)
## [4.4.16](https://github.com/podium-lib/utils/compare/v4.4.15...v4.4.16) (2021-04-11)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.15 ([446458c](https://github.com/podium-lib/utils/commit/446458c6bd75e2ca8efd21d37107188a7146cd1e))

## [4.4.15](https://github.com/podium-lib/utils/compare/v4.4.14...v4.4.15) (2021-04-02)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.14 ([0deb0d0](https://github.com/podium-lib/utils/commit/0deb0d0ffa14735d6a1e850291322bb670eb5436))

## [4.4.14](https://github.com/podium-lib/utils/compare/v4.4.13...v4.4.14) (2021-04-02)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.13 ([f677772](https://github.com/podium-lib/utils/commit/f6777726c06362b1de6acf1e613db1b0928456ba))

## [4.4.13](https://github.com/podium-lib/utils/compare/v4.4.12...v4.4.13) (2021-04-01)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.10 ([5a10235](https://github.com/podium-lib/utils/commit/5a10235b74a5faa7fc9cf65efc7aab69883f6781))
* **deps:** update dependency @podium/schemas to v4.1.11 ([20941c6](https://github.com/podium-lib/utils/commit/20941c6912b60a4dd3c654a3e674589a0713ae30))

## [4.4.12](https://github.com/podium-lib/utils/compare/v4.4.11...v4.4.12) (2021-03-30)


### Bug Fixes

* Update @podium/schema to version 4.1.9 to fix ajv error ([#110](https://github.com/podium-lib/utils/issues/110)) ([08ee7df](https://github.com/podium-lib/utils/commit/08ee7dfa6bc8b413bb8ee12dd778606f0c6c04e4))

## [4.4.11](https://github.com/podium-lib/utils/compare/v4.4.10...v4.4.11) (2021-03-27)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.8 ([c8fde78](https://github.com/podium-lib/utils/commit/c8fde78758d7a6e36e90d37d066f11806ffad885))

## [4.4.10](https://github.com/podium-lib/utils/compare/v4.4.9...v4.4.10) (2021-03-26)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.7 ([9eac72d](https://github.com/podium-lib/utils/commit/9eac72dc56b584ddfe9343757429f1b7daea86f3))

## [4.4.9](https://github.com/podium-lib/utils/compare/v4.4.8...v4.4.9) (2021-03-20)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.6 ([f92062c](https://github.com/podium-lib/utils/commit/f92062c4d3d403aef90978efce41e554645b97b2))

## [4.4.8](https://github.com/podium-lib/utils/compare/v4.4.7...v4.4.8) (2021-03-08)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.5 ([d920dab](https://github.com/podium-lib/utils/commit/d920dabf5f3ad3f5d55f3da204f01f36b83a1e17))

## [4.4.7](https://github.com/podium-lib/utils/compare/v4.4.6...v4.4.7) (2021-03-07)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.4 ([4cb9bb6](https://github.com/podium-lib/utils/commit/4cb9bb65c6da0cc56bbb96b9f9555ce3067a1359))

## [4.4.6](https://github.com/podium-lib/utils/compare/v4.4.5...v4.4.6) (2021-02-17)


### Bug Fixes

* Simplify js and css value validation ([#70](https://github.com/podium-lib/utils/issues/70)) ([05a1ffc](https://github.com/podium-lib/utils/commit/05a1ffc17bce3249b349b218a9b5ea8585db5df8))

# [5.0.0-next.1](https://github.com/podium-lib/utils/compare/v4.3.0...v5.0.0-next.1) (2020-07-12)
* **deps:** update dependency @podium/schemas to v4.1.3 ([e663829](https://github.com/podium-lib/utils/commit/e66382960675a7770a77913611b67042efdf4755))

## [4.4.5](https://github.com/podium-lib/utils/compare/v4.4.4...v4.4.5) (2021-02-11)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.2 ([04c7b1b](https://github.com/podium-lib/utils/commit/04c7b1be013fb6be5b6a1d5a18f2a12946f0273f))

## [4.4.4](https://github.com/podium-lib/utils/compare/v4.4.3...v4.4.4) (2021-02-02)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.1 ([f2cc938](https://github.com/podium-lib/utils/commit/f2cc93840039fc47cac7e9ef2cd95dbb1395c8e5))

## [4.4.3](https://github.com/podium-lib/utils/compare/v4.4.2...v4.4.3) (2021-01-22)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.0 ([4ff5fe9](https://github.com/podium-lib/utils/commit/4ff5fe9ea31c7e999d953ca5acb5bd6417dbf3c5))

## [4.4.2](https://github.com/podium-lib/utils/compare/v4.4.1...v4.4.2) (2021-01-21)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.0.7 ([cbded99](https://github.com/podium-lib/utils/commit/cbded9938631209d7d1c3da3bf7600379d0524dc))

## [4.4.1](https://github.com/podium-lib/utils/compare/v4.4.0...v4.4.1) (2020-10-28)


### Bug Fixes

* **deps:** update dependency camelcase to v6.2.0 ([3e9dec9](https://github.com/podium-lib/utils/commit/3e9dec90c4d511b5d6abe1360bf9a1a8195d2833))

# [4.4.0](https://github.com/podium-lib/utils/compare/v4.3.3...v4.4.0) (2020-10-12)


### Features

* Drop node 10.x support ([#67](https://github.com/podium-lib/utils/issues/67)) ([84203f8](https://github.com/podium-lib/utils/commit/84203f8ee2591b331aa52b2f70035b2a73f9d95e))


### BREAKING CHANGES

* Only support node 12 and 14.

Co-authored-by: Trygve Lie <trygve.lie@finn.no>
* add .buildReactLinkAttributes and .buildReactScriptAttributes methods ([ffb0bff](https://github.com/podium-lib/utils/commit/ffb0bff96a998694cb7102e0f9dc14c943914f7a))
* add .toReactAttrs() method to AssetJs and AssetCss classes and integration tests ([7ab097f](https://github.com/podium-lib/utils/commit/7ab097f51d48001c884eb734eb823b0516e2eb24))

## [4.3.3](https://github.com/podium-lib/utils/compare/v4.3.2...v4.3.3) (2020-10-10)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.0.5 ([9bf1a14](https://github.com/podium-lib/utils/commit/9bf1a1491a59d17b4715e06fd3692ba8f1907ffa))

## [4.3.2](https://github.com/podium-lib/utils/compare/v4.3.1...v4.3.2) (2020-10-10)


### Bug Fixes

* **deps:** update dependency camelcase to v6.1.0 ([ef22149](https://github.com/podium-lib/utils/commit/ef2214918172d1b6044b72f44771c7fb22f5aa77))

## [4.3.1](https://github.com/podium-lib/utils/compare/v4.3.0...v4.3.1) (2020-09-13)


### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.0.4 ([5ff49c0](https://github.com/podium-lib/utils/commit/5ff49c02e0999b2e7c105caad93f626d518d686f))

# [4.3.0](https://github.com/podium-lib/utils/compare/v4.2.5...v4.3.0) (2020-06-26)


### Features

* support data attributes on javascript assets ([#61](https://github.com/podium-lib/utils/issues/61)) ([9f418b2](https://github.com/podium-lib/utils/commit/9f418b2d04ce7bb04fcfe6e1e1c9cf7de6d50107))

# Changelog

Notable changes to this project.

The latest version of this document is always available in [releases][releases-url].

## [Unreleased]

## [3.1.2] - 2019-03-21

-   Improved performance of HttpIncoming - [#6](https://github.com/podium-lib/utils/pull/6)

## [3.1.1] - 2019-02-07

- Initial open source release.

[unreleased]: https://github.com/podium-lib/utils/compare/v3.1.2...HEAD
[3.1.2]: https://github.com/podium-lib/utils/releases/tag/v3.1.2
[3.1.1]: https://github.com/podium-lib/utils/releases/tag/v3.1.1
[releases-url]: https://github.com/podium-lib/utils/blob/master/CHANGELOG.md

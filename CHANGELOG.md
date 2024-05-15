## [5.0.7](https://github.com/podium-lib/utils/compare/v5.0.6...v5.0.7) (2024-05-15)


### Bug Fixes

* type context and view to Record instead of {} ([#238](https://github.com/podium-lib/utils/issues/238)) ([ab68b88](https://github.com/podium-lib/utils/commit/ab68b88e750f9314457d3b954ca3b954b8e44d61))

## [5.0.6](https://github.com/podium-lib/utils/compare/v5.0.5...v5.0.6) (2024-05-13)


### Bug Fixes

* add back generics to httpincoming ([#237](https://github.com/podium-lib/utils/issues/237)) ([4c70da7](https://github.com/podium-lib/utils/commit/4c70da7699e05321005575105ea3d99673b9a07d))

## [5.0.5](https://github.com/podium-lib/utils/compare/v5.0.4...v5.0.5) (2024-05-07)


### Bug Fixes

* include the types folder in the distributed package ([#236](https://github.com/podium-lib/utils/issues/236)) ([fcf16d0](https://github.com/podium-lib/utils/commit/fcf16d031e02a8b658dee625be1f174cc7a324ed))

## [5.0.4](https://github.com/podium-lib/utils/compare/v5.0.3...v5.0.4) (2024-04-23)


### Bug Fixes

* generate types from JSDoc ([#233](https://github.com/podium-lib/utils/issues/233)) ([53200f4](https://github.com/podium-lib/utils/commit/53200f44e5e6811e764d917ea46edff372f3939d))

## [5.0.3](https://github.com/podium-lib/utils/compare/v5.0.2...v5.0.3) (2024-04-11)


### Bug Fixes

* ensure html-template lang attribute works in both layout and podlet ([2545ac8](https://github.com/podium-lib/utils/commit/2545ac851bfa119a60508ea8152fa4cd2a2e5b3f))

## [5.0.2](https://github.com/podium-lib/utils/compare/v5.0.1...v5.0.2) (2024-02-01)


### Bug Fixes

* validate inputs when passing both async and defer ([#226](https://github.com/podium-lib/utils/issues/226)) ([dfb40d6](https://github.com/podium-lib/utils/commit/dfb40d69a19aa82debb8a32768603c3a32cee597))

## [5.0.1](https://github.com/podium-lib/utils/compare/v5.0.0...v5.0.1) (2023-12-07)


### Bug Fixes

* **deps:** update dependency camelcase to v8 ([4bb0483](https://github.com/podium-lib/utils/commit/4bb0483a98c888f2beaa6ec4bcf4b6f3541dae67))

# [5.0.0](https://github.com/podium-lib/utils/compare/v4.5.1...v5.0.0) (2023-11-28)


### Bug Fixes

* Improve ESM exports to account for dual module exports ([#123](https://github.com/podium-lib/utils/issues/123)) ([42ebb4f](https://github.com/podium-lib/utils/commit/42ebb4f3b560bd41fb15019654e60520cbb973a6))
* Point require export to main.js ([#122](https://github.com/podium-lib/utils/issues/122)) ([1438ee6](https://github.com/podium-lib/utils/commit/1438ee66eb04bdc289b8b8ba2a3f20b2f6311ea1))
* Remove original url module ([#185](https://github.com/podium-lib/utils/issues/185)) ([6c01c0f](https://github.com/podium-lib/utils/commit/6c01c0f44e3b24c7f481a2504003903529e8f80e))
* Simplify js and css value validation ([#70](https://github.com/podium-lib/utils/issues/70)) ([05a1ffc](https://github.com/podium-lib/utils/commit/05a1ffc17bce3249b349b218a9b5ea8585db5df8))


### Features

* Convert to ESM ([#119](https://github.com/podium-lib/utils/issues/119)) ([349c5b9](https://github.com/podium-lib/utils/commit/349c5b928726d8f808107ce4d0c0abfd1d15e937))
* Drop node 10.x support ([#67](https://github.com/podium-lib/utils/issues/67)) ([84203f8](https://github.com/podium-lib/utils/commit/84203f8ee2591b331aa52b2f70035b2a73f9d95e))
* Remove CJS build step ([#170](https://github.com/podium-lib/utils/issues/170)) ([15390ed](https://github.com/podium-lib/utils/commit/15390ed2185fe0e8bc28217a5fff4eb228694c7c))
* Use ES private properties instead of Symbols for privacy ([#72](https://github.com/podium-lib/utils/issues/72)) ([4083fa1](https://github.com/podium-lib/utils/commit/4083fa17301630d3669f8c819978fa2a99e5274d))


### BREAKING CHANGES

* Convert from CommonJS to ESM

* feat: convert to ESM

* fix: Remove outcommented code

* ci: Add build step for backward compat to CJS

* ci: Ignore linting dist directory

Co-authored-by: Trygve Lie <trygve.lie@finn.no>
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
* Only support node 12 and 14.

Co-authored-by: Trygve Lie <trygve.lie@finn.no>

# [5.0.0-next.10](https://github.com/podium-lib/utils/compare/v5.0.0-next.9...v5.0.0-next.10) (2023-11-20)


### Bug Fixes

* add missing functions to type definition ([b260c4f](https://github.com/podium-lib/utils/commit/b260c4f34ffb4b298e55144f7db2333ad2fe3bf5))
* correct typescript definitions for assets ([6b39222](https://github.com/podium-lib/utils/commit/6b392229f4a2ad254080c617990cb7faa457ac33))
* correctly build lazy load script tag html when asset strategy is lazy ([b1b2646](https://github.com/podium-lib/utils/commit/b1b264678fdd463eec009216a7119af1ea706ba1))
* **deps:** update dependency @podium/schemas to v4.1.33 ([8036aa7](https://github.com/podium-lib/utils/commit/8036aa7923f87cb4cbfadf06fb842bfe01fd10fd))
* **deps:** update dependency @podium/schemas to v4.1.34 ([a86e661](https://github.com/podium-lib/utils/commit/a86e661567043e8261e2565fd3489dc873b53b09))
* **deps:** update dependency @podium/schemas to v4.2.0 ([be92192](https://github.com/podium-lib/utils/commit/be92192ad2d0ce20ae4692f05110af87edb71ac7))
* make AssetCss and AssetJs constructable for TS ([f3f7fee](https://github.com/podium-lib/utils/commit/f3f7fee09a5f2310e087f7e022319d39a51d520f))
* mark params as optional ([51d84da](https://github.com/podium-lib/utils/commit/51d84dae08c30fe80d11d33adf4c740c572dd476))


### Features

* add strategy and scope fields to AssetCss and AssetJs classes ([5a8ecb1](https://github.com/podium-lib/utils/commit/5a8ecb17ec41f252016b004caef5f207f80ada35))
* update default document template to use asset strategy ([0688b03](https://github.com/podium-lib/utils/commit/0688b03821989263270d72b3a5833041f24ef46c))

## [4.5.1](https://github.com/podium-lib/utils/compare/v4.5.0...v4.5.1) (2023-11-19)

### Bug Fixes

-   correctly build lazy load script tag html when asset strategy is lazy ([b1b2646](https://github.com/podium-lib/utils/commit/b1b264678fdd463eec009216a7119af1ea706ba1))

# [4.5.0](https://github.com/podium-lib/utils/compare/v4.4.42...v4.5.0) (2023-11-16)

### Features

-   add strategy and scope fields to AssetCss and AssetJs classes ([5a8ecb1](https://github.com/podium-lib/utils/commit/5a8ecb17ec41f252016b004caef5f207f80ada35))
-   update default document template to use asset strategy ([0688b03](https://github.com/podium-lib/utils/commit/0688b03821989263270d72b3a5833041f24ef46c))

# [5.0.0-next.9](https://github.com/podium-lib/utils/compare/v5.0.0-next.8...v5.0.0-next.9) (2022-10-09)

### Bug Fixes

-   Remove original url module ([#185](https://github.com/podium-lib/utils/issues/185)) ([6c01c0f](https://github.com/podium-lib/utils/commit/6c01c0f44e3b24c7f481a2504003903529e8f80e))

# [5.0.0-next.8](https://github.com/podium-lib/utils/compare/v5.0.0-next.7...v5.0.0-next.8) (2022-05-04)

### Features

-   Remove CJS build step ([#170](https://github.com/podium-lib/utils/issues/170)) ([15390ed](https://github.com/podium-lib/utils/commit/15390ed2185fe0e8bc28217a5fff4eb228694c7c))

# [5.0.0-next.7](https://github.com/podium-lib/utils/compare/v5.0.0-next.6...v5.0.0-next.7) (2022-05-03)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.16 ([c47f0bf](https://github.com/podium-lib/utils/commit/c47f0bf348d75f46af1f8dc8445bcd57ac84f586))
-   **deps:** update dependency @podium/schemas to v4.1.17 ([b45e56d](https://github.com/podium-lib/utils/commit/b45e56d2811e0d46ac4280770988603c3bc9e3ff))
-   **deps:** update dependency @podium/schemas to v4.1.18 ([21ef50a](https://github.com/podium-lib/utils/commit/21ef50a5544162b5d43d718ddc56ac1169fa58d7))
-   **deps:** update dependency @podium/schemas to v4.1.19 ([3a4f6a8](https://github.com/podium-lib/utils/commit/3a4f6a8c7e463b1cabe75b4a21c51184387df34f))
-   **deps:** update dependency @podium/schemas to v4.1.20 ([7d9955b](https://github.com/podium-lib/utils/commit/7d9955b07c64696a0c90ac0053243b6a871e0b29))
-   **deps:** update dependency @podium/schemas to v4.1.21 ([cebdc13](https://github.com/podium-lib/utils/commit/cebdc13250d1a01b1642cc7ab4e5b2d16467620d))
-   **deps:** update dependency @podium/schemas to v4.1.22 ([15d8ea9](https://github.com/podium-lib/utils/commit/15d8ea95e7254bbe4a38061a64bd5b919d777137))
-   **deps:** update dependency @podium/schemas to v4.1.23 ([c18698a](https://github.com/podium-lib/utils/commit/c18698ae56056a0a51e5789de496cc46869099a8))
-   **deps:** update dependency @podium/schemas to v4.1.24 ([35c41c7](https://github.com/podium-lib/utils/commit/35c41c75b91dd64b4857c9604f005b013e1203d7))
-   **deps:** update dependency @podium/schemas to v4.1.25 ([27b8507](https://github.com/podium-lib/utils/commit/27b8507b83f33d83de5cf196df1f4bae92edff20))
-   **deps:** update dependency @podium/schemas to v4.1.26 ([961e0e0](https://github.com/podium-lib/utils/commit/961e0e074b62d7c933041538c42a31e58d297447))
-   **deps:** update dependency @podium/schemas to v4.1.27 ([72d4596](https://github.com/podium-lib/utils/commit/72d4596342a45c334ed5f85c27b773595067e959))
-   **deps:** update dependency @podium/schemas to v4.1.28 ([b3d9275](https://github.com/podium-lib/utils/commit/b3d92754653ccb19d6e8cd2b539c2b9675ce11c8))
-   **deps:** update dependency @podium/schemas to v4.1.29 ([cc43020](https://github.com/podium-lib/utils/commit/cc43020c5ef039612671fdc559181b981dbdb313))
-   **deps:** update dependency @podium/schemas to v4.1.30 ([3a390ce](https://github.com/podium-lib/utils/commit/3a390cefe5fa96a75d694c62b2c24ef369a4d9bb))
-   **deps:** update dependency @podium/schemas to v4.1.31 ([2f67490](https://github.com/podium-lib/utils/commit/2f6749053d4502ddb1c17283f96eb17085627d2d))
-   **deps:** update dependency @podium/schemas to v4.1.32 ([0322287](https://github.com/podium-lib/utils/commit/03222876be6996552dd86d1f190dac20e51bccd2))
-   **deps:** update dependency camelcase to v6.2.1 ([2f9a3e3](https://github.com/podium-lib/utils/commit/2f9a3e3460c1f6a2aa57b6535e93039133c0822e))
-   **deps:** update dependency camelcase to v6.3.0 ([fee3e49](https://github.com/podium-lib/utils/commit/fee3e492813aa464ba7e3cd7d0a4a8359a108c17))
-   Do not allow origin as a pathname value ([#143](https://github.com/podium-lib/utils/issues/143)) ([ff9785d](https://github.com/podium-lib/utils/commit/ff9785d3e7c4fdfcf9b535a24b59141aed9d55b5))

# [5.0.0-next.6](https://github.com/podium-lib/utils/compare/v5.0.0-next.5...v5.0.0-next.6) (2021-04-30)

### Bug Fixes

* Improve ESM exports to account for dual module exports ([#123](https://github.com/podium-lib/utils/issues/123)) ([42ebb4f](https://github.com/podium-lib/utils/commit/42ebb4f3b560bd41fb15019654e60520cbb973a6))

## [4.4.42](https://github.com/podium-lib/utils/compare/v4.4.41...v4.4.42) (2023-11-16)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.2.0 ([be92192](https://github.com/podium-lib/utils/commit/be92192ad2d0ce20ae4692f05110af87edb71ac7))

## [4.4.41](https://github.com/podium-lib/utils/compare/v4.4.40...v4.4.41) (2023-10-19)

### Bug Fixes

-   add missing functions to type definition ([b260c4f](https://github.com/podium-lib/utils/commit/b260c4f34ffb4b298e55144f7db2333ad2fe3bf5))

## [4.4.40](https://github.com/podium-lib/utils/compare/v4.4.39...v4.4.40) (2023-10-09)

### Bug Fixes

-   make AssetCss and AssetJs constructable for TS ([f3f7fee](https://github.com/podium-lib/utils/commit/f3f7fee09a5f2310e087f7e022319d39a51d520f))
-   mark params as optional ([51d84da](https://github.com/podium-lib/utils/commit/51d84dae08c30fe80d11d33adf4c740c572dd476))

## [4.4.39](https://github.com/podium-lib/utils/compare/v4.4.38...v4.4.39) (2023-01-04)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.34 ([a86e661](https://github.com/podium-lib/utils/commit/a86e661567043e8261e2565fd3489dc873b53b09))

## [4.4.38](https://github.com/podium-lib/utils/compare/v4.4.37...v4.4.38) (2022-12-07)

### Bug Fixes

-   correct typescript definitions for assets ([6b39222](https://github.com/podium-lib/utils/commit/6b392229f4a2ad254080c617990cb7faa457ac33))

## [4.4.37](https://github.com/podium-lib/utils/compare/v4.4.36...v4.4.37) (2022-11-14)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.33 ([8036aa7](https://github.com/podium-lib/utils/commit/8036aa7923f87cb4cbfadf06fb842bfe01fd10fd))

## [4.4.36](https://github.com/podium-lib/utils/compare/v4.4.35...v4.4.36) (2022-03-23)

### Bug Fixes

-   Improve ESM exports to account for dual module exports ([#123](https://github.com/podium-lib/utils/issues/123)) ([42ebb4f](https://github.com/podium-lib/utils/commit/42ebb4f3b560bd41fb15019654e60520cbb973a6))

# [5.0.0-next.5](https://github.com/podium-lib/utils/compare/v5.0.0-next.4...v5.0.0-next.5) (2021-04-27)

### Bug Fixes

* Point require export to main.js ([#122](https://github.com/podium-lib/utils/issues/122)) ([1438ee6](https://github.com/podium-lib/utils/commit/1438ee66eb04bdc289b8b8ba2a3f20b2f6311ea1))


## [4.4.35](https://github.com/podium-lib/utils/compare/v4.4.34...v4.4.35) (2022-02-05)

### Bug Fixes

-   Point require export to main.js ([#122](https://github.com/podium-lib/utils/issues/122)) ([1438ee6](https://github.com/podium-lib/utils/commit/1438ee66eb04bdc289b8b8ba2a3f20b2f6311ea1))

## [4.4.34](https://github.com/podium-lib/utils/compare/v4.4.33...v4.4.34) (2022-01-15)

### Bug Fixes

* **deps:** update dependency @podium/schemas to v4.1.30 ([3a390ce](https://github.com/podium-lib/utils/commit/3a390cefe5fa96a75d694c62b2c24ef369a4d9bb))

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

-   Use ES private properties instead of Symbols for privacy ([#72](https://github.com/podium-lib/utils/issues/72)) ([4083fa1](https://github.com/podium-lib/utils/commit/4083fa17301630d3669f8c819978fa2a99e5274d))

### BREAKING CHANGES

-   Due to dropping node 10.x support we use ES private properties instead of Symbols.

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

### Bug Fixes

* Simplify js and css value validation ([#70](https://github.com/podium-lib/utils/issues/70)) ([05a1ffc](https://github.com/podium-lib/utils/commit/05a1ffc17bce3249b349b218a9b5ea8585db5df8))

## [4.4.33](https://github.com/podium-lib/utils/compare/v4.4.32...v4.4.33) (2022-01-01)

### Bug Fixes

-   **deps:** update dependency camelcase to v6.3.0 ([fee3e49](https://github.com/podium-lib/utils/commit/fee3e492813aa464ba7e3cd7d0a4a8359a108c17))

## [4.4.32](https://github.com/podium-lib/utils/compare/v4.4.31...v4.4.32) (2021-11-22)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.29 ([cc43020](https://github.com/podium-lib/utils/commit/cc43020c5ef039612671fdc559181b981dbdb313))

## [4.4.31](https://github.com/podium-lib/utils/compare/v4.4.30...v4.4.31) (2021-11-17)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.28 ([b3d9275](https://github.com/podium-lib/utils/commit/b3d92754653ccb19d6e8cd2b539c2b9675ce11c8))

## [4.4.30](https://github.com/podium-lib/utils/compare/v4.4.29...v4.4.30) (2021-11-15)

### Bug Fixes

-   **deps:** update dependency camelcase to v6.2.1 ([2f9a3e3](https://github.com/podium-lib/utils/commit/2f9a3e3460c1f6a2aa57b6535e93039133c0822e))

## [4.4.29](https://github.com/podium-lib/utils/compare/v4.4.28...v4.4.29) (2021-11-14)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.27 ([72d4596](https://github.com/podium-lib/utils/commit/72d4596342a45c334ed5f85c27b773595067e959))

## [4.4.28](https://github.com/podium-lib/utils/compare/v4.4.27...v4.4.28) (2021-11-09)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.26 ([961e0e0](https://github.com/podium-lib/utils/commit/961e0e074b62d7c933041538c42a31e58d297447))

## [4.4.27](https://github.com/podium-lib/utils/compare/v4.4.26...v4.4.27) (2021-10-26)

### Bug Fixes

-   Do not allow origin as a pathname value ([#143](https://github.com/podium-lib/utils/issues/143)) ([ff9785d](https://github.com/podium-lib/utils/commit/ff9785d3e7c4fdfcf9b535a24b59141aed9d55b5))

## [4.4.26](https://github.com/podium-lib/utils/compare/v4.4.25...v4.4.26) (2021-09-13)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.25 ([27b8507](https://github.com/podium-lib/utils/commit/27b8507b83f33d83de5cf196df1f4bae92edff20))

## [4.4.25](https://github.com/podium-lib/utils/compare/v4.4.24...v4.4.25) (2021-08-14)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.24 ([35c41c7](https://github.com/podium-lib/utils/commit/35c41c75b91dd64b4857c9604f005b013e1203d7))

## [4.4.24](https://github.com/podium-lib/utils/compare/v4.4.23...v4.4.24) (2021-07-15)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.23 ([c18698a](https://github.com/podium-lib/utils/commit/c18698ae56056a0a51e5789de496cc46869099a8))

## [4.4.23](https://github.com/podium-lib/utils/compare/v4.4.22...v4.4.23) (2021-07-04)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.22 ([15d8ea9](https://github.com/podium-lib/utils/commit/15d8ea95e7254bbe4a38061a64bd5b919d777137))

## [4.4.22](https://github.com/podium-lib/utils/compare/v4.4.21...v4.4.22) (2021-06-06)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.21 ([cebdc13](https://github.com/podium-lib/utils/commit/cebdc13250d1a01b1642cc7ab4e5b2d16467620d))

## [4.4.21](https://github.com/podium-lib/utils/compare/v4.4.20...v4.4.21) (2021-05-24)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.20 ([7d9955b](https://github.com/podium-lib/utils/commit/7d9955b07c64696a0c90ac0053243b6a871e0b29))

## [4.4.20](https://github.com/podium-lib/utils/compare/v4.4.19...v4.4.20) (2021-05-14)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.19 ([3a4f6a8](https://github.com/podium-lib/utils/commit/3a4f6a8c7e463b1cabe75b4a21c51184387df34f))

## [4.4.19](https://github.com/podium-lib/utils/compare/v4.4.18...v4.4.19) (2021-05-09)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.18 ([21ef50a](https://github.com/podium-lib/utils/commit/21ef50a5544162b5d43d718ddc56ac1169fa58d7))

## [4.4.18](https://github.com/podium-lib/utils/compare/v4.4.17...v4.4.18) (2021-05-05)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.17 ([b45e56d](https://github.com/podium-lib/utils/commit/b45e56d2811e0d46ac4280770988603c3bc9e3ff))

## [4.4.17](https://github.com/podium-lib/utils/compare/v4.4.16...v4.4.17) (2021-04-27)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.16 ([c47f0bf](https://github.com/podium-lib/utils/commit/c47f0bf348d75f46af1f8dc8445bcd57ac84f586))

## [4.4.16](https://github.com/podium-lib/utils/compare/v4.4.15...v4.4.16) (2021-04-11)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.15 ([446458c](https://github.com/podium-lib/utils/commit/446458c6bd75e2ca8efd21d37107188a7146cd1e))

## [4.4.15](https://github.com/podium-lib/utils/compare/v4.4.14...v4.4.15) (2021-04-02)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.14 ([0deb0d0](https://github.com/podium-lib/utils/commit/0deb0d0ffa14735d6a1e850291322bb670eb5436))

## [4.4.14](https://github.com/podium-lib/utils/compare/v4.4.13...v4.4.14) (2021-04-02)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.13 ([f677772](https://github.com/podium-lib/utils/commit/f6777726c06362b1de6acf1e613db1b0928456ba))

## [4.4.13](https://github.com/podium-lib/utils/compare/v4.4.12...v4.4.13) (2021-04-01)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.10 ([5a10235](https://github.com/podium-lib/utils/commit/5a10235b74a5faa7fc9cf65efc7aab69883f6781))
-   **deps:** update dependency @podium/schemas to v4.1.11 ([20941c6](https://github.com/podium-lib/utils/commit/20941c6912b60a4dd3c654a3e674589a0713ae30))

## [4.4.12](https://github.com/podium-lib/utils/compare/v4.4.11...v4.4.12) (2021-03-30)

### Bug Fixes

-   Update @podium/schema to version 4.1.9 to fix ajv error ([#110](https://github.com/podium-lib/utils/issues/110)) ([08ee7df](https://github.com/podium-lib/utils/commit/08ee7dfa6bc8b413bb8ee12dd778606f0c6c04e4))

## [4.4.11](https://github.com/podium-lib/utils/compare/v4.4.10...v4.4.11) (2021-03-27)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.8 ([c8fde78](https://github.com/podium-lib/utils/commit/c8fde78758d7a6e36e90d37d066f11806ffad885))

## [4.4.10](https://github.com/podium-lib/utils/compare/v4.4.9...v4.4.10) (2021-03-26)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.7 ([9eac72d](https://github.com/podium-lib/utils/commit/9eac72dc56b584ddfe9343757429f1b7daea86f3))

## [4.4.9](https://github.com/podium-lib/utils/compare/v4.4.8...v4.4.9) (2021-03-20)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.6 ([f92062c](https://github.com/podium-lib/utils/commit/f92062c4d3d403aef90978efce41e554645b97b2))

## [4.4.8](https://github.com/podium-lib/utils/compare/v4.4.7...v4.4.8) (2021-03-08)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.5 ([d920dab](https://github.com/podium-lib/utils/commit/d920dabf5f3ad3f5d55f3da204f01f36b83a1e17))

## [4.4.7](https://github.com/podium-lib/utils/compare/v4.4.6...v4.4.7) (2021-03-07)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.4 ([4cb9bb6](https://github.com/podium-lib/utils/commit/4cb9bb65c6da0cc56bbb96b9f9555ce3067a1359))

## [4.4.6](https://github.com/podium-lib/utils/compare/v4.4.5...v4.4.6) (2021-02-17)

### Bug Fixes

-   Simplify js and css value validation ([#70](https://github.com/podium-lib/utils/issues/70)) ([05a1ffc](https://github.com/podium-lib/utils/commit/05a1ffc17bce3249b349b218a9b5ea8585db5df8))

# [5.0.0-next.1](https://github.com/podium-lib/utils/compare/v4.3.0...v5.0.0-next.1) (2020-07-12)

### Features

* Drop node 10.x support ([#67](https://github.com/podium-lib/utils/issues/67)) ([84203f8](https://github.com/podium-lib/utils/commit/84203f8ee2591b331aa52b2f70035b2a73f9d95e))

### BREAKING CHANGES

* Only support node 12 and 14.

Co-authored-by: Trygve Lie <trygve.lie@finn.no>

## [4.4.5](https://github.com/podium-lib/utils/compare/v4.4.4...v4.4.5) (2021-02-11)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.2 ([04c7b1b](https://github.com/podium-lib/utils/commit/04c7b1be013fb6be5b6a1d5a18f2a12946f0273f))

## [4.4.4](https://github.com/podium-lib/utils/compare/v4.4.3...v4.4.4) (2021-02-02)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.1 ([f2cc938](https://github.com/podium-lib/utils/commit/f2cc93840039fc47cac7e9ef2cd95dbb1395c8e5))

## [4.4.3](https://github.com/podium-lib/utils/compare/v4.4.2...v4.4.3) (2021-01-22)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.1.0 ([4ff5fe9](https://github.com/podium-lib/utils/commit/4ff5fe9ea31c7e999d953ca5acb5bd6417dbf3c5))

## [4.4.2](https://github.com/podium-lib/utils/compare/v4.4.1...v4.4.2) (2021-01-21)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.0.7 ([cbded99](https://github.com/podium-lib/utils/commit/cbded9938631209d7d1c3da3bf7600379d0524dc))

## [4.4.1](https://github.com/podium-lib/utils/compare/v4.4.0...v4.4.1) (2020-10-28)

### Bug Fixes

-   **deps:** update dependency camelcase to v6.2.0 ([3e9dec9](https://github.com/podium-lib/utils/commit/3e9dec90c4d511b5d6abe1360bf9a1a8195d2833))

# [4.4.0](https://github.com/podium-lib/utils/compare/v4.3.3...v4.4.0) (2020-10-12)

### Features

-   Drop node 10.x support ([#67](https://github.com/podium-lib/utils/issues/67)) ([84203f8](https://github.com/podium-lib/utils/commit/84203f8ee2591b331aa52b2f70035b2a73f9d95e))

### BREAKING CHANGES

-   Only support node 12 and 14.

Co-authored-by: Trygve Lie <trygve.lie@finn.no>

-   add .buildReactLinkAttributes and .buildReactScriptAttributes methods ([ffb0bff](https://github.com/podium-lib/utils/commit/ffb0bff96a998694cb7102e0f9dc14c943914f7a))
-   add .toReactAttrs() method to AssetJs and AssetCss classes and integration tests ([7ab097f](https://github.com/podium-lib/utils/commit/7ab097f51d48001c884eb734eb823b0516e2eb24))

## [4.3.3](https://github.com/podium-lib/utils/compare/v4.3.2...v4.3.3) (2020-10-10)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.0.5 ([9bf1a14](https://github.com/podium-lib/utils/commit/9bf1a1491a59d17b4715e06fd3692ba8f1907ffa))

## [4.3.2](https://github.com/podium-lib/utils/compare/v4.3.1...v4.3.2) (2020-10-10)

### Bug Fixes

-   **deps:** update dependency camelcase to v6.1.0 ([ef22149](https://github.com/podium-lib/utils/commit/ef2214918172d1b6044b72f44771c7fb22f5aa77))

## [4.3.1](https://github.com/podium-lib/utils/compare/v4.3.0...v4.3.1) (2020-09-13)

### Bug Fixes

-   **deps:** update dependency @podium/schemas to v4.0.4 ([5ff49c0](https://github.com/podium-lib/utils/commit/5ff49c02e0999b2e7c105caad93f626d518d686f))

# [4.3.0](https://github.com/podium-lib/utils/compare/v4.2.5...v4.3.0) (2020-06-26)

### Features

-   support data attributes on javascript assets ([#61](https://github.com/podium-lib/utils/issues/61)) ([9f418b2](https://github.com/podium-lib/utils/commit/9f418b2d04ce7bb04fcfe6e1e1c9cf7de6d50107))

# Changelog

Notable changes to this project.

The latest version of this document is always available in [releases][releases-url].

## [Unreleased]

## [3.1.2] - 2019-03-21

-   Improved performance of HttpIncoming - [#6](https://github.com/podium-lib/utils/pull/6)

## [3.1.1] - 2019-02-07

-   Initial open source release.

[unreleased]: https://github.com/podium-lib/utils/compare/v3.1.2...HEAD
[3.1.2]: https://github.com/podium-lib/utils/releases/tag/v3.1.2
[3.1.1]: https://github.com/podium-lib/utils/releases/tag/v3.1.1
[releases-url]: https://github.com/podium-lib/utils/blob/master/CHANGELOG.md

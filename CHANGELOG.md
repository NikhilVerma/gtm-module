# Changelog


## v1.1.3

[compare changes](https://github.com/your-org/my-module/compare/v1.1.2...v1.1.3)

## v1.1.2

[compare changes](https://github.com/your-org/my-module/compare/v1.1.0...v1.1.2)

## v1.1.0


### 🚀 Enhancements

- Initial commit for v2 ([aeba6da](https://github.com/your-org/my-module/commit/aeba6da))
- Allow manually init with multiple ids (closes #1, #4, #5) ([#1](https://github.com/your-org/my-module/issues/1), [#4](https://github.com/your-org/my-module/issues/4), [#5](https://github.com/your-org/my-module/issues/5))
- Ssr support ([d896618](https://github.com/your-org/my-module/commit/d896618))
- Ssr iframe injection ([d678f16](https://github.com/your-org/my-module/commit/d678f16))
- Push page title to dataLayer ([#8](https://github.com/your-org/my-module/pull/8))
- Enable noscript by default ([f511404](https://github.com/your-org/my-module/commit/f511404))
- Use mock version for nuxt dev ([ec85699](https://github.com/your-org/my-module/commit/ec85699))
- Require nuxt > 2.12 to avoid ssr memory leak ([43f41c8](https://github.com/your-org/my-module/commit/43f41c8))
- **plugin:** Add `debug` option and disable by default ([#61](https://github.com/your-org/my-module/pull/61))
- **module:** Add support for runtimeConfig ([#53](https://github.com/your-org/my-module/pull/53))
- Support `crossOrigin` option ([#78](https://github.com/your-org/my-module/pull/78))

### 🔥 Performance

- Add single IIFE wrapper to the final script ([b038fde](https://github.com/your-org/my-module/commit/b038fde))

### 🩹 Fixes

- Guard against double script executation ([#3](https://github.com/your-org/my-module/pull/3))
- Prevent calling init with initial id when autoInit enabled ([24744a5](https://github.com/your-org/my-module/commit/24744a5))
- Add id to noscript iframe ([b345db7](https://github.com/your-org/my-module/commit/b345db7))
- PageTitle is not available on SSR ([228d796](https://github.com/your-org/my-module/commit/228d796))
- Call startPageTracking on client only ([774fccf](https://github.com/your-org/my-module/commit/774fccf))
- Always render noscript block ([a921b42](https://github.com/your-org/my-module/commit/a921b42))
- **module:** Warn about head as a function in nuxt config is not supported ([#14](https://github.com/your-org/my-module/pull/14))
- Prepend `router.base` when sending page track events ([#20](https://github.com/your-org/my-module/pull/20))
- Check respectDoNotTrack option value ([#37](https://github.com/your-org/my-module/pull/37))
- **plugin:** Find head script ([#59](https://github.com/your-org/my-module/pull/59))
- **plugin:** Load SSR events before container loaded ([#51](https://github.com/your-org/my-module/pull/51))
- **module:** Allow client side push before init ([#60](https://github.com/your-org/my-module/pull/60))
- Fix doNotTrack polyfill ([#87](https://github.com/your-org/my-module/pull/87))
- **plugin.mock:** Handle `event.eventCallback` ([#76](https://github.com/your-org/my-module/pull/76))

### 📖 Documentation

- Improve manual init section ([c429490](https://github.com/your-org/my-module/commit/c429490))
- **setup:** Specify as a runtime module ([#57](https://github.com/your-org/my-module/pull/57))
- **readme:** Add missing runtimeConfig notes ([#63](https://github.com/your-org/my-module/pull/63))
- Missing single quote ([#64](https://github.com/your-org/my-module/pull/64))

### 🏡 Chore

- Fix typo in reeadme ([0b49392](https://github.com/your-org/my-module/commit/0b49392))
- **release:** 2.0.0 ([633f01c](https://github.com/your-org/my-module/commit/633f01c))
- Update readme ([db1538a](https://github.com/your-org/my-module/commit/db1538a))
- Fix repo meta ([85a2f25](https://github.com/your-org/my-module/commit/85a2f25))
- **release:** 2.0.1 ([976385b](https://github.com/your-org/my-module/commit/976385b))
- Use a working gtm id ([5a345a5](https://github.com/your-org/my-module/commit/5a345a5))
- **release:** 2.1.0 ([9da2ea4](https://github.com/your-org/my-module/commit/9da2ea4))
- **release:** 2.1.1 ([bf48776](https://github.com/your-org/my-module/commit/bf48776))
- Enable noscript on demo ([da0ae44](https://github.com/your-org/my-module/commit/da0ae44))
- **release:** 2.2.0 ([126da1a](https://github.com/your-org/my-module/commit/126da1a))
- Add gtm plugin to demo ([c09ecd0](https://github.com/your-org/my-module/commit/c09ecd0))
- Remove warning when no id provided ([6705729](https://github.com/your-org/my-module/commit/6705729))
- Improve docs ([a5c6a9b](https://github.com/your-org/my-module/commit/a5c6a9b))
- **release:** 2.2.1 ([0fcddfa](https://github.com/your-org/my-module/commit/0fcddfa))
- **release:** 2.2.2 ([1aee35c](https://github.com/your-org/my-module/commit/1aee35c))
- Add notice about SSR usage known issue ([eb3eb1c](https://github.com/your-org/my-module/commit/eb3eb1c))
- **release:** 2.2.3 ([9b6f9e3](https://github.com/your-org/my-module/commit/9b6f9e3))
- Fix typo in readme ([6c4f08d](https://github.com/your-org/my-module/commit/6c4f08d))
- Improve readme ([d2fa3c0](https://github.com/your-org/my-module/commit/d2fa3c0))
- Update repo ([559814c](https://github.com/your-org/my-module/commit/559814c))
- **ci:** Use github actions ([58a88db](https://github.com/your-org/my-module/commit/58a88db))
- Update badges ([e3e810e](https://github.com/your-org/my-module/commit/e3e810e))
- Update badge ([85852c3](https://github.com/your-org/my-module/commit/85852c3))
- **release:** 2.3.0 ([c86c9ca](https://github.com/your-org/my-module/commit/c86c9ca))
- **release:** 2.3.1 ([4894d7c](https://github.com/your-org/my-module/commit/4894d7c))
- **release:** 2.3.2 ([35d392b](https://github.com/your-org/my-module/commit/35d392b))
- **release:** 2.4.0 ([ae9199e](https://github.com/your-org/my-module/commit/ae9199e))

### ✅ Tests

- Add module unit tests ([#2](https://github.com/your-org/my-module/pull/2))
- Don't duplicate almost identical tests for spa/universal ([#19](https://github.com/your-org/my-module/pull/19))

### ❤️ Contributors

- Pooya Parsa <pyapar@gmail.com>
- Dmitry Molotkov ([@aldarund](http://github.com/aldarund))
- Dmytro 
- Tim Yao 
- Lucien144 <honza@lucien144.net>
- Antonio Eduardo <aeta_jr2@hotmail.com>
- Gábor Egyed <gabor.egyed@gmail.com>
- Rafał Chłodnicki ([@rchl](http://github.com/rchl))
- Ali Soltani 
- Alexander Lichter <manniL@gmx.net>
- Tsuyoshi Yamaguchi <ronoya442@gmail.com>
- Jeong, MyoungHak ([@hagi4u](http://github.com/hagi4u))
- Okunev Denis ([@Manfies](http://github.com/Manfies))
- Sebastian Kinzlinger <webmarken@gmail.com>


# Changelog

## [v3.1.1](https://github.com/feathersjs/feathers-sync/tree/v3.1.1) (2025-01-06)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v3.1.0...v3.1.1)

**Merged pull requests:**

- fix\\(amqp\\): remove event listener when channel is closed [\\#203](https://github.com/feathersjs/feathers-sync/pull/203) ([daffl](https://github.com/daffl))
- chore: Update all dependencies [\\#205](https://github.com/feathersjs/feathers-sync/pull/205) ([daffl](https://github.com/daffl))
- chore: Update all dependencies [\\#204](https://github.com/feathersjs/feathers-sync/pull/204) ([daffl](https://github.com/daffl))

## [v3.1.0](https://github.com/feathersjs/feathers-sync/tree/v3.1.0) (2025-06-24)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v3.0.3...v3.1.0)

**Closed issues:**

- Feathers sync does not respect the built-in reconnection strategy in node-redis [\#194](https://github.com/feathersjs/feathers-sync/issues/194)
- Determine if event is a synced event [\#193](https://github.com/feathersjs/feathers-sync/issues/193)

**Merged pull requests:**

- fix: Clone Redis error handlers [\#201](https://github.com/feathersjs/feathers-sync/pull/201) ([daffl](https://github.com/daffl))
- feat: Update all dependencies [\#200](https://github.com/feathersjs/feathers-sync/pull/200) ([daffl](https://github.com/daffl))
- fix\(redis\): fix debug message for redis uri [\#192](https://github.com/feathersjs/feathers-sync/pull/192) ([green3g](https://github.com/green3g))

## [v3.0.3](https://github.com/feathersjs/feathers-sync/tree/v3.0.3) (2023-04-07)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v3.0.2...v3.0.3)

**Closed issues:**

- describe.only causing tests to be skipped [\#188](https://github.com/feathersjs/feathers-sync/issues/188)
- TypeError: Cannot read properties of undefined \(reading 'toJSON'\) [\#186](https://github.com/feathersjs/feathers-sync/issues/186)

**Merged pull requests:**

- fix: Make sure all tests run [\#189](https://github.com/feathersjs/feathers-sync/pull/189) ([daffl](https://github.com/daffl))
- fix: check context before context.toJSON [\#187](https://github.com/feathersjs/feathers-sync/pull/187) ([palmtown](https://github.com/palmtown))
- fix: Call context.toJSON if available [\#185](https://github.com/feathersjs/feathers-sync/pull/185) ([daffl](https://github.com/daffl))

## [v3.0.2](https://github.com/feathersjs/feathers-sync/tree/v3.0.2) (2023-02-22)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v3.0.1...v3.0.2)

**Closed issues:**

- On V5 Dove, service details missing in calls [\#184](https://github.com/feathersjs/feathers-sync/issues/184)
- Feathers-sync Redis Adapter with an existing Redis Sentinel client and Feathers-Socket.io [\#182](https://github.com/feathersjs/feathers-sync/issues/182)
- High RAM usage when large files are uploaded [\#181](https://github.com/feathersjs/feathers-sync/issues/181)
- startup errors after update to 3.0.0 with redis adapter [\#178](https://github.com/feathersjs/feathers-sync/issues/178)
- bson - cyclic dependency detected  [\#168](https://github.com/feathersjs/feathers-sync/issues/168)

## [v3.0.1](https://github.com/feathersjs/feathers-sync/tree/v3.0.1) (2022-03-15)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v3.0.0...v3.0.1)

**Merged pull requests:**

- Subscribe to Redis messages after Redis client connects. Subscribing … [\#180](https://github.com/feathersjs/feathers-sync/pull/180) ([babysealclubber](https://github.com/babysealclubber))
- chore\(dependencies\): Update all dependencies [\#177](https://github.com/feathersjs/feathers-sync/pull/177) ([daffl](https://github.com/daffl))

## [v3.0.0](https://github.com/feathersjs/feathers-sync/tree/v3.0.0) (2022-01-27)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v2.4.0...v3.0.0)

**Closed issues:**

- Custom events do not get broadcasted to other servers [\#173](https://github.com/feathersjs/feathers-sync/issues/173)
- \[Help Wanted\] Events are not sent to all instances always [\#165](https://github.com/feathersjs/feathers-sync/issues/165)
- Update nats major version [\#163](https://github.com/feathersjs/feathers-sync/issues/163)

**Merged pull requests:**

- Update to Redis 4 client and other latest dependencies [\#176](https://github.com/feathersjs/feathers-sync/pull/176) ([daffl](https://github.com/daffl))
- NATS 2.0 [\#175](https://github.com/feathersjs/feathers-sync/pull/175) ([ViljarVoidula](https://github.com/ViljarVoidula))
- chore\(dependencies\): Update all dependencies [\#171](https://github.com/feathersjs/feathers-sync/pull/171) ([daffl](https://github.com/daffl))
- Update plugin infrastructure and dependencies [\#169](https://github.com/feathersjs/feathers-sync/pull/169) ([daffl](https://github.com/daffl))

## [v2.4.0](https://github.com/feathersjs/feathers-sync/tree/v2.4.0) (2021-07-05)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v2.3.0...v2.4.0)

**Closed issues:**

- Needs update for Feathers v5 [\#166](https://github.com/feathersjs/feathers-sync/issues/166)
- Issue with Google oAuth [\#164](https://github.com/feathersjs/feathers-sync/issues/164)

**Merged pull requests:**

- Add compatibility for v5 and update dependencies [\#167](https://github.com/feathersjs/feathers-sync/pull/167) ([daffl](https://github.com/daffl))

## [v2.3.0](https://github.com/feathersjs/feathers-sync/tree/v2.3.0) (2021-03-19)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v2.2.0...v2.3.0)

**Implemented enhancements:**

- \[Feature Request\] Add retry mechanism [\#143](https://github.com/feathersjs/feathers-sync/issues/143)

**Merged pull requests:**

- chore: Migrate to async/await and require Node 12 or later [\#161](https://github.com/feathersjs/feathers-sync/pull/161) ([daffl](https://github.com/daffl))
- \[\#143\] amqp retry mechanism [\#160](https://github.com/feathersjs/feathers-sync/pull/160) ([fragilehm](https://github.com/fragilehm))

## [v2.2.0](https://github.com/feathersjs/feathers-sync/tree/v2.2.0) (2021-01-24)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v2.1.0...v2.2.0)

**Implemented enhancements:**

- Add adapter for MongoDB [\#136](https://github.com/feathersjs/feathers-sync/issues/136)

**Closed issues:**

- Infinite Loop with Alias Services [\#153](https://github.com/feathersjs/feathers-sync/issues/153)
- Only send sync events but not receive from other apps [\#148](https://github.com/feathersjs/feathers-sync/issues/148)
- Feather Context not updated on Horizontal scaling. [\#147](https://github.com/feathersjs/feathers-sync/issues/147)

**Merged pull requests:**

- Add TypeScript typings [\#159](https://github.com/feathersjs/feathers-sync/pull/159) ([daffl](https://github.com/daffl))
- Duplicate redisClient \(bug fix\) \* Customize subscriber event [\#158](https://github.com/feathersjs/feathers-sync/pull/158) ([dubiousdavid](https://github.com/dubiousdavid))
- Update all dependencies and fix AQMP test timeout [\#157](https://github.com/feathersjs/feathers-sync/pull/157) ([daffl](https://github.com/daffl))
- Finalize NATS support [\#156](https://github.com/feathersjs/feathers-sync/pull/156) ([daffl](https://github.com/daffl))
- Fix loop when initializing twice [\#154](https://github.com/feathersjs/feathers-sync/pull/154) ([mrfrase3](https://github.com/mrfrase3))
- chore\(ci\): Move CI to Github actions [\#152](https://github.com/feathersjs/feathers-sync/pull/152) ([daffl](https://github.com/daffl))
- chore\(release\): Initial setup for semantic-release [\#151](https://github.com/feathersjs/feathers-sync/pull/151) ([daffl](https://github.com/daffl))

## [v2.1.0](https://github.com/feathersjs/feathers-sync/tree/v2.1.0) (2020-04-09)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v2.0.0...v2.1.0)

**Closed issues:**

- An in-range update of @feathersjs/feathers is breaking the build 🚨 [\#145](https://github.com/feathersjs/feathers-sync/issues/145)
- An in-range update of @feathersjs/feathers is breaking the build 🚨 [\#141](https://github.com/feathersjs/feathers-sync/issues/141)
- custom adapters app.sync.serialize is not a function [\#137](https://github.com/feathersjs/feathers-sync/issues/137)
- TypeError: app.service\(...\).publish is not a function [\#131](https://github.com/feathersjs/feathers-sync/issues/131)

**Merged pull requests:**

- Added support for using an existing Redis Client instead of creating … [\#146](https://github.com/feathersjs/feathers-sync/pull/146) ([fbarzin](https://github.com/fbarzin))
- Update redis to the latest version 🚀 [\#144](https://github.com/feathersjs/feathers-sync/pull/144) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update mocha to the latest version 🚀 [\#142](https://github.com/feathersjs/feathers-sync/pull/142) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Fix flaky Travis CI test [\#139](https://github.com/feathersjs/feathers-sync/pull/139) ([daffl](https://github.com/daffl))
- Updated README for custom adapters. [\#138](https://github.com/feathersjs/feathers-sync/pull/138) ([deskoh](https://github.com/deskoh))

## [v2.0.0](https://github.com/feathersjs/feathers-sync/tree/v2.0.0) (2019-11-15)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.2.0...v2.0.0)

**Implemented enhancements:**

- Is serialization of the complete context required in event ? [\#87](https://github.com/feathersjs/feathers-sync/issues/87)

**Fixed bugs:**

- Multiple notifications while using amqp [\#120](https://github.com/feathersjs/feathers-sync/issues/120)
- Error: The field 'strict' is not a valid collection option [\#119](https://github.com/feathersjs/feathers-sync/issues/119)
- getting error collection.find\(...\).sort\(...\).limit\(...\).nextObject is not a function [\#110](https://github.com/feathersjs/feathers-sync/issues/110)
- Memory leak [\#94](https://github.com/feathersjs/feathers-sync/issues/94)
- Mubsub: broken cursor [\#92](https://github.com/feathersjs/feathers-sync/issues/92)
- Remove mubsub \(MongoDB\) adapter [\#135](https://github.com/feathersjs/feathers-sync/pull/135) ([daffl](https://github.com/daffl))

**Closed issues:**

- mubsub nested dependency security issue [\#134](https://github.com/feathersjs/feathers-sync/issues/134)
- Async MongoClient.connect and app mixins [\#125](https://github.com/feathersjs/feathers-sync/issues/125)

## [v1.2.0](https://github.com/feathersjs/feathers-sync/tree/v1.2.0) (2019-11-12)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.1.3...v1.2.0)

**Closed issues:**

- \# [\#133](https://github.com/feathersjs/feathers-sync/issues/133)
- Using channels with feathers-sync [\#132](https://github.com/feathersjs/feathers-sync/issues/132)
- Unable to use feathers-sync with sentinel setup [\#126](https://github.com/feathersjs/feathers-sync/issues/126)

**Merged pull requests:**

- Custom serializer / deserializer support [\#130](https://github.com/feathersjs/feathers-sync/pull/130) ([deskoh](https://github.com/deskoh))

## [v1.1.3](https://github.com/feathersjs/feathers-sync/tree/v1.1.3) (2019-10-22)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.1.2...v1.1.3)

**Closed issues:**

- An in-range update of mocha is breaking the build 🚨 [\#123](https://github.com/feathersjs/feathers-sync/issues/123)
- An in-range update of amqplib is breaking the build 🚨 [\#118](https://github.com/feathersjs/feathers-sync/issues/118)
- An in-range update of lodash is breaking the build 🚨 [\#116](https://github.com/feathersjs/feathers-sync/issues/116)
- An in-range update of mocha is breaking the build 🚨 [\#115](https://github.com/feathersjs/feathers-sync/issues/115)

**Merged pull requests:**

- Updated AMQP queue to auto-delete. [\#129](https://github.com/feathersjs/feathers-sync/pull/129) ([deskoh](https://github.com/deskoh))
- Update all dependencies [\#124](https://github.com/feathersjs/feathers-sync/pull/124) ([daffl](https://github.com/daffl))
- Update dependencies and Node versions [\#117](https://github.com/feathersjs/feathers-sync/pull/117) ([daffl](https://github.com/daffl))

## [v1.1.2](https://github.com/feathersjs/feathers-sync/tree/v1.1.2) (2019-07-16)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.1.1...v1.1.2)

**Closed issues:**

- feathers-sync couldnt understand mongodb+srv [\#112](https://github.com/feathersjs/feathers-sync/issues/112)
- An in-range update of lodash is breaking the build 🚨 [\#111](https://github.com/feathersjs/feathers-sync/issues/111)

**Merged pull requests:**

- Update all dependencies to latest [\#114](https://github.com/feathersjs/feathers-sync/pull/114) ([daffl](https://github.com/daffl))
- identify adaptor name by search in protocol name of uri [\#113](https://github.com/feathersjs/feathers-sync/pull/113) ([mserini](https://github.com/mserini))

## [v1.1.1](https://github.com/feathersjs/feathers-sync/tree/v1.1.1) (2019-01-31)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.1.0...v1.1.1)

**Closed issues:**

- Disabling synchronization on authentication doesn't work [\#106](https://github.com/feathersjs/feathers-sync/issues/106)
- An in-range update of @feathersjs/feathers is breaking the build 🚨 [\#102](https://github.com/feathersjs/feathers-sync/issues/102)
- An in-range update of debug is breaking the build 🚨 [\#101](https://github.com/feathersjs/feathers-sync/issues/101)
- An in-range update of @feathersjs/feathers is breaking the build 🚨 [\#100](https://github.com/feathersjs/feathers-sync/issues/100)
- An in-range update of amqplib is breaking the build 🚨 [\#99](https://github.com/feathersjs/feathers-sync/issues/99)
- Bulk patching a service from within another service returns null values [\#96](https://github.com/feathersjs/feathers-sync/issues/96)

**Merged pull requests:**

- Fix export of symbol to disable syncing [\#107](https://github.com/feathersjs/feathers-sync/pull/107) ([daffl](https://github.com/daffl))
- Update semistandard to the latest version 🚀 [\#98](https://github.com/feathersjs/feathers-sync/pull/98) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

## [v1.1.0](https://github.com/feathersjs/feathers-sync/tree/v1.1.0) (2018-10-18)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.0.3...v1.1.0)

**Closed issues:**

- Question: Disable Sync for specific service or Method [\#95](https://github.com/feathersjs/feathers-sync/issues/95)
- An in-range update of @feathersjs/feathers is breaking the build 🚨 [\#91](https://github.com/feathersjs/feathers-sync/issues/91)
- An in-range update of lodash is breaking the build 🚨 [\#90](https://github.com/feathersjs/feathers-sync/issues/90)
- An in-range update of debug is breaking the build 🚨 [\#88](https://github.com/feathersjs/feathers-sync/issues/88)

**Merged pull requests:**

- Allow to disable synchronization in a hook [\#97](https://github.com/feathersjs/feathers-sync/pull/97) ([daffl](https://github.com/daffl))
- Update debug to the latest version 🚀 [\#89](https://github.com/feathersjs/feathers-sync/pull/89) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

## [v1.0.3](https://github.com/feathersjs/feathers-sync/tree/v1.0.3) (2018-08-05)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.0.2...v1.0.3)

**Closed issues:**

- \[MongoDB\] Writing event fails when the hook context contains a query with a key starting with `$` [\#83](https://github.com/feathersjs/feathers-sync/issues/83)
- Can't get it to work [\#80](https://github.com/feathersjs/feathers-sync/issues/80)

**Merged pull requests:**

-  Send safely stringified data to MongoDB [\#85](https://github.com/feathersjs/feathers-sync/pull/85) ([daffl](https://github.com/daffl))

## [v1.0.2](https://github.com/feathersjs/feathers-sync/tree/v1.0.2) (2018-06-11)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.0.1...v1.0.2)

**Closed issues:**

- Does not send service events to client if service is connected to moongoose [\#50](https://github.com/feathersjs/feathers-sync/issues/50)

**Merged pull requests:**

- Update insecure dependencies [\#81](https://github.com/feathersjs/feathers-sync/pull/81) ([daffl](https://github.com/daffl))

## [v1.0.1](https://github.com/feathersjs/feathers-sync/tree/v1.0.1) (2018-03-09)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v1.0.0...v1.0.1)

**Closed issues:**

- Server crashes when failing to connect to mongo or when connection is closed [\#43](https://github.com/feathersjs/feathers-sync/issues/43)

## [v1.0.0](https://github.com/feathersjs/feathers-sync/tree/v1.0.0) (2018-03-06)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v0.1.4...v1.0.0)

**Closed issues:**

- Pass a mongoDb Object as config.db [\#74](https://github.com/feathersjs/feathers-sync/issues/74)
- Multiple services using the same Redis [\#73](https://github.com/feathersjs/feathers-sync/issues/73)
- Add support for DynamoDB \(AmazonAWS\) [\#67](https://github.com/feathersjs/feathers-sync/issues/67)
- Hook is not being emitted [\#32](https://github.com/feathersjs/feathers-sync/issues/32)
- Add support for WebRTC [\#19](https://github.com/feathersjs/feathers-sync/issues/19)
- Add support for Kafka [\#18](https://github.com/feathersjs/feathers-sync/issues/18)
- Add support for SQS [\#17](https://github.com/feathersjs/feathers-sync/issues/17)
- Solidify default options [\#16](https://github.com/feathersjs/feathers-sync/issues/16)
- Add tests for RabbitMQ [\#15](https://github.com/feathersjs/feathers-sync/issues/15)

**Merged pull requests:**

- Add unified top level usage [\#78](https://github.com/feathersjs/feathers-sync/pull/78) ([daffl](https://github.com/daffl))
- Refactor into extensible common event system [\#77](https://github.com/feathersjs/feathers-sync/pull/77) ([daffl](https://github.com/daffl))
- Add tests for AMQP [\#76](https://github.com/feathersjs/feathers-sync/pull/76) ([daffl](https://github.com/daffl))
- Update to Feathers v3 and new plugin infrastructure [\#75](https://github.com/feathersjs/feathers-sync/pull/75) ([daffl](https://github.com/daffl))
- Update dependencies to enable Greenkeeper 🌴 [\#70](https://github.com/feathersjs/feathers-sync/pull/70) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

## [v0.1.4](https://github.com/feathersjs/feathers-sync/tree/v0.1.4) (2017-11-11)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v0.1.3...v0.1.4)

**Closed issues:**

- Little question i am Missing Something? [\#68](https://github.com/feathersjs/feathers-sync/issues/68)
- An in-range update of redis is breaking the build 🚨 [\#65](https://github.com/feathersjs/feathers-sync/issues/65)
- Node Crashes on user service `patch` or `put` requests [\#63](https://github.com/feathersjs/feathers-sync/issues/63)
- Feathers-sync breaks when trying to authenticate [\#62](https://github.com/feathersjs/feathers-sync/issues/62)
- An in-range update of feathers is breaking the build 🚨 [\#61](https://github.com/feathersjs/feathers-sync/issues/61)
- \<delete me\> [\#60](https://github.com/feathersjs/feathers-sync/issues/60)

**Merged pull requests:**

- Upgrade to @Feathers v3 [\#72](https://github.com/feathersjs/feathers-sync/pull/72) ([superlazycoder](https://github.com/superlazycoder))
- Update debug to the latest version 🚀 [\#66](https://github.com/feathersjs/feathers-sync/pull/66) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

## [v0.1.3](https://github.com/feathersjs/feathers-sync/tree/v0.1.3) (2017-06-07)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v0.1.2...v0.1.3)

**Fixed bugs:**

- Mubsub config option fix [\#59](https://github.com/feathersjs/feathers-sync/pull/59) ([thebarndog](https://github.com/thebarndog))

**Closed issues:**

- An in-range update of mocha is breaking the build 🚨 [\#58](https://github.com/feathersjs/feathers-sync/issues/58)
- Scale server on kubernetes [\#55](https://github.com/feathersjs/feathers-sync/issues/55)
- Mongo events don't get emitted on serverX [\#45](https://github.com/feathersjs/feathers-sync/issues/45)

**Merged pull requests:**

- Update semistandard to the latest version 🚀 [\#57](https://github.com/feathersjs/feathers-sync/pull/57) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update dependencies to enable Greenkeeper 🌴 [\#56](https://github.com/feathersjs/feathers-sync/pull/56) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- debug@2.3.0 breaks build ⚠️ [\#37](https://github.com/feathersjs/feathers-sync/pull/37) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Update amqplib to version 0.5.0 🚀 [\#36](https://github.com/feathersjs/feathers-sync/pull/36) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- 👻😱 Node.js 0.10 is unmaintained 😱👻 [\#35](https://github.com/feathersjs/feathers-sync/pull/35) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- jshint —\> semistandard [\#34](https://github.com/feathersjs/feathers-sync/pull/34) ([corymsmith](https://github.com/corymsmith))
- jshint@2.9.4 breaks build 🚨 [\#33](https://github.com/feathersjs/feathers-sync/pull/33) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- added a simple flowchart explaining how it works [\#30](https://github.com/feathersjs/feathers-sync/pull/30) ([p-diogo](https://github.com/p-diogo))
- Update mocha to version 3.0.0 🚀 [\#27](https://github.com/feathersjs/feathers-sync/pull/27) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Add AMQP Adapter [\#12](https://github.com/feathersjs/feathers-sync/pull/12) ([tinque](https://github.com/tinque))
- Update all dependencies 🌴 [\#10](https://github.com/feathersjs/feathers-sync/pull/10) ([greenkeeperio-bot](https://github.com/greenkeeperio-bot))
- Fix broadcast wrong messages [\#9](https://github.com/feathersjs/feathers-sync/pull/9) ([thomaschaaf](https://github.com/thomaschaaf))
- Update readme [\#7](https://github.com/feathersjs/feathers-sync/pull/7) ([cloudlena](https://github.com/cloudlena))
- add redis to subtitle in readme [\#3](https://github.com/feathersjs/feathers-sync/pull/3) ([cloudlena](https://github.com/cloudlena))

## [v0.1.2](https://github.com/feathersjs/feathers-sync/tree/v0.1.2) (2016-12-08)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v0.1.1...v0.1.2)

**Closed issues:**

- Real-time events doesn't fire when using Mongodb database adapter [\#26](https://github.com/feathersjs/feathers-sync/issues/26)
- Add support for Redis [\#14](https://github.com/feathersjs/feathers-sync/issues/14)
- Add support for RabbitMQ [\#13](https://github.com/feathersjs/feathers-sync/issues/13)
- Event not fired in socket on client [\#11](https://github.com/feathersjs/feathers-sync/issues/11)
- Link to sync in README is broken [\#8](https://github.com/feathersjs/feathers-sync/issues/8)
- TypeError: Cannot read property 'split' of undefined [\#6](https://github.com/feathersjs/feathers-sync/issues/6)

## [v0.1.1](https://github.com/feathersjs/feathers-sync/tree/v0.1.1) (2016-01-30)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/v0.1.0...v0.1.1)

**Closed issues:**

- Error: Cannot find module 'feathers-sync' [\#5](https://github.com/feathersjs/feathers-sync/issues/5)
- Plugin not published on Npm? [\#1](https://github.com/feathersjs/feathers-sync/issues/1)

## [v0.1.0](https://github.com/feathersjs/feathers-sync/tree/v0.1.0) (2016-01-29)

[Full Changelog](https://github.com/feathersjs/feathers-sync/compare/0b4c7f07decaf430e82f509210667e4464d595d6...v0.1.0)

**Merged pull requests:**

- disallow yoda http://eslint.org/docs/rules/yoda.html [\#4](https://github.com/feathersjs/feathers-sync/pull/4) ([cloudlena](https://github.com/cloudlena))
- redis adapter [\#2](https://github.com/feathersjs/feathers-sync/pull/2) ([kc-dot-io](https://github.com/kc-dot-io))



\* *This Changelog was automatically generated by [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator)*

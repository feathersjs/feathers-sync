const feathers = require('@feathersjs/feathers')
const assert = require('assert')
const sync = require('../lib')

describe('feathers-sync tests', () => {
  it('exports db adapters', () => {
    assert.strictEqual(typeof sync, 'function')
    assert.ok(sync.redis)
    assert.ok(sync.amqp)
  })

  it('throws an error when uri is missing', () => {
    assert.throws(() => {
      feathers().configure(sync({}))
    }, /A `uri` option with the database connection string has to be provided/)
  })

  it('throws an error for invalid adapter', () => {
    assert.throws(() => {
      feathers().configure(sync({
        uri: 'something://localhost'
      }))
    }, /something is an invalid adapter/)
  })

  it('exports SYNC symbol', () => {
    const { SYNC } = sync

    assert.ok(typeof SYNC !== 'undefined')
  })
})

const debug = require('debug')('feathers-sync')
const feathers = require('@feathersjs/feathers')
const { _ } = require('@feathersjs/commons')
const SYNC = Symbol('feathers-sync/enabled')

const defaultEvents = ['created', 'updated', 'removed', 'patched']
const getServiceOptions = service => {
  if (typeof feathers.getServiceOptions === 'function') {
    return feathers.getServiceOptions(service)
  }

  return {}
}

module.exports = app => {
  if (app[SYNC]) {
    return
  }

  app[SYNC] = true

  if (app.sync) {
    throw new Error('Only one type of feathers-sync can be configured on the same application')
  }

  app.on('sync-in', (rawData) => {
    const { event, path, data, context } = app.sync.deserialize(rawData)
    const service = app.service(path)
    const hook = context
      ? Object.assign({ app, service }, context)
      : context

    if (service) {
      debug(`Dispatching sync-in event '${path} ${event}'`)
      service._emit(event, data, hook)
    } else {
      debug(`Invalid sync event '${path} ${event}'`)
    }
  })

  app.mixins.push((service, path) => {
    if (typeof service._emit !== 'function') {
      const { events: customEvents = service.events } = getServiceOptions(service)
      const events = defaultEvents.concat(customEvents)

      service._emit = service.emit
      service.emit = function (event, data, ctx) {
        const disabled = ctx && ctx[SYNC] === false

        if (!events.includes(event) || disabled) {
          debug(`Passing through non-service event '${path} ${event}'`)
          return this._emit(event, data, ctx)
        }

        const serializedContext = ctx && typeof ctx.toJSON === 'function' ? ctx.toJSON() : ctx
        const context = ctx && (ctx.app === app || ctx.service === service)
          ? _.omit(serializedContext, 'app', 'service', 'self')
          : serializedContext

        debug(`Sending sync-out event '${path} ${event}'`)

        return app.emit('sync-out', app.sync.serialize({
          event, path, data, context
        }))
      }
    }
  })
}

module.exports.SYNC = SYNC

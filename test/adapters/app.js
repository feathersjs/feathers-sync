const feathers = require('@feathersjs/feathers')
const sync = require('../../lib')

module.exports = options => {
  return () => feathers()
    .configure(sync(options))
    .use('/todo', {
      events: ['custom'],
      async create (data) {
        return data
      },
      async update (id, data, params) {
        return data
      }
    })
}

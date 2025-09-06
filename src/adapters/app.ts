import { feathers, Application } from '@feathersjs/feathers'
import sync, { SyncOptions } from '../index'

export default (options: SyncOptions) => {
  return (): Application =>
    feathers()
      .configure(sync(options))
      .use('/todo', {
        events: ['custom'],
        async create(data: any) {
          return data
        },
        async update(id: any, data: any, params: any) {
          return data
        }
      })
}

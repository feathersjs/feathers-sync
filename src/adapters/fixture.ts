import { feathers, Application } from '@feathersjs/feathers'
import sync, { AmqpSyncOptions, NatsSyncOptions, RedisSyncOptions, SyncOptions } from '../index'

class TodoService {
  events = ['custom']

  async create(data: any) {
    return data
  }

  async update(id: any, data: any, params: any) {
    return data
  }
}

export default (options: RedisSyncOptions | AmqpSyncOptions | NatsSyncOptions) => {
  return (): Application => feathers().configure(sync(options)).use('/todo', new TodoService())
}

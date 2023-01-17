import type {
  IOClients,
  ParamsContext,
  ServiceContext,
  RecorderState,
} from '@vtex/api'
import { Service } from '@vtex/api'

import { getTemperature } from './routes/temperature'

declare global {
  type Context = ServiceContext<IOClients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<IOClients, State, ParamsContext>({
  graphql: {
    resolvers: {
      Query: {
        getTemperature,
      },
    },
  },
})

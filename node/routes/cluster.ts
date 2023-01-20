/* eslint-disable @typescript-eslint/naming-convention */
import { masterdataSearch } from '../utils/masterdataSearch'

const CLIENT_ENTITY = 'CL'
const FIELDS = 'clusterCL'
const PAGE = 1
const PAGE_SIZE = 1

interface emailInput {
  emailSession: string
}

export async function getCluster(
  _: unknown,
  { emailSession }: emailInput,
  { clients: { masterdata } }: Context
) {
  if (!emailSession) {
    return null
  }

  const response = (await masterdataSearch(
    masterdata,
    PAGE,
    PAGE_SIZE,
    emailSession,
    CLIENT_ENTITY,
    FIELDS
  )) as any

  const cluster = {
    cluster: response[0].clusterCL,
  }

  return cluster
}

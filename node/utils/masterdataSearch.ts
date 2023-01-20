/* eslint-disable max-params */
import type { MasterData } from '@vtex/api'

export const masterdataSearch = async (
  masterdata: MasterData,
  page: number,
  pageSize: number,
  email: string,
  dataEntity: string,
  fields: string
) => {
  return masterdata.searchDocuments({
    dataEntity: `${dataEntity}`,
    fields: [`${fields}`],
    where: `email=${email}`,
    pagination: {
      page,
      pageSize,
    },
    sort: 'createdIn DESC',
  })
}

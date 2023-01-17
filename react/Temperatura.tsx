import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import { Spinner } from 'vtex.styleguide'

import { searchTemperature } from './queries/searchTemperature.gql'

interface TemperatureProps {
  title: string
}

const CSS_HANDLES = [
  'container',
  'temperature',
  'title',
  'lastUpdate',
  'oid',
  'loading',
  'error',
  'nodata',
]

const Temperature: StorefrontFunctionComponent<TemperatureProps> = ({
  title,
}) => {
  const titleText = title || <FormattedMessage id="temperature.title" />
  const handles = useCssHandles(CSS_HANDLES)

  const productContextValue = useProduct()
  const id = productContextValue?.product?.productId

  const { loading, error, data } = useQuery(searchTemperature, {
    variables: { productId: id },
  })

  if (loading) {
    return (
      <span className="dib c-muted-1">
        <Spinner color="currentColor" size={20} />
      </span>
    )
  }

  if (error) {
    return (
      <div className={`${handles.error} db tc`}> Something went wrong!</div>
    )
  }

  if (data.getTemperature == null) {
    return <div className={`${handles.nodata} db tc`}> No data!</div>
  }

  return (
    <div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
      <div className={`${handles.title} db tc`}>{titleText}</div>
      <div className={`${handles.temperature} db tc`}>
        {' '}
        {data.getTemperature.temperature} °C
      </div>
      <div className={`${handles.lastUpdate} db tc`}>
        {' '}
        Última atualização: {data.getTemperature.timestamp}
      </div>
      <div className={`${handles.oid} db tc`}>
        {' '}
        Operation ID: {data.getTemperature.oid}
      </div>
    </div>
  )
}

Temperature.schema = {
  title: 'Temperature Custom Component',
  description: 'Edit the temperature custom component',
  type: 'object',
  properties: {
    title: {
      title: 'Tittle',
      type: 'string',
      default: '❄ Temperature ❄',
    },
  },
}

export default Temperature

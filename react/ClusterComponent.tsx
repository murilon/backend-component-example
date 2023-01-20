import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import { useRenderSession } from 'vtex.session-client'
import { useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'

import { searchCluster } from './queries/searchCluster.gql'

interface ClusterProps {
  title: string
}

const CSS_HANDLES = ['tittle', 'email', 'cluster', 'loading', 'error', 'nodata']

const ClusterComponent: StorefrontFunctionComponent<ClusterProps> = ({
  title,
}) => {
  const titleText = title || <FormattedMessage id="cluster.title" />
  const handles = useCssHandles(CSS_HANDLES)

  const { session } = useRenderSession()
  const emailSession = session?.namespaces?.profile?.email?.value

  const { loading, data, error } = useQuery(searchCluster, {
    variables: { emailSession },
  })

  const clusterSession = data?.getCluster?.cluster

  if (loading) {
    return (
      <span className="dib c-muted-1">
        <Spinner color="currentColor" size={30} />
      </span>
    )
  }

  if (error) {
    return <div> Something went wrong!</div>
  }

  if (!clusterSession) {
    return <div> Usuário não autenticado! </div>
  }

  return (
    <>
      <div className={`${handles.title} db tc`}>{titleText}</div>
      <div> Cliente Session: {emailSession}</div>
      <div> Cluster Session: {clusterSession}</div>
    </>
  )
}

export default ClusterComponent

import React, { useContext } from 'react'
import { Box, CircularProgress } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { GlobalStoreContext } from '@stores/global'
import { useGetNodeQuery } from '@gql/operations'
import { TitleEditor, TableEditor, IconPicker } from './components'

export const MetadataTemplateEditor = observer(() => {
  const globalStore = useContext(GlobalStoreContext)

  return (
    <Box>
      {globalStore.selectedMetadataTemplateId ? <MetadataTemplateEditorActive metadataTemplateId={globalStore.selectedMetadataTemplateId} /> : (
        <Box bg="red.100" p="md" borderRadius="3xl">
          No note table selected.
        </Box>
      ) } 
    </Box>
  )
})


interface MetadataTemplateEditorActiveProps {
  metadataTemplateId: string
}

const MetadataTemplateEditorActive = ({ metadataTemplateId }: MetadataTemplateEditorActiveProps) => {
  
  const [response] = useGetNodeQuery({
    variables: {
      id: metadataTemplateId,
    },
    requestPolicy: 'cache-and-network',
  })

  return (
    <Box>
      {
        !response.data?.node || response.data.node.__typename !== 'MetadataTemplate'? (
          <CircularProgress isIndeterminate color='blue.300' />
        ) : (
          <>
            <IconPicker metadataTemplate={response.data.node} />
            <TitleEditor metadataTemplate={response.data.node} />
            <TableEditor metadataTemplate={response.data.node} />
          </>
        )
      }
    </Box>
  )
}
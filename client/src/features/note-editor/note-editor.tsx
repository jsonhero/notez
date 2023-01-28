import React, { useContext, useEffect } from 'react'
import { Box, CircularProgress, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { GlobalStoreContext } from '@stores/global'
import { useGetNodeQuery } from '@gql/operations'

import { DocumentEditor, TitleEditor, MetadataEditor } from './components'


export const NoteEditor = observer(() => {
  const globalStore = useContext(GlobalStoreContext)

  return (
    <Box>
      {globalStore.selectedIdeaId ? <NoteEditorActive ideaId={globalStore.selectedIdeaId} /> : (
        <Box bg="red.100" p="md" borderRadius="3xl">
          No idea selected.
        </Box>
      ) } 
    </Box>
  )
})

interface NoteEditorActiveProps {
  ideaId: string
}

const NoteEditorActive = React.memo(({ ideaId }: NoteEditorActiveProps) => {
  
  const [response] = useGetNodeQuery({
    variables: {
      id: ideaId,
    },
  })

  return (
    <Box>
      {
        !response.data?.node || response.data.node.__typename !== 'Idea' ? (
          <CircularProgress isIndeterminate color='blue.300' />
        ) : (
          <>
            <TitleEditor idea={response.data.node} />
            <MetadataEditor idea={response.data.node} />
            <DocumentEditor idea={response.data.node} />
          </>
        )
      }
    </Box>
  )
}, (prevProps, nextProps) => prevProps.ideaId === nextProps.ideaId)
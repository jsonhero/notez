import React, { useContext } from 'react'
import { Box, CircularProgress } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { GlobalStoreContext } from '@stores/global'
import { AppNoteFragment, useGetNoteByIdQuery } from '@gql/operations'

import { DocumentEditor, TitleEditor, MetadataEditor } from './components'


export const NoteEditor = observer(() => {
  const globalStore = useContext(GlobalStoreContext)

  return (
    <Box>
      {globalStore.selectedNoteId ? <NoteEditorActive noteId={globalStore.selectedNoteId} /> : (
        <Box bg="red.100" p="md" borderRadius="3xl">
          No note selected.
        </Box>
      ) } 
    </Box>
  )
})

interface NoteEditorActiveProps {
  noteId: string
}

const NoteEditorActive = ({ noteId }: NoteEditorActiveProps) => {
  
  const [response] = useGetNoteByIdQuery({
    variables: {
      noteId,
    },
    requestPolicy: 'cache-and-network',
  })

  return (
    <Box>
      {
        !response.data?.node ? (
          <CircularProgress isIndeterminate color='blue.300' />
        ) : (
          <>
            <TitleEditor note={response.data.node} />
            <MetadataEditor note={response.data.node} />
            <DocumentEditor note={response.data.node} />
          </>
        )
      }
    </Box>
  )
}
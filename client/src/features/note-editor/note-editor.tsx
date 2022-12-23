import React, { useContext } from 'react'
import { Box, CircularProgress } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { GlobalStoreContext } from '@stores/global'
import { useNoteControllerGetNote } from '@api'

import { DocumentEditor, TitleEditor, MetadataEditor } from './components'


export const NoteEditor = observer(() => {
  const globalStore = useContext(GlobalStoreContext)

  return (
    <Box>
      {globalStore.selectedNoteId ? <NoteEditorActive noteId={globalStore.selectedNoteId} /> : (
        <Box bg="red.100" p="md" borderRadius="3xl">
          No note selected, bitch.
        </Box>
      ) } 
    </Box>
  )
})

interface NoteEditorActiveProps {
  noteId: string
}

const NoteEditorActive = ({ noteId }: NoteEditorActiveProps) => {
  
  const { data, isLoading: isLoadingNote } = useNoteControllerGetNote(noteId)

  return (
    <Box>

      {
        !data || isLoadingNote ? (
          <CircularProgress isIndeterminate color='blue.300' />
        ) : (
          <>
            <TitleEditor note={data.note} />
            <MetadataEditor />
            <DocumentEditor note={data.note} />
          </>
        )
      }
    </Box>
  )
}
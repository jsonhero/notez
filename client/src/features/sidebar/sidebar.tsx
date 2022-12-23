import React, { useContext } from 'react'
import { Box, VStack, Button } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import { GlobalStoreContext  } from '@stores/global'
import { useNoteControllerGetNotes, useNoteControllerCreateNote } from '@api'

export const Sidebar = () => {
  const [searchParams] = useSearchParams()

  return (
    <Box h="100vh" bg="app.gray" w="100%">
      {searchParams.get('tab') === 'table' ? <TableView /> : <NoteView />}
    </Box>
  )
}

const NoteView = () => {
  const globalStore = useContext(GlobalStoreContext)
  const { data, refetch: refetchNotes } = useNoteControllerGetNotes()
  const { mutateAsync: mutateCreateNote } = useNoteControllerCreateNote()

  const onClickCreateNote = async () => {
    const res = await mutateCreateNote();
    globalStore.setSelectedNoteId(res.createdNote.id)
    refetchNotes()
  }

  const onClickNote = (noteId: string) => {
    globalStore.setSelectedNoteId(noteId)
  }

  return (
    <Box p="medium">
      <Box mb="lg">
        <Button onClick={onClickCreateNote}>
          Create Note
        </Button>
      </Box>
      <VStack spacing="medium" align="flex-start">
        {data?.notes.map((note) => (
          <Button key={note.id} onClick={() => onClickNote(note.id)} variant="ghost" p="0px" m="0px">
            <Box>
              {note.title || `Untitled :  ${note.id}`}
            </Box>
          </Button>
        ))}
      </VStack>
    </Box>
  )
}


const TableView = () => {
  return (
    <Box p="medium">
      <Box mb="lg">
        <Button >
          Create Table
        </Button>
      </Box>
      <VStack spacing="medium" align="flex-start">
      </VStack>
    </Box>
  )
}
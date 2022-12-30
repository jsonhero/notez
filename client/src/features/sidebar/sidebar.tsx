import React, { useContext } from 'react'
import { Box, VStack, HStack, Button, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useSearchParams } from 'react-router-dom'

import { GlobalStoreContext  } from '@stores/global'
import { useGetNotesQuery, useCreateNoteMutation, useDeleteNoteMutation } from '@gql/operations'

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
  const [_, createNoteMutation] = useCreateNoteMutation()
  const [, deleteNoteMutation] = useDeleteNoteMutation()
  const [response, refetchNotes] = useGetNotesQuery()

  const onClickCreateNote = async () => {
    const res = await createNoteMutation({});
    globalStore.setSelectedNoteId(res.data?.createNote.note.id as string)
    refetchNotes()
  }

  const onClickNote = (noteId: string) => {
    globalStore.setSelectedNoteId(noteId)
  }

  const onClickDelete = (noteId: string) => {
    deleteNoteMutation({
      input: {
        noteId,
      }
    })
  }

  return (
    <Box p="medium">
      <Box mb="lg">
        <Button onClick={() => refetchNotes()}>
          Refresh
        </Button>
        <Button onClick={onClickCreateNote}>
          Create Note
        </Button>
      </Box>
      <VStack spacing="medium" align="flex-start">
        {response.data?.notes.map((note) => (
          <HStack key={note.id}>
            <Button onClick={() => onClickNote(note.id)} variant="ghost" p="0px" m="0px">
              <Box>
                {note.title || `Untitled :  ${note.id}`}
              </Box>
            </Button>
            <IconButton onClick={() => onClickDelete(note.id)}  variant="ghost" aria-label='Delete' icon={<DeleteIcon />} />
          </HStack>
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
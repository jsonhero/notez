import React, { useContext } from 'react'
import { Box, VStack, HStack, Button, IconButton, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useSearchParams } from 'react-router-dom'

import { GlobalStoreContext  } from '@stores/global'
import { useGetNotesQuery, useCreateNoteMutation, useDeleteNoteMutation, useCreateNoteTableMutation, useGetNoteTablesQuery, useDeleteNoteTableMutation } from '@gql/operations'

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

  const onClickDelete = async (noteId: string) => {
    await deleteNoteMutation({
      input: {
        noteId,
      }
    })

    if (globalStore.selectedNoteId === noteId) {
      const newSelectedNote = response.data?.notes.find((note) => note.id !== noteId)
      if (newSelectedNote) {
        globalStore.setSelectedNoteId(newSelectedNote.id)
      } else {
        globalStore.setSelectedNoteId(null)
      }
    }
  }

  return (
    <Box p="medium">
      <Box mb="lg">
        <Button onClick={onClickCreateNote}>
          Create Note
        </Button>
      </Box>
      <VStack spacing="xsm" align="flex-start">
        {response.data?.notes.map((note) => (
          <HStack key={note.id} justify="space-between" w="100%" role="group" 
            bg={note.id === globalStore.selectedNoteId ? "gray.200" : 'initial'}
          >
            <Button justifyContent="flex-start" w="100%" onClick={() => onClickNote(note.id)} variant="ghost" p="0px" m="0px">
              <Text pl="sm">
                {note.title || `Untitled`}
              </Text>
            </Button>
            <IconButton display="none" _groupHover={{ display: 'initial' }} onClick={() => onClickDelete(note.id)}  variant="ghost" aria-label='Delete' icon={<DeleteIcon />} />
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}


const TableView = () => {
  const globalStore = useContext(GlobalStoreContext)
  const [, createNoteTableMutation] = useCreateNoteTableMutation()
  const [, deleteNoteTableMutation] = useDeleteNoteTableMutation()
  const [response] = useGetNoteTablesQuery()

  const onClickCreateNoteTable = () => {
    createNoteTableMutation({})
  }


  const onClickNoteTable = (noteTableId: string) => {
    globalStore.setSelectedNoteTableId(noteTableId)
  }

  const onClickDelete = async (noteTableId: string) => {
    await deleteNoteTableMutation({
      input: {
        noteTableId,
      }
    })

    if (globalStore.selectedNoteTableId === noteTableId) {
      const newSelectedNoteTable = response.data?.noteTables.find((noteTable) => noteTable.id !== noteTableId)
      if (newSelectedNoteTable) {
        globalStore.setSelectedNoteTableId(newSelectedNoteTable.id)
      } else {
        globalStore.setSelectedNoteTableId(null)
      }
    }
  }

  return (
    <Box p="medium">
      <Box mb="lg">
        <Button onClick={onClickCreateNoteTable}>
          Create Table
        </Button>
      </Box>
      <VStack spacing="xsm" align="flex-start">
        {response.data?.noteTables.map((noteTable) => (
          <HStack key={noteTable.id} justify="space-between" w="100%" role="group" 
            bg={noteTable.id === globalStore.selectedNoteTableId ? "gray.200" : 'initial'}
          >
            <Button justifyContent="flex-start" w="100%" onClick={() => onClickNoteTable(noteTable.id)} variant="ghost" p="0px" m="0px">
              <Text pl="sm">
                {noteTable.title || `Untitled`}
              </Text>
            </Button>
            <IconButton display="none" _groupHover={{ display: 'initial' }} onClick={() => onClickDelete(noteTable.id)}  variant="ghost" aria-label='Delete' icon={<DeleteIcon />} />
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}
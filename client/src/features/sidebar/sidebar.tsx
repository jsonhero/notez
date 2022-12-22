import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import { useNoteControllerGetNotes } from '@api'

export const Sidebar = () => {
  const { data } = useNoteControllerGetNotes()

  return (
    <Box h="100vh" bg="red" w="100%">

      {data?.notes.map((note) => (
        <Box>{note.id}</Box>
      ))}
    </Box>
  )
}
import React from 'react'
import { Input, Box } from '@chakra-ui/react'

import { useNoteControllerUpdateNoteTitle } from '@api'
import { NoteDto } from '@api/models'

interface TitleEditorProps {
  note: NoteDto;
}

export const TitleEditor = ({ note }: TitleEditorProps) => {

  const { mutateAsync: updateNoteTitle } = useNoteControllerUpdateNoteTitle()
  

  return (
    <Box>

    </Box>
  )
}
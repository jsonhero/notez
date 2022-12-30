import React from 'react'
import { Input, Box } from '@chakra-ui/react'
import _ from 'lodash'

import { AppNoteFragment, useUpdateNoteMutation } from '@gql/operations'

interface TitleEditorProps {
  note: AppNoteFragment;
}

export const TitleEditor = ({ note }: TitleEditorProps) => {
  const [_result, updateNoteMutation] = useUpdateNoteMutation()

  const updateNoteDocument = (title: string) => {
    updateNoteMutation({
      input: {
        noteId: note.id,
        note: {
          title,
        }
      }
    })
  }
  const updateNoteTitleThrottled = _.throttle(updateNoteDocument, 2000)

  return (
    <Box mb="small">
      <Input
        sx={{
          fontWeight: 'bold',
          fontSize: '32px',
          m: '0px',
          p: '0px',
          outline: 'none',
          border: 'none',
        }}
        _focusVisible={{
          outline: 'none',
          border: 'none',
        }}
        value={note.title || ''}
        borderRadius="none"
        placeholder="Untitled" 
        onChange={(e) => updateNoteTitleThrottled(e.target.value)} 
      />
    </Box>
  )
}
import React from 'react'
import { Input, Box } from '@chakra-ui/react'
import _ from 'lodash'
import { useQueryClient } from 'react-query'

import { useNoteControllerUpdateNoteTitle, getNoteControllerGetNotesQueryKey } from '@api'
import { NoteDto, GetNotesResponse } from '@api/models'

interface TitleEditorProps {
  note: NoteDto;
}

export const TitleEditor = ({ note }: TitleEditorProps) => {
  const queryClient = useQueryClient()

  const { mutate: mutateUpdateNoteTitle } = useNoteControllerUpdateNoteTitle({
    mutation: {
      onMutate: async (mutation) => {
        const key = getNoteControllerGetNotesQueryKey()
        const previousNotes = queryClient.getQueryData(key) as GetNotesResponse

        queryClient.setQueryData(key, (old: any) => {
          return {
            notes: old.notes.map((note: NoteDto) => {
              if (note.id === mutation.noteId) {
                return {
                  ...note,
                  title: mutation.data.title,
                }
              }
              return note;
            })
          }
        })
        
        return { previousNotes };
      }
    }
  })


  const updateNoteDocument = (title: string) => {
    mutateUpdateNoteTitle({
      noteId: note.id,
      data: {
        title,
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
        defaultValue={note.title}
        borderRadius="none"
        placeholder="Untitled" 
        onChange={(e) => updateNoteTitleThrottled(e.target.value)} 
      />
    </Box>
  )
}
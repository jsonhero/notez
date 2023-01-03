import React from 'react'
import { Input, Box } from '@chakra-ui/react'
import _ from 'lodash'

import { AppIdeaFragment, useUpdateIdeaMutation } from '@gql/operations'

interface TitleEditorProps {
  idea: AppIdeaFragment;
}

export const TitleEditor = ({ idea }: TitleEditorProps) => {
  const [_result, updateIdeaMutation] = useUpdateIdeaMutation()

  const updateNoteDocument = (title: string) => {
    updateIdeaMutation({
      input: {
        ideaId: idea.id,
        idea: {
          title,
        }
      }
    })
  }
  const updateIdeaTitleThrottled = _.throttle(updateNoteDocument, 2000)

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
        value={idea.title || ''}
        borderRadius="none"
        placeholder="Untitled" 
        onChange={(e) => updateIdeaTitleThrottled(e.target.value)} 
      />
    </Box>
  )
}
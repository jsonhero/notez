import React, { useState, useEffect } from 'react'
import { Input, Box } from '@chakra-ui/react'
import _ from 'lodash'

import { AppIdeaFragment, useUpdateIdeaMutation } from '@gql/operations'

interface TitleEditorProps {
  idea: AppIdeaFragment;
}

export const TitleEditor = ({ idea }: TitleEditorProps) => {
  const [title, setTitle] = useState<string>(idea.title || '')
  const [_result, updateIdeaMutation] = useUpdateIdeaMutation()


  useEffect(() => {
    setTitle(idea.title || '')
  }, [idea.id])

  const updateNoteDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
    updateIdeaMutation({
      input: {
        ideaId: idea.id,
        idea: {
          title: value,
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
        value={title}
        borderRadius="none"
        placeholder="Untitled" 
        onChange={updateIdeaTitleThrottled} 
      />
    </Box>
  )
}
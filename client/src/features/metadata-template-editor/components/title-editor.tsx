import React, { useState, useEffect } from 'react'
import { Input, Box } from '@chakra-ui/react'
import _ from 'lodash'

import { AppMetadataTemplateFragment, useUpdateMetadataTemplateMutation } from '@gql/operations'

interface TitleEditorProps {
  metadataTemplate: AppMetadataTemplateFragment;
}

export const TitleEditor = ({ metadataTemplate }: TitleEditorProps) => {
  const [title, setTitle] = useState<string>(metadataTemplate.title || '')
  const [_result, updateMetadataTemplateMutation] = useUpdateMetadataTemplateMutation()

  const updateNoteDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
    updateMetadataTemplateMutation({
      input: {
        metadataTemplateId: metadataTemplate.id,
        template: {
          title: value,
        }
      }
    })
  }

  useEffect(() => {
    setTitle(metadataTemplate.title || '')
  }, [metadataTemplate.id])

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
        value={title}
        borderRadius="none"
        placeholder="Untitled" 
        onChange={updateNoteTitleThrottled} 
      />
    </Box>
  )
}
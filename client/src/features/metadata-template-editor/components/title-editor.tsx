import React from 'react'
import { Input, Box } from '@chakra-ui/react'
import _ from 'lodash'

import { AppMetadataTemplateFragment, useUpdateMetadataTemplateMutation } from '@gql/operations'

interface TitleEditorProps {
  metadataTemplate: AppMetadataTemplateFragment;
}

export const TitleEditor = ({ metadataTemplate }: TitleEditorProps) => {
  const [_result, updateMetadataTemplateMutation] = useUpdateMetadataTemplateMutation()

  const updateNoteDocument = (title: string) => {
    updateMetadataTemplateMutation({
      input: {
        metadataTemplateId: metadataTemplate.id,
        template: {
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
        value={metadataTemplate.title || ''}
        borderRadius="none"
        placeholder="Untitled" 
        onChange={(e) => updateNoteTitleThrottled(e.target.value)} 
      />
    </Box>
  )
}
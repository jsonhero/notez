import React, { useState } from 'react'
import { HStack, Icon, Input } from '@chakra-ui/react'
import { HeaderContext } from '@tanstack/react-table'
import { BsTextLeft } from 'react-icons/bs'

import { AppMetadataTemplateSchemaFieldFragment, useUpdateMetadataTemplateFieldMutation } from '@gql/operations'

interface IdeaFieldHeaderProps extends HeaderContext<any, any> {
  field: AppMetadataTemplateSchemaFieldFragment;
  metadataTemplateId: string;
}

export const IdeaFieldHeader = React.memo(({
  field,
  header,
  metadataTemplateId,
}: IdeaFieldHeaderProps) => {
  const [, updateMetadataTemplateFieldMutation] = useUpdateMetadataTemplateFieldMutation()

  const [name, setName] = useState<string>(field.name || '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onBlur = () => {
    updateMetadataTemplateFieldMutation({
      input: {
        metadataTemplateId,
        fieldId: field.id,
        field: {
          name,
          type: field.type,
        },
      }
    })
  }

  return (
    <HStack>
      <Icon boxSize="16px" as={BsTextLeft} />
      <Input
        size="xs"
        sx={{
          fontWeight: 'bold',
          mr: '0px',
          p: '0px',
          outline: 'none',
          border: 'none',
        }}
        placeholder="Untitled"
        value={name} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
    </HStack>
  )
}, (prevProps, nextProps) => {
  return prevProps.field.id === nextProps.field.id
})

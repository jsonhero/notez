import React, { useState, useCallback } from 'react'
import { HStack, Icon, Input, Button, Popover, PopoverTrigger, PopoverContent, Text, VStack } from '@chakra-ui/react'
import { HeaderContext } from '@tanstack/react-table'
import { BsTextLeft } from 'react-icons/bs'
import { DeleteIcon } from '@chakra-ui/icons'

import { 
  AppMetadataTemplateSchemaFieldFragment, 
  useUpdateMetadataTemplateFieldMutation,
  useDeleteMetadataTemplateFieldMutation,
} from '@gql/operations'

interface IdeaFieldHeaderMenuProps {
  field: AppMetadataTemplateSchemaFieldFragment;
  metadataTemplateId: string;
  children?: React.ReactNode
}

const IdeaFieldHeaderMenu = ({
  field,
  metadataTemplateId,
  children,
}: IdeaFieldHeaderMenuProps) => {
  const initialFocusRef = React.useRef<HTMLInputElement>(null)

  const [name, setName] = useState<string>(field.name || '')

  const [, updateMetadataTemplateFieldMutation] = useUpdateMetadataTemplateFieldMutation()
  const [,deleteMetadataTemplateFieldMutation] = useDeleteMetadataTemplateFieldMutation()

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

  const onDelete = useCallback(() => {
    deleteMetadataTemplateFieldMutation({
      input: {
        fieldId: field.id,
        metadataTemplateId,
      }
    })
  }, [field.id, metadataTemplateId])

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom-start"
    >
      <PopoverTrigger>
        <Button sx={{
            h: '100%',
            w: '100%',
            p: 'xxsm',
            borderRadius: '0px',
          }}
          _hover={{
            bg: 'gray.200'
          }}
          variant="unstyled"
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent p="xsm">
        <Input
          placeholder="Property name"
          // ref={initialFocusRef}
          size="xs"
          sx={{
            bg: 'gray.50'
          }}
          value={name} 
          onChange={onChange} 
          onBlur={onBlur} 
        />
        <VStack align="flex-start">
          <Button
            display="flex"
            alignItems="center"
            variant="unstyled" 
            leftIcon={<DeleteIcon />} 
            onClick={onDelete}
          >
            Delete
          </Button>
        </VStack>
      </PopoverContent>
    </Popover>
  )
}

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
  return (
    <IdeaFieldHeaderMenu field={field} metadataTemplateId={metadataTemplateId}>
      <HStack h="100%" overflowX="hidden">
        <Icon boxSize="16px" as={BsTextLeft} />
        <Text fontSize="xs">{field.name}</Text>
      </HStack>
    </IdeaFieldHeaderMenu>
  )
}, (prevProps, nextProps) => {
  return prevProps.field.id === nextProps.field.id
})

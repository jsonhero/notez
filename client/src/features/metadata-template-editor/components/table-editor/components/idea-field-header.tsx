import React, { useState, useCallback } from 'react'
import { HStack, Icon, Input, Button, Popover, PopoverTrigger, PopoverContent, Text, VStack,
  Menu, MenuList, MenuButton, MenuOptionGroup, MenuItemOption
} from '@chakra-ui/react'
import { HeaderContext } from '@tanstack/react-table'
import { BsTextLeft, BsCalendarWeek } from 'react-icons/bs'
import { VscReferences } from 'react-icons/vsc'
import { BiHash } from 'react-icons/bi'
import { DeleteIcon } from '@chakra-ui/icons'
import { HiOutlineCalendar } from 'react-icons/hi'

import { 
  AppMetadataTemplateSchemaFieldFragment, 
  useUpdateMetadataTemplateFieldMutation,
  useDeleteMetadataTemplateFieldMutation,
} from '@gql/operations'

interface SchemaTypeIconProps {
  type: string;
}

const SchemaTypeIcon = ({ type }: SchemaTypeIconProps) => {
  const getIcon = () => {
    if (type === 'text') return BsTextLeft
    else if (type === 'number') return BiHash
    else if (type === 'date') return HiOutlineCalendar
    else if (type === 'reference') return VscReferences
  }

  return <Icon boxSize="16px" as={getIcon()} />
}
interface IdeaFieldHeaderProps {
  field: AppMetadataTemplateSchemaFieldFragment;
  metadataTemplateId: string;
}

export const IdeaFieldHeader = React.memo(({
  field,
  metadataTemplateId,
}: IdeaFieldHeaderProps) => {
  const initialFocusRef = React.useRef<HTMLInputElement>(null)

  const [name, setName] = useState<string>(field.name || '')
  const [schemaType, setSchemaType] = useState<string>(field.type || 'text')


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
          type: schemaType,
        },
      }
    })
  }

  const onChangeSchemaType = (selected: string) => {
    setSchemaType(selected)    
    updateMetadataTemplateFieldMutation({
      input: {
        metadataTemplateId,
        fieldId: field.id,
        field: {
          name,
          type: selected,
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
          <HStack h="100%" overflowX="hidden">
            <SchemaTypeIcon type={schemaType} />
            <Text fontSize="xs">{name}</Text>
          </HStack>
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
          <Menu isLazy={true}>
            <MenuButton>
              Type
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type="radio" value={schemaType} onChange={(val) => onChangeSchemaType(val as string)}>
                <MenuItemOption value="text">Text</MenuItemOption>
                <MenuItemOption value="number">Number</MenuItemOption>
                <MenuItemOption value="date">Date</MenuItemOption>
                <MenuItemOption value="reference">Reference</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
}, (prevProps, nextProps) => {
  return prevProps.field.id === nextProps.field.id && prevProps.field.updatedAt === nextProps.field.updatedAt
})

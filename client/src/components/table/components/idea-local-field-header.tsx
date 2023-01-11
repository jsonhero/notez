import React, { useState, useCallback } from 'react'
import { HStack, Icon, Input, Button, Popover, PopoverTrigger, PopoverContent, Text, VStack,
  Menu, MenuList, MenuButton, MenuOptionGroup, MenuItemOption
} from '@chakra-ui/react'
import { HeaderContext } from '@tanstack/react-table'
import { BsTextLeft, BsCalendarWeek } from 'react-icons/bs'
import { BiHash } from 'react-icons/bi'
import { DeleteIcon } from '@chakra-ui/icons'
import { HiOutlineCalendar } from 'react-icons/hi'

import { 
  AppMetadataTemplateSchemaFieldFragment,
  AppIdeaMetadataFieldFragment,
  useDeleteIdeaMetadataFieldMutation,
  useUpdateIdeaMetadataFieldMutation,
} from '@gql/operations'

interface SchemaTypeIconProps {
  type: string;
}

const SchemaTypeIcon = ({ type }: SchemaTypeIconProps) => {
  const getIcon = () => {
    if (type === 'text') return BsTextLeft
    else if (type === 'number') return BiHash
    else if (type === 'date') return HiOutlineCalendar
  }

  return <Icon boxSize="16px" as={getIcon()} />
}
interface IdeaLocalFieldHeaderProps {
  entry: AppIdeaMetadataFieldFragment;
  ideaId: string;
}

export const IdeaLocalFieldHeader = React.memo(({
  entry,
  ideaId,
}: IdeaLocalFieldHeaderProps) => {
  const initialFocusRef = React.useRef<HTMLInputElement>(null)

  const [name, setName] = useState<string>(entry.schema.name || '')
  const [schemaType, setSchemaType] = useState<string>(entry.schema.type || 'text')


  const [, updateIdeaMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()
  const [, deleteIdeaMetadataFieldMutation] = useDeleteIdeaMetadataFieldMutation()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onBlur = () => {
    updateIdeaMetadataFieldMutation({
      input: {
        ideaId,
        fieldId: entry.id,
        field: {
          schema: {
            name,
          },
        },
      }
    })
  }

  const onChangeSchemaType = (selected: string) => {
    setSchemaType(selected)    
    updateIdeaMetadataFieldMutation({
      input: {
        ideaId,
        fieldId: entry.id,
        field: {
          schema: {
            type: selected,
          }
        },
      }
    })
  }

  const onDelete = useCallback(() => {
    deleteIdeaMetadataFieldMutation({
      input: {
        fieldId: entry.id,
        ideaId,
      }
    })
  }, [entry.id, ideaId])

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
  return prevProps.entry.id === nextProps.entry.id && prevProps.entry.schema.updatedAt === nextProps.entry.schema.updatedAt
})

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
interface IdeaReadonlyFieldHeaderProps {
  entry: AppIdeaMetadataFieldFragment;
  ideaId: string;
}

export const IdeaReadonlyFieldHeader = React.memo(({
  entry,
  ideaId,
}: IdeaReadonlyFieldHeaderProps) => {
  return (
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
        <SchemaTypeIcon type={entry.schema.type} />
        <Text fontSize="xs">{entry.schema.name}</Text>
      </HStack>
    </Button>
  )
}, (prevProps, nextProps) => {
  return prevProps.entry.id === nextProps.entry.id && prevProps.entry.schema.updatedAt === nextProps.entry.schema.updatedAt
})

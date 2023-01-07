import React from 'react'
import { Tr, Td, Box, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { Row, flexRender } from '@tanstack/react-table'
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons'

import { AppIdeaFragment, AppIdeaMetadataFieldFragment, useDeleteIdeaMutation } from '@gql/operations'

export interface IdeaDataRowFields {
  idea: AppIdeaFragment;
  fields: {
    [key: string]: AppIdeaMetadataFieldFragment | null;
  }
}

interface IdeaDataRowProps {
  row: Row<IdeaDataRowFields>;
}

export const IdeaDataRow = ({ row }: IdeaDataRowProps) => {
  const [, deleteIdeaMutation] = useDeleteIdeaMutation()

  return (
    <Tr role="group" width="100%" display="flex" _hover={{
      bg: 'gray.50'
    }}>
      <Td border="none">
        <Box width="30px">
          <Box display="none" _groupHover={{ display: 'initial' }}>
            <Menu>
              <MenuButton as={IconButton} sx={{ p: 0, m: 0}} size="xs" aria-label='Delete Note' icon={<DragHandleIcon />} />
              <MenuList>
                <MenuItem icon={<DeleteIcon />} onClick={() => deleteIdeaMutation({
                  input: {
                    ideaId: row.original.idea.id,
                  }
                })}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Td>
      {row.getVisibleCells().map((cell) => {
        return (
          <Td key={cell.id} width={`${cell.column.getSize()}px`}>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </Td>
        )
      })}
      <Td sx={{
        width: '100%',
        flex: 1
      }}>
        
      </Td>
    </Tr>
  )
}
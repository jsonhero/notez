import React from 'react'
import { Tr, Td, Box, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { Row, flexRender, Cell } from '@tanstack/react-table'
import { DeleteIcon, DragHandleIcon } from '@chakra-ui/icons'
import _ from 'lodash'

import { AppIdeaFragment, AppIdeaMetadataFieldFragment, useDeleteIdeaMutation } from '@gql/operations'

import { IdeaRefCell } from './idea-ref-cell'
import { IdeaFieldCell } from './idea-field-cell'
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
  return (
    <Tr role="group" width="100%" display="flex" _hover={{
      bg: 'gray.50'
    }}>
      <Td border="none">
        <RowUtilsCell ideaId={row.original.idea.id} />
      </Td>
      {row.getVisibleCells().map((cell, i) => {
        return (
          <Td key={cell.id} width={`${cell.column.getSize()}px`}>
            {
              cell.column.id === 'idea' ? (
                <IdeaRefCell {...cell.getContext()} />
              ) : 
                <IdeaFieldCell entry={cell.getValue()} ideaId={row.original.idea.id} />
            }
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

interface RowUtilsCellProps {
  ideaId: string;
}

const RowUtilsCell = React.memo(({ ideaId }: RowUtilsCellProps) => {
  const [, deleteIdeaMutation] = useDeleteIdeaMutation()

  return (
    <Box width="30px">
      <Box display="none" _groupHover={{ display: 'initial' }}>
        <Menu isLazy={true}>
          <MenuButton as={IconButton} sx={{ p: 0, m: 0}} size="xs" aria-label='Delete Note' icon={<DragHandleIcon />} />
          <MenuList>
            <MenuItem icon={<DeleteIcon />} onClick={() => deleteIdeaMutation({
              input: {
                ideaId,
              }
            })}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}, (prevProps, nextProps) => prevProps.ideaId === nextProps.ideaId)
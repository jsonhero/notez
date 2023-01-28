import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { Th, Thead, Tr, Td, Tbody, Table, TableContainer, Input, Text, Box, Flex, Button, IconButton, Icon, HStack, Menu, MenuList, MenuButton, MenuItem } from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getGroupedRowModel,
  useReactTable,
  ColumnDef,
  CellContext,
  Row,
  ColumnSizingState,
  ColumnResizeMode,
} from '@tanstack/react-table'
import _ from 'lodash'
import { Emoji, EmojiClickData } from 'emoji-picker-react';


import { 
  AppIdeaFragment, 
  AppIdeaMetadataGroupFragment, 
  useDeleteIdeaMetadataFieldMutation, 
  useUpdateIdeaMetadataFieldMutation, 
  useAddIdeaMetadataFieldMutation, 
  useAddIdeaMetadataTemplateMutation,
  useDeleteIdeaMetadataTemplateMutation,
  useGetMetadataTemplatesQuery,
  AppIdeaMetadataFieldFragment,
} from '@gql/operations'

import { IdeaLocalFieldHeader, IdeaReadonlyFieldHeader } from '@components/table'
import { IdeaFieldCell } from '../../metadata-template-editor/components/table-editor/components'

interface DataRowProps {
  group: AppIdeaMetadataGroupFragment
  row: Row<AppIdeaMetadataFieldFragment>
  isLocal: boolean;
  ideaId: string;
  hasExternalData: boolean;
}

const DataRow = React.memo(({ row, isLocal, ideaId, group, hasExternalData }: DataRowProps) => {
  return (
    <Tr role="group">
      {hasExternalData && (
        <Td width={`${row.getAllCells()[0].column.getSize()}px`}>
          {group.template?.unicodeIcon && <Emoji unified={group.template?.unicodeIcon} size={16} />}
        </Td>
      )}
      <Td width={`${row.getAllCells()[0].column.getSize()}px`}>
        {isLocal ? <IdeaLocalFieldHeader ideaId={ideaId} entry={row.original} /> : <IdeaReadonlyFieldHeader ideaId={ideaId} entry={row.original} />}
      </Td>
      <Td width={`${row.getAllCells()[1].column.getSize()}px`}>
        <IdeaFieldCell entry={row.original} ideaId={ideaId} />
      </Td>
      {/* <Td sx={{ border: 'none' }}>
        <Box minWidth="80px" width="80px">
          {
              isLocal && (
                <IconButton onClick={() => onDeleteField(row.original.id)}
                  size="xs"
                  sx={{
                    m: '0px',
                    display: 'none',
                    p: '0px'
                  }}
                  _groupHover={{
                    display: 'initial',
                  }} aria-label='delete' icon={<DeleteIcon />} 
                />
              )
            }
        </Box>
      </Td> */}
    </Tr>
  )
}, (prevProps, nextProps) => {
  return _.isEqual(prevProps.row.original, nextProps.row.original)
})

interface MetadataEditorProps {
  idea: AppIdeaFragment;
}

export const MetadataEditor = ({ idea }: MetadataEditorProps) => {
  const columnHelper = createColumnHelper<AppIdeaMetadataFieldFragment>()

  const hasExternalData = useMemo(() => {
    return idea.metadata.groups.find((group) => group.context !== 'local')
  }, [idea])

  const columns = useMemo(() => {
    let allColumns = []

    if (hasExternalData) {
      allColumns.push(
        columnHelper.display({
          id: 'template',
          size: 50,
        })
      )
    }

    allColumns = [
      ...allColumns,
      columnHelper.display({
        id: 'schema',
        size: 150,
      }),
      columnHelper.display({
        id: 'value',
      })
    ]

    return allColumns
  }, [hasExternalData, idea.metadata.groups])

  const getSubRows = useCallback((row: AppIdeaMetadataGroupFragment, index: number) => {
    return row.fields
  }, [])

  const data = useMemo(() => {
    return idea.metadata?.groups || []
  }, [idea.metadata?.groups])

  const table = useReactTable<any>({
    // @ts-ignore
    columns,
    // @ts-ignore
    data,
    // @ts-ignore
    getSubRows,
    manualGrouping: true,
    enableGrouping: true,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    meta: {
      updateValue: () => {

      },
      updateText: () => {

      }
    },
    debugAll: true,
  })

  return (
    <TableContainer>
      <Table size="zero" variant="ghost" width="100%">
        <Tbody>
          {table.getGroupedRowModel().rows.map((row: Row<AppIdeaMetadataGroupFragment>, i) => {
              return (
                <React.Fragment key={row.id}>
                  {row.subRows.map((subRow: any, i) => <DataRow key={subRow.id} ideaId={idea.id} row={subRow} isLocal={row.original.context === 'local'} group={row.original} hasExternalData={hasExternalData} />)}
                </React.Fragment>
              )
            })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

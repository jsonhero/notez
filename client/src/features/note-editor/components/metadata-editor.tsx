import React, { useMemo, useEffect, useState, useCallback } from 'react'

import { Th, Thead, Tr, Td, Tbody, Table, TableContainer, Input, Text, Box, Flex, Button, IconButton, Icon } from '@chakra-ui/react'
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
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import _ from 'lodash'

import { 
  AppIdeaFragment, 
  AppIdeaMetadataGroupFragment, 
  useDeleteIdeaMetadataFieldMutation, 
  useUpdateIdeaMetadataFieldMutation, 
  useAddIdeaMetadataFieldMutation, 
  AppIdeaMetadataFieldFragment 
} from '@gql/operations'

interface UpdateMetadataFieldCellProps extends CellContext<AppIdeaMetadataFieldFragment, any> {
  onUpdate: (fieldId: string, name: string, type: string) => void;
}

const UpdateMetadataFieldCell = ({
  cell,
  getValue,
  onUpdate,
}: UpdateMetadataFieldCellProps) => {
  const initialValue = getValue() as string

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState<string>(initialValue || '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    onUpdate(cell.row.original.id, value, cell.row.original.schema.type)
  }

  return <Input
            w="100%"
            size="xs"
            sx={{
              fontWeight: 'bold',
              m: '0px',
              p: '0px',
              outline: 'none',
              border: 'none',
            }}
            // _focusVisible={{
            //   outline: 'none',
            //   border: 'none',
            // }}
            value={value} 
            onChange={onChange} 
            onBlur={onBlur} 
          />
}


interface UpdateMetadataValueCellProps extends CellContext<AppIdeaMetadataFieldFragment, any> {
  onUpdate: (fieldId: string, value: any) => void;
}

const UpdateMetadataValueCell = ({
  cell,
  getValue,
  onUpdate,
}: UpdateMetadataValueCellProps) => {
  const initialValue = getValue()
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState<string>(initialValue || '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    onUpdate(cell.row.original.id, value)
  }


  return <Input
            w="100%"
            size="xs"
            sx={{
              m: '0px',
              p: '0px',
              outline: 'none',
              border: 'none',
            }}
            // _focusVisible={{
            //   outline: 'none',
            //   border: 'none',
            // }}
            value={value} 
            onChange={onChange} 
            onBlur={onBlur} 
          />
}

interface DataRowProps {
  row: Row<AppIdeaMetadataFieldFragment>
  onDeleteField: (fieldId: string) => void;
  isLocal: boolean;
}

const DataRow = React.memo(({ row, onDeleteField, isLocal }: DataRowProps) => {
  return (
    <Tr role="group" _hover={{
      bg: 'gray.50'
    }}>
      {row.getVisibleCells().map(cell => {
        return (
          <Td key={cell.id}>
            {flexRender(
              cell.column.columnDef.cell,
              { ...cell.getContext(), isLocal }
            )}
          </Td>
        )
      })}
      <Td sx={{ border: 'none' }}>
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
      </Td>
    </Tr>
  )
}, (prevProps, nextProps) => {
  return _.isEqual(prevProps.row.original, nextProps.row.original)
})

interface MetadataEditorProps {
  idea: AppIdeaFragment;
}


export const MetadataEditor = ({ idea }: MetadataEditorProps) => {

  const [, addMetadataFieldMutation] = useAddIdeaMetadataFieldMutation()
  const [, updateMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()
  const [, deleteMetadataFieldMutation] = useDeleteIdeaMetadataFieldMutation()

  const onAddRow = () => {
    addMetadataFieldMutation({
      input: {
        ideaId: idea.id,
      }
    })
  }

  const onUpdateValue = (fieldId: string, value: any) => {
    updateMetadataFieldMutation({
      input: {
        ideaId: idea.id,
        fieldId: fieldId,
        field: {
          value,
        }
      }
    })
  }

  const onUpdateField = (fieldId: string, name: string, type: string) => {
    updateMetadataFieldMutation({
      input: {
        ideaId: idea.id,
        fieldId: fieldId,
        field: {
          name,
          type,
        }
      }
    })
  }

  const onDeleteField = (fieldId: string) => {
    deleteMetadataFieldMutation({
      input: {
        clientMutationId: '123',
        fieldId,
        ideaId: idea.id,
      }
    })
  }

  const columnHelper = createColumnHelper<AppIdeaMetadataFieldFragment>()

  const columns = [
    columnHelper.accessor('schema.name', {
      cell: (props) => {
        // @ts-ignore
        if (!props.isLocal) {
          return <Text fontWeight={"bold"} fontSize="xs">{props.getValue()}</Text>
        }

        return <UpdateMetadataFieldCell {...props} onUpdate={onUpdateField} />
      },
    }),
    columnHelper.accessor('value', {
      cell: (props) => {
        return <UpdateMetadataValueCell {...props} onUpdate={onUpdateValue} />
      }
    }),
  ]

  const groupingState = useMemo(() => ['groupId'], [])
  const getSubRows = useCallback((row: AppIdeaMetadataGroupFragment, index: number) => {
    return row.fields
  }, [])

  const table = useReactTable<any>({
    // @ts-ignore
    columns,
    // @ts-ignore
    data: (idea.metadata?.groups || []),
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
    <TableContainer mb="medium">
      <Table size="sm">
        <Tbody>
          {table.getGroupedRowModel().rows.map((row: Row<AppIdeaMetadataGroupFragment>, i) => {
            return (
              <React.Fragment key={row.id}>
                <Tr>
                  <Td colSpan={2} sx={{
                      bg: 'gray.100',
                  }}>
                    {row.original.template?.id ?  row.original.template.title : 'Local'}
                  </Td>
                </Tr>
                {row.subRows.map((subRow: any, i) => <DataRow key={subRow.id} row={subRow} onDeleteField={onDeleteField} isLocal={row.original.context === 'local'} />)}
              </React.Fragment>
            )
          })}
          <Tr onClick={onAddRow} _hover={{
              cursor: 'pointer',
              bg: 'gray.50'
          }}>
            <Td colSpan={2}>
              <Text fontSize="xs" fontWeight="bold" color="blue.500">Add Row</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
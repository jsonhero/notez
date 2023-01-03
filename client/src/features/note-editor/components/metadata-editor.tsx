import React, { useMemo, useEffect, useState, useCallback } from 'react'

import { Th, Thead, Tr, Td, Tbody, Table, TableContainer, Input, Text, Box, Flex, Button, IconButton } from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getGroupedRowModel,
  useReactTable,
  ColumnDef,
  CellContext,
  Row,
} from '@tanstack/react-table'
// import {} from '_'

import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

import { AppIdeaFragment, AppIdeaMetadataGroupFragment, useDeleteIdeaMetadataFieldMutation, useUpdateIdeaMetadataFieldMutation, useAddIdeaMetadataFieldMutation, AppIdeaMetadataFieldFragment } from '@gql/operations'


interface UpdateMetadataFieldCellProps extends CellContext<AppIdeaMetadataFieldFragment, unknown> {
  onUpdate: (fieldId: string, name: string, type: string) => void;
}

const UpdateMetadataFieldCell = ({
  cell,
  getValue,
  onUpdate,
}: UpdateMetadataFieldCellProps) => {
  const initialValue = getValue() as string

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState<string>(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    onUpdate(cell.row.original.id, value, cell.row.original.schema.type)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Input
            w="initial"
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
            value={value as string} 
            onChange={onChange} 
            onBlur={onBlur} 
          />
}


interface UpdateMetadataValueCellProps extends CellContext<AppIdeaMetadataFieldFragment, unknown> {
  onUpdate: (fieldId: string, value: any) => void;
}

const UpdateMetadataValueCell = ({
  cell,
  getValue,
  onUpdate,
}: UpdateMetadataValueCellProps) => {
  
  const initialValue = getValue()
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    onUpdate(cell.row.original.id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Input
            w="initial"
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
            value={value as string} 
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
    <Tr key={row.id} role="group" _hover={{
      bg: 'gray.50'
    }}>
      {row.getVisibleCells().map(cell => {
        return (
          <Td key={cell.id} sx={{
              pb: 'xxsm',
              pt: 'xxsm',
              paddingInlineStart: 'sm',
              borderRight: '1px solid',
              borderColor: 'gray.200',
              borderRightColor: 'gray.200'
            }}
          >
            {flexRender(
              cell.column.columnDef.cell,
              { ...cell.getContext(), isLocal }
            )}
          </Td>
        )
      })}
      <Flex width={"80px"}>
        {
          isLocal && (
            <IconButton onClick={() => onDeleteField(row.original.id)} 
              ml="xsm" size="xs" mt="xxsm" display="none" _groupHover={{
                display: 'initial',
              }} aria-label='delete' icon={<DeleteIcon />} 
            />
          )
        }
      </Flex>
    </Tr>
  )
}, (prevProps, nextProps) => {
  return prevProps.row.original.id === nextProps.row.original.id
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
        console.log(props, 'props')
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
    <TableContainer mb="medium" w="600px" sx={{
      borderTop: '1px solid',
      borderLeft: '1px solid',
      borderColor: 'gray.200',
    }}>
      <Table>
        <Tbody>
          {table.getGroupedRowModel().rows.map((row: Row<AppIdeaMetadataGroupFragment>, i) => {
            return (
              <>
                <Tr key={row.id}>
                  <Td colSpan={2} sx={{
                      bg: 'gray.100',
                      pb: 'xxsm',
                      pt: 'xxsm',
                      paddingInlineStart: 'sm',
                      borderRight: '1px solid',
                      borderColor: 'gray.200',
                      borderRightColor: 'gray.200'
                  }}>
                    {row.original.template?.title || 'Local'}
                  </Td>
                </Tr>
                {row.subRows.map((subRow: any) => <DataRow key={row.id} row={subRow} onDeleteField={onDeleteField} isLocal={row.original.context === 'local'} />)}
              </>
            )
          })}
          <Tr onClick={onAddRow} _hover={{
              cursor: 'pointer',
              bg: 'gray.50'
          }}>
            <Td colSpan={2} sx={{
                pb: 'xxsm',
                pt: 'xxsm',
                paddingInlineStart: 'sm',
                borderRight: '1px solid',
                borderColor: 'gray.200',
                borderRightColor: 'gray.200'
              }}
            >
              <Text fontSize="xs" fontWeight="bold" color="blue.500">Add Row</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
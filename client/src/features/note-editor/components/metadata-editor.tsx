import React, { useMemo, useEffect, useState } from 'react'

import { Th, Thead, Tr, Td, Tbody, Table, TableContainer, Input, Text, Box, Flex, Button, IconButton } from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  CellContext,
  Row,
} from '@tanstack/react-table'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

import { AppNoteFragment, useDeleteNoteMetadataFieldMutation, useUpdateNoteMetadataFieldMutation, useAddNoteMetadataFieldMutation, AppNoteMetdataFieldFragment } from '@gql/operations'

interface UpdateMetadataFieldCellProps extends CellContext<AppNoteMetdataFieldFragment, unknown> {
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


interface UpdateMetadataValueCellProps extends CellContext<AppNoteMetdataFieldFragment, unknown> {
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
  row: Row<AppNoteMetdataFieldFragment>
  onDeleteField: (fieldId: string) => void;
}

const DataRow = React.memo(({ row, onDeleteField }: DataRowProps) => {
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
              cell.getContext()
            )}
          </Td>
        )
      })}
      <Flex width={"80px"}>
        <IconButton onClick={() => onDeleteField(row.original.id)} 
          ml="xsm" size="xs" mt="xxsm" display="none" _groupHover={{
            display: 'initial',
          }} aria-label='delete' icon={<DeleteIcon />} 
        />
      </Flex>
    </Tr>
  )
}, (prevProps, nextProps) => {
  return prevProps.row.original.id === nextProps.row.original.id
})

interface MetadataEditorProps {
  note: AppNoteFragment;
}

export const MetadataEditor = ({ note }: MetadataEditorProps) => {

  const [, addMetadataFieldMutation] = useAddNoteMetadataFieldMutation()
  const [, updateMetadataFieldMutation] = useUpdateNoteMetadataFieldMutation()
  const [, deleteMetadataFieldMutation] = useDeleteNoteMetadataFieldMutation()

  const data = useMemo(() => {
    const groups = note.metadata?.groups
    const localGroup = groups?.find((group) => group.context === 'local')
    return localGroup?.fields || []
  }, [note])

  const onAddRow = () => {
    addMetadataFieldMutation({
      input: {
        noteId: note.id,
      }
    })
  }

  const onUpdateValue = (fieldId: string, value: any) => {
    updateMetadataFieldMutation({
      input: {
        noteId: note.id,
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
        noteId: note.id,
        fieldId: fieldId,
        field: {
          schema: {
            name,
            type,
          }
        }
      }
    })
  }

  const onDeleteField = (fieldId: string) => {
    deleteMetadataFieldMutation({
      input: {
        clientMutationId: '123',
        fieldId,
        noteId: note.id,
      }
    })
  }

  const columnHelper = createColumnHelper<AppNoteMetdataFieldFragment>()

  const columns = [
    columnHelper.accessor('schema.name', {
      cell: (props) => {
        return <UpdateMetadataFieldCell {...props} onUpdate={onUpdateField} />
      },
    }),
    columnHelper.accessor('value', {
      cell: (props) => {
        return <UpdateMetadataValueCell {...props} onUpdate={onUpdateValue} />
      }
    }),
  ]

  const table = useReactTable({
    columns,
    // @ts-ignore
    data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateValue: () => {

      },
      updateText: () => {

      }
    }
  })

  return (
    <TableContainer mb="medium" w="400px" sx={{
      borderTop: '1px solid',
      borderLeft: '1px solid',
      borderColor: 'gray.200',
    }}>
      <Table>
        <Tbody>
          {table.getRowModel().rows.map((row, i) => {
            return (
              <DataRow row={row} onDeleteField={onDeleteField} />
            )
          })}
          <Tr onClick={onAddRow} _hover={{
              cursor: 'pointer',
              bg: 'gray.50'
          }}>
            <Td pb="xxsm" pt="xxsm" colSpan={2} sx={{
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
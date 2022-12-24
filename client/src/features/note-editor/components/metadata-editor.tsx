import React, { useMemo, useEffect, useState } from 'react'

import { Th, Thead, Tr, Td, Tbody, Table, TableContainer, Input, Text, Box, Button } from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  CellContext
} from '@tanstack/react-table'
import { AddIcon } from '@chakra-ui/icons'

import { 
  useNoteControllerAddMetadataField, 
  useNoteControllerUpdateMetadataFieldValue, 
  useNoteControllerUpdateMetadataField 
} from '@api'
import { NoteDto, MetadataGroupFieldDto } from '@api/models'

interface UpdateMetadataFieldCellProps extends CellContext<MetadataGroupFieldDto, unknown> {
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


interface UpdateMetadataValueCellProps extends CellContext<MetadataGroupFieldDto, unknown> {
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

interface MetadataEditorProps {
  note: NoteDto;
}

export const MetadataEditor = ({ note }: MetadataEditorProps) => {

  const { mutate: mutateAddMetadataField } = useNoteControllerAddMetadataField()
  const { mutate: mutateUpdateMetadataValue } = useNoteControllerUpdateMetadataFieldValue()
  const { mutate: mutateUpdateMetadataField } = useNoteControllerUpdateMetadataField()

  const data = useMemo(() => {
    console.log(note, 'note')
    const groups = note.metadata?.groups
    const localGroup = groups?.find((group) => group.context === 'local')
    return localGroup?.fields || []
  }, [note])

  const onAddRow = () => {
    mutateAddMetadataField({
      noteId: note.id,
      data: {
        name: '',
        type: 'text'
      }
    })
  }

  const onUpdateValue = (fieldId: string, value: any) => {
    mutateUpdateMetadataValue({
      noteId: note.id,
      data: {
        fieldId,
        value,
      },
    })
  }

  const onUpdateField = (fieldId: string, name: string, type: string) => {
    mutateUpdateMetadataField({
      noteId: note.id,
      data: {
        fieldId,
        name,
        type,
      }
    })
  }

  const columnHelper = createColumnHelper<MetadataGroupFieldDto>()

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
              <Tr key={row.id}>
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
              </Tr>
            )
          })}
          <Tr>
            <Td pb="xxsm" pt="xxsm" colSpan={2} sx={{
                pb: 'xxsm',
                pt: 'xxsm',
                paddingInlineStart: 'sm',
                borderRight: '1px solid',
                borderColor: 'gray.200',
                borderRightColor: 'gray.200'
              }}
            >
              <Button
                onClick={onAddRow}
                color="blue.500"
                leftIcon={<AddIcon />} 
                variant="ghost" size="xs" p="0px" m="0px">Add Row</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
import React, { useMemo, useEffect, useState, useCallback } from 'react'

import { Th, Thead, Tr, Td, Tbody, Table, TableContainer, Input, Text, Box, Flex, Button, IconButton, Icon, HStack } from '@chakra-ui/react'
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
  useAddIdeaMetadataTemplateMutation,
  useDeleteIdeaMetadataTemplateMutation,
  AppIdeaMetadataFieldFragment,
} from '@gql/operations'

import { IdeaFieldCell } from '../../metadata-template-editor/components/table-editor/components'
import { IdeaLocalFieldHeader, IdeaReadonlyFieldHeader } from '@components/table'

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

interface DataRowProps {
  row: Row<AppIdeaMetadataFieldFragment>
  onDeleteField: (fieldId: string) => void;
  isLocal: boolean;
  ideaId: string;
}

const DataRow = React.memo(({ row, onDeleteField, isLocal, ideaId }: DataRowProps) => {
  return (
    <Tr role="group" _hover={{
      bg: 'gray.50'
    }}>
      <Td>
        {isLocal ? <IdeaLocalFieldHeader ideaId={ideaId} entry={row.original} /> : <IdeaReadonlyFieldHeader ideaId={ideaId} entry={row.original} />}
      </Td>
      <Td borderRight="none">
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

  const [, addMetadataFieldMutation] = useAddIdeaMetadataFieldMutation()
  const [, deleteMetadataFieldMutation] = useDeleteIdeaMetadataFieldMutation()
  const [, deleteIdeaMetadataTemplateMutation] = useDeleteIdeaMetadataTemplateMutation()

  const onAddRow = () => {
    addMetadataFieldMutation({
      input: {
        ideaId: idea.id,
      }
    })
  }

  const onDeleteTemplate = (metadataTemplateId: string) => {
    deleteIdeaMetadataTemplateMutation({
      input: {
        ideaId: idea.id,
        metadataTemplateId,
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

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'schema',
    }),
    columnHelper.display({
      id: 'value',
    }),
  ], [])

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
    <TableContainer mb="medium" border="1px solid" borderColor="gray.100" borderRadius="8px" p="sm">
      <Table size="zero" variant="simple" width="100%">
        <Tbody>
          {table.getGroupedRowModel().rows.map((row: Row<AppIdeaMetadataGroupFragment>, i) => {
            return (
              <React.Fragment key={row.id}>
                <Tr>
                  <Td colSpan={2} sx={{
                      w: "100%",
                      flex: 1,
                      bg: 'gray.100',
                  }}>
                    <HStack justify="space-between">
                      <Text color="gray.500" ml="xsm" fontSize="sm" fontWeight="bold">{row.original.template?.id ?  row.original.template.title : 'Local'}</Text>

                      {row.original.template?.id && <Button onClick={() => onDeleteTemplate(row.original.template?.id)} size="xs" variant="ghost">Remove</Button>}
                    </HStack>
                  </Td>
                </Tr>
                {row.subRows.map((subRow: any, i) => <DataRow key={subRow.id} ideaId={idea.id} row={subRow} onDeleteField={onDeleteField} isLocal={row.original.context === 'local'} />)}
              </React.Fragment>
            )
          })}
          <Tr onClick={onAddRow} _hover={{
              cursor: 'pointer',
              bg: 'gray.50',
          }}>
            <Td colSpan={2}>
              <Text p="xxsm" fontSize="xs" fontWeight="bold" color="blue.400">Add Row</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
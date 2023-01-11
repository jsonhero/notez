import React, { useMemo, useState } from 'react'
import { Table, TableContainer, Thead, Tbody, Tr, Td, Th, Box, HStack, Text, IconButton, Icon } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { BsLightbulb } from 'react-icons/bs'
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, ColumnSizingState } from '@tanstack/react-table'

import { 
  AppMetadataTemplateFragment, 
  useCreateIdeaMutation, 
  useAddMetadataTemplateFieldMutation, 
  useGetIdeasQuery 
} from '@gql/operations'

import {
  IdeaDataRow,
  IdeaDataRowFields,
  IdeaFieldCell,
  IdeaFieldHeader,
  IdeaRefCell
} from './components'


interface TableEditorProps {
  metadataTemplate: AppMetadataTemplateFragment;
}

export const TableEditor = ({
  metadataTemplate
}: TableEditorProps) => {

  const [, createIdeaMutation] = useCreateIdeaMutation()
  const [, addMetadataTemplateFieldMutation] = useAddMetadataTemplateFieldMutation()
  const [response] = useGetIdeasQuery({
    variables: {
      input: {
        metadataTemplateIds: [metadataTemplate.id],
      },
    },

    // Maybe I need to update the fragments vs query hmm...

    // Need to figure out cache for adding field/templates to idea
    requestPolicy: 'cache-and-network'
  })


  const data: IdeaDataRowFields[] = useMemo(() => {
    return response.data?.ideas.map((idea) => {
      const row: IdeaDataRowFields = {
        idea,
        fields: {} 
      }



      const group = idea.metadata.groups.find((group) => group.context === 'external' && group.template?.id === metadataTemplate.id)

      metadataTemplate.schema.fields.forEach((templateField) => {
        const ideaField = group?.fields.find((field) => field.schema.id === templateField.id) 
        row.fields[templateField.id] = ideaField || null
      })

      return row;
    }) || []
  }, [response.data?.ideas, metadataTemplate.id, metadataTemplate.schema.fields])

  const onAddRow = () => {
    createIdeaMutation({
      input: {
        metadataTemplateIds: [metadataTemplate.id],
      }
    })
  }

  const onAddField = () => {
    addMetadataTemplateFieldMutation({
      input: {
        metadataTemplateId: metadataTemplate.id,
      }
    })
  }
  
  const columnHelper = createColumnHelper<IdeaDataRowFields>()

  const columns = useMemo(() => {
    const defaultColumns = [
      columnHelper.accessor('idea', {
        minSize: 100,
        maxSize: 500,
      })
    ]

    const dynamicFieldsColumns = metadataTemplate.schema.fields.map((field) => {
      return columnHelper.accessor(`fields.${field.id}`, {
        minSize: 100,
        maxSize: 500,
        meta: {
          field,
        },
      })
    })

    return [...defaultColumns, ...dynamicFieldsColumns]
  }, [metadataTemplate.schema.fields])


  const [columnSizingState, setColumnSizingState] = useState<ColumnSizingState>({})

  const table = useReactTable({
    columnResizeMode: 'onChange',
    state: {
      columnSizing: columnSizingState,
    },
    onColumnSizingChange: setColumnSizingState,
    columns,
    enableColumnResizing: true,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <TableContainer ml="-30px" pb="200px">
      <Table size="zero" variant="simple" width="100%">
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id} display="flex">
                <Th border="none" width="30px"></Th>
                {headerGroup.headers.map(header => (
                  <Th position="relative" key={header.id} width={`${header.getSize()}px`}>
                    {header.column.id === 'idea'
                      ? (
                        <HStack height="100%">
                          <Icon boxSize="14px" as={BsLightbulb} />
                          <Text fontSize="xs" textTransform={"capitalize"}>Idea</Text>
                        </HStack>
                      )
                      // @ts-ignore
                      : <IdeaFieldHeader metadataTemplateId={metadataTemplate.id} field={header.column.columnDef.meta?.field} />}
                        <Box sx={{
                          position: 'absolute',
                          opacity: header.column.getIsResizing() ? 1 : 0,
                          right: 0,
                          top: 0,
                          height: '100%',
                          width: '5px',
                          background: 'green',
                          cursor: 'col-resize',
                          userSelect: 'none',
                        }} _hover={{
                          opacity: 1,
                        }} onMouseDown={header.getResizeHandler()}>

                        </Box>
                  </Th>
                ))}
                <Th sx={{
                  flex: 1,
                  minWidth: 100,
                }}>
                  <IconButton variant="ghost" onClick={onAddField} size="xs" aria-label='Add Field' icon={<AddIcon />}/>
                </Th>
              </Tr>
            ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, i) => {
            return <IdeaDataRow key={row.id} row={row} metadataTemplateId={metadataTemplate.id} />
          })}
          <Tr display="flex" onClick={onAddRow} _hover={{
              cursor: 'pointer',
              bg: 'gray.50'
          }}>
            <Td border="none" width="30px"></Td>
            <Td width="100%" colSpan={metadataTemplate.schema.fields.length + 2}>
              <Box py="xxsm">
                <Text fontSize="xs" fontWeight="bold" color="blue.500">Add Row</Text>
              </Box>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )

}
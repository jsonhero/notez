import React, { useMemo } from 'react'
import { Table, TableContainer, Thead, Tbody, Tr, Td, Th, Box, HStack, Text, IconButton, Icon } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { BsLightbulb } from 'react-icons/bs'
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

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
        header: (props) => (
          <HStack height="100%">
            <Icon boxSize="14px" as={BsLightbulb} />
            <Text textTransform={"capitalize"}>Idea</Text>
          </HStack>
        ),
        cell: (props) => <IdeaRefCell {...props} />,
      })
    ]

    const dynamicFieldsColumns = metadataTemplate.schema.fields.map((field) => {
      return columnHelper.accessor(`fields.${field.id}`, {
        minSize: 100,
        maxSize: 500,
        header: (props) => <IdeaFieldHeader metadataTemplateId={metadataTemplate.id} field={field} {...props} />,
        cell: (props) => <IdeaFieldCell {...props} />
      })
    })

    return [...defaultColumns, ...dynamicFieldsColumns]
  }, [metadataTemplate.schema.fields])

  const table = useReactTable({
    columnResizeMode: 'onChange',
    columns,
    enableColumnResizing: true,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContainer ml="-30px" pb="200px">
      <Table size="zero" variant="simple" width={table.getCenterTotalSize()}>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id} display="flex">
                <Th border="none" width="30px"></Th>
                {headerGroup.headers.map(header => (
                  <Th position="relative" key={header.id} width={`${header.getSize()}px`}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                <Th>
                  <IconButton onClick={onAddField} size="xs" aria-label='Add Field' icon={<AddIcon />}/>
                </Th>
              </Tr>
            ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, i) => {
            return <IdeaDataRow key={row.id} row={row} />
          })}
          <Tr display="flex" onClick={onAddRow} _hover={{
              cursor: 'pointer',
              bg: 'gray.50'
          }}>
            <Td border="none" width="46px"></Td>
            <Td colSpan={metadataTemplate.schema.fields.length + 2}>
              <Text fontSize="xs" fontWeight="bold" color="blue.500">Add Row</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )

}
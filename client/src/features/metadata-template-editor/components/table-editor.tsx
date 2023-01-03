import React, { useMemo, useContext, useState, useEffect } from 'react'

import { Th, Thead, Tr, Td, Tbody, Table, TableContainer, Input, HStack, Text, Box, Flex, Button, IconButton, Icon } from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  CellContext,
  HeaderContext,
  Row,
} from '@tanstack/react-table'
import { AddIcon } from '@chakra-ui/icons'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { GlobalStoreContext  } from '@stores/global'

import { AppMetadataTemplateFragment, AppIdeaFragment, AppMetadataTemplateSchemaFieldFragment, AppIdeaMetadataFieldFragment, useGetIdeasQuery, useCreateIdeaMutation, useAddMetadataTemplateFieldMutation, useUpdateMetadataTemplateFieldMutation } from '@gql/operations'

interface IdeaRefCellCellProps extends CellContext<AppIdeaFragment, AppIdeaFragment> {
}
const IdeaRefCell = ({
  cell,
  getValue,
}: IdeaRefCellCellProps) => {
  const initialValue = getValue()
  const navigate = useNavigate()
  const globalStore = useContext(GlobalStoreContext)

  const onClickIdeaLink = (ideaId: string) => {
    globalStore.setSelectedIdeaId(ideaId)
    navigate({
      search: createSearchParams({
        tab: 'idea'
      }).toString()
    })
  }


  // console.log(initialValue)
  // We need to keep and update the state of the cell normally
  // const [value, setValue] = useState(initialValue)

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value)
  // }

  // const onBlur = () => {
  //   onUpdate(cell.row.original.id, value)
  // }

  // useEffect(() => {
  //   setValue(initialValue)
  // }, [initialValue])

  return (
    <HStack>
      <Button onClick={() => onClickIdeaLink(initialValue.id)} variant="link">{initialValue.title || "Untitled"}</Button>
    </HStack>
  )
}

interface FieldHeaderProps extends HeaderContext<any, any> {
  field: AppMetadataTemplateSchemaFieldFragment;
  metadataTemplateId: string;
}

const FieldHeader = React.memo(({
  field,
  header,
  metadataTemplateId,
}: FieldHeaderProps) => {
  const [, updateMetadataTemplateFieldMutation] = useUpdateMetadataTemplateFieldMutation()

  const [name, setName] = useState<string>(field.name)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onBlur = () => {
    updateMetadataTemplateFieldMutation({
      input: {
        metadataTemplateId,
        fieldId: field.id,
        field: {
          name,
          type: field.type,
        },
      }
    })
  }

  return (
    <HStack>
      <Input
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
        placeholder="Untitled"
        value={name} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
    </HStack>
  )
}, (prevProps, nextProps) => {
  return prevProps.field.id === nextProps.field.id
})


interface FieldCellProps extends CellContext<AppIdeaMetadataFieldFragment, AppIdeaMetadataFieldFragment> {

}

const FieldCell = ({
  cell,
  getValue,
}: FieldCellProps) => {
  const initialValue = getValue()

  const [value, setValue] = useState<string>(initialValue.value as string)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    // onUpdate(cell.row.original.id, value)
  }

  useEffect(() => {
    setValue(initialValue.value as string)
  }, [initialValue])

  return (
    <HStack>
      <Input
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
        placeholder="null"
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
    </HStack>
  )
}


interface DataRowProps {
  row: Row<AppIdeaFragment>;
}

const DataRow = React.memo(({ row }: DataRowProps) => {
  return (
    <Tr role="group" _hover={{
      bg: 'gray.50'
    }}>
      {row.getVisibleCells().map((cell) => {
        return (
          <Td key={cell.id}>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </Td>
        )
      })}
      <Td></Td>
    </Tr>
  )
}, (prevProps, nextProps) => {
  // @ts-ignore
  return prevProps.row.original.idea.id === nextProps.row.original.idea.id
})

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

    // Need to figure out cache for adding field/templates to idea
    requestPolicy: 'network-only'
  })

  const data = useMemo(() => {
    return response.data?.ideas.map((idea) => {
      const fields: any = {
        idea,
      }

      const group = idea.metadata.groups.find((group) => group.context === 'external' && group.template?.id === metadataTemplate.id)
      group?.fields.forEach((field) => {
        fields[field.schema.id] = field
      })
      return fields;
    })
  }, [response.data?.ideas, metadataTemplate.id])

  console.log(data, 'data')

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
  
  const columnHelper = createColumnHelper<any>()

  const columns = useMemo(() => {
    const defaultColumns = [
      columnHelper.accessor('idea', {
        header: 'Idea',
        cell: (props) => <IdeaRefCell {...props} />,
        size: 300,
      })
    ]

    const dynamicFieldsColumns = metadataTemplate.schema.fields.map((field) => {
      return columnHelper.accessor(field.id, {
        header: (props) => <FieldHeader metadataTemplateId={metadataTemplate.id} field={field} {...props} />,
        cell: (props) => <FieldCell {...props} />
      })
    })

    return [...defaultColumns, ...dynamicFieldsColumns]
  }, [metadataTemplate.schema.fields])

  const table = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContainer>
      <Table>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th key={header.id} width={header.getSize()}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
            return <DataRow key={row.id} row={row} />
          })}
          <Tr onClick={onAddRow} _hover={{
              cursor: 'pointer',
              bg: 'gray.50'
          }}>
            <Td colSpan={metadataTemplate.schema.fields.length + 2}>
              <Text fontSize="xs" fontWeight="bold" color="blue.500">Add Row</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )

}
import React, { useMemo, useEffect, useState } from 'react'

import { Th, Thead, Tr, Td, Tbody, Table, TableContainer, Input } from '@chakra-ui/react'
import { useTable, Column, Row } from 'react-table';

interface EditableCellProps {
  value: any,
  row: Row,
  column: Column,
}

const EditableCell = ({
  value: initialValue,
  row,
  column,
}: EditableCellProps) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    // updateMyData(index, id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Input 
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

const defaultColumn = {
  Cell: EditableCell,
}


export const MetadataEditor = () => {
  const columns: Column[] = useMemo(() => [
    {
      Header: 'Test',
      accessor: 'test',
    }
  ], [])

  const data = useMemo(() => [
    {
      test: 'damn',
    }
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = useTable({
    columns,
    data,
    defaultColumn,
  })

  return (
    <TableContainer mb="medium">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
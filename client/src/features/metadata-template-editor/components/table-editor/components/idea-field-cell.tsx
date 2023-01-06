import React, { useState } from 'react'
import { CellContext } from '@tanstack/react-table'
import { HStack, Input, Textarea } from '@chakra-ui/react'

import { AppIdeaMetadataFieldFragment, useUpdateIdeaMetadataFieldMutation } from '@gql/operations'


import { IdeaDataRowFields} from './idea-data-row'

interface IdeaFieldCellProps extends CellContext<IdeaDataRowFields, AppIdeaMetadataFieldFragment | null> {

}

export const IdeaFieldCell = ({
  row,
  cell,
  getValue,
}: IdeaFieldCellProps) => {
  const initialValue = getValue()
  
  const [, updateIdeaMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()

  const [value, setValue] = useState<string>(initialValue?.value || '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  
  const onBlur = () => {
    if (initialValue?.id) {
      updateIdeaMetadataFieldMutation({
        input: {
          fieldId: initialValue?.id,
          ideaId: row.original.idea.id,
          field: {
            value,
          }
        }
      })
    }
  }

  return (
    <HStack>
      <Input
        w="initial"
        size="xs"
        sx={{
          fontWeight: 'bold',
          m: '0px',
          p: 'xs',
          outline: 'none',
          border: 'none',
        }}
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
    </HStack>
  )
}
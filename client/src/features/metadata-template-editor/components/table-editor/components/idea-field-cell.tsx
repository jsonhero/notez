import React, { useState, useMemo } from 'react'
import { CellContext } from '@tanstack/react-table'
import { HStack, Input } from '@chakra-ui/react'

import { AppIdeaMetadataFieldFragment, MetadataFieldTextValue, MetadataFieldNumberValue, useUpdateIdeaMetadataFieldMutation } from '@gql/operations'


import { IdeaDataRowFields} from './idea-data-row'

interface IdeaFieldCellProps extends CellContext<IdeaDataRowFields, AppIdeaMetadataFieldFragment | null> {

}

export const IdeaFieldCell = (props: IdeaFieldCellProps) => {
  const fieldEntry = props.getValue()
  
  if (fieldEntry?.value?.__typename === 'MetadataFieldTextValue' || (fieldEntry?.schema.type === 'text' && !fieldEntry.value)) {

    if (fieldEntry?.value?.__typename === 'MetadataFieldTextValue') {
      return (
        <IdeaTextFieldCell {...props} value={fieldEntry?.value}  />
      )
    }
    return (
      <IdeaTextFieldCell {...props} value={null} />
    )
  }

  if (fieldEntry?.value?.__typename === 'MetadataFieldNumberValue') {
    return (
      <IdeaNumberFieldCell {...props} value={fieldEntry?.value} />
    )
  }

  return null
}

interface IdeaTextFieldCellProps extends CellContext<IdeaDataRowFields, AppIdeaMetadataFieldFragment | null> {
  value: MetadataFieldTextValue | null;
}


export const IdeaTextFieldCell = ({
  row,
  cell,
  getValue,
  value,
}: IdeaTextFieldCellProps) => {
  const fieldEntry = getValue()

  const [, updateIdeaMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()

  const [text, setText] = useState<string>(value?.text || '')

  const hasSchemaTypeConflict = useMemo(() => {
    return fieldEntry?.schema.type !== 'text'
  }, [fieldEntry?.schema.type])


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  
  const onBlur = () => {
    // Make this better if value is null (field jsut added to schema)
    if (fieldEntry?.id) {
      updateIdeaMetadataFieldMutation({
        input: {
          fieldId: fieldEntry?.id,
          ideaId: row.original.idea.id,
          field: {
            value: text,
          }
        }
      })
    }
  }

  return (
    <HStack>
      <Input
        w="100%"
        size="xs"
        sx={{
          fontWeight: 'bold',
          m: '0px',
          p: 'xs',
          outline: 'none',
          border: 'none',
        }}
        isInvalid={hasSchemaTypeConflict}
        isDisabled={hasSchemaTypeConflict}
        value={text} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
    </HStack>
  )
}

interface IdeaNumberFieldCellProps extends CellContext<IdeaDataRowFields, AppIdeaMetadataFieldFragment | null> {
  value: MetadataFieldNumberValue | null;
}

export const IdeaNumberFieldCell = ({
  row,
  cell,
  getValue,
  value,
}: IdeaNumberFieldCellProps) => {
  const fieldEntry = getValue()

  const [, updateIdeaMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()

  const [number, setNumber] = useState<string>(value?.number.toString() || '')

  const hasSchemaTypeConflict = useMemo(() => {
    return fieldEntry?.schema.type !== 'number'
  }, [fieldEntry?.schema.type])

  console.log(hasSchemaTypeConflict, ':: conflict?')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value)
  }
  
  const onBlur = () => {
    // Make this better if value is null (field jsut added to schema)
    if (fieldEntry?.id) {
      updateIdeaMetadataFieldMutation({
        input: {
          fieldId: fieldEntry?.id,
          ideaId: row.original.idea.id,
          field: {
            value: number,
          }
        }
      })
    }
  }

  return (
    <HStack>
      <Input
        w="100%"
        size="xs"
        sx={{
          fontWeight: 'bold',
          m: '0px',
          p: 'xs',
          outline: 'none',
          border: 'none',
        }}
        isInvalid={hasSchemaTypeConflict}
        isDisabled={hasSchemaTypeConflict}
        type="number"
        value={number} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
    </HStack>
  )
}
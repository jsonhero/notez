import React, { useState, useMemo, useRef } from 'react'
import { CellContext } from '@tanstack/react-table'
import { HStack, Input } from '@chakra-ui/react'

import { AppIdeaMetadataFieldFragment, MetadataFieldTextValue, MetadataFieldNumberValue, useUpdateIdeaMetadataFieldMutation } from '@gql/operations'


import { IdeaDataRowFields} from './idea-data-row'
import { BaseEditableCell } from './base-editable-cell'

interface IdeaFieldCellProps {
  entry: AppIdeaMetadataFieldFragment | null;
  ideaId: string;
}

export const IdeaFieldCell = React.memo((props: IdeaFieldCellProps) => {
  const entry = props.entry

  if (entry?.value?.__typename === 'MetadataFieldTextValue' || (entry?.schema.type === 'text' && !entry.value)) {

    if (entry?.value?.__typename === 'MetadataFieldTextValue') {
      return (
        <IdeaTextFieldCell {...props} value={entry?.value}  />
      )
    }
    return (
      <IdeaTextFieldCell {...props} value={null} />
    )
  }

  if (entry?.value?.__typename === 'MetadataFieldNumberValue' || (entry?.schema.type === 'number' && !entry.value)) {

    if (entry?.value?.__typename === 'MetadataFieldNumberValue') {
      return (
        <IdeaNumberFieldCell {...props} value={entry?.value}  />
      )
    }

    return (
      <IdeaNumberFieldCell {...props} value={null} />
    )
  }

  return null
}, (prevProps, nextProps) => {
  return prevProps.entry?.schema.updatedAt === nextProps.entry?.schema.updatedAt &&
    prevProps.entry?.value?.updatedAt === nextProps.entry?.value?.updatedAt
})

interface IdeaTextFieldCellProps {
  ideaId: string;
  entry: AppIdeaMetadataFieldFragment | null;
  value: MetadataFieldTextValue | null;
}


export const IdeaTextFieldCell = ({
  ideaId,
  entry,
  value,
}: IdeaTextFieldCellProps) => {
  const inputRef = useRef<HTMLInputElement>(null)  

  const [, updateIdeaMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()

  const [text, setText] = useState<string>(value?.text || '')

  const hasSchemaTypeConflict = useMemo(() => {
    return entry?.schema.type !== 'text'
  }, [entry?.schema.type])


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  
  const onBlur = () => {
    // Make this better if value is null (field jsut added to schema)
    if (entry?.id) {
      updateIdeaMetadataFieldMutation({
        input: {
          fieldId: entry?.id,
          ideaId,
          field: {
            value: {
              textInput: {
                text,
              }
            }
          }
        }
      })
    }
  }

  return (
    <BaseEditableCell ideaId={ideaId} fieldEntry={entry} isInvalid={hasSchemaTypeConflict} editableRef={inputRef}>
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
        _focusVisible={{
          outline: 'none',
          border: 'none',
        }}
        isDisabled={hasSchemaTypeConflict}
        value={text} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
    </BaseEditableCell>
  )
}

interface IdeaNumberFieldCellProps {
  ideaId: string;
  entry: AppIdeaMetadataFieldFragment | null;
  value: MetadataFieldNumberValue | null;
}

export const IdeaNumberFieldCell = ({
  ideaId,
  entry,
  value,
}: IdeaNumberFieldCellProps) => {
  const inputRef = useRef<HTMLInputElement>(null)  

  const [, updateIdeaMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()

  const [number, setNumber] = useState<string>(value?.number.toString() || '')

  const hasSchemaTypeConflict = useMemo(() => {
    return entry?.schema.type !== 'number'
  }, [entry?.schema.type])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value)
  }
  
  const onBlur = () => {
    // Make this better if value is null (field jsut added to schema)
    if (entry?.id) {
      updateIdeaMetadataFieldMutation({
        input: {
          fieldId: entry?.id,
          ideaId,
          field: {
            value: {
              numberInput: {
                number: parseInt(number),
              }
            },
          }
        }
      })
    }
  }

  return (
    <BaseEditableCell ideaId={ideaId} fieldEntry={entry} isInvalid={hasSchemaTypeConflict} editableRef={inputRef}>
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
        _focusVisible={{
          outline: 'none',
          border: 'none',
        }}
        isDisabled={hasSchemaTypeConflict}
        type="number"
        value={number} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
    </BaseEditableCell>
  )
}
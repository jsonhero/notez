import React, { useState, useMemo, useRef } from 'react'
import { CellContext } from '@tanstack/react-table'
import { 
  HStack,
  VStack,
  Input,
  Button,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
} from '@chakra-ui/react'

import { 
  AppIdeaMetadataFieldFragment,
  MetadataFieldTextValue,
  MetadataFieldNumberValue,
  MetadataFieldReferenceValue,
  useUpdateIdeaMetadataFieldMutation ,
  useGetMetadataTemplatesQuery,
  useGetIdeasQuery,
  AppIdeaFragment,
} from '@gql/operations'


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

  if (entry?.value?.__typename === 'MetadataFieldReferenceValue' || (entry?.schema.type === 'reference' && !entry.value)) {

    if (entry?.value?.__typename === 'MetadataFieldReferenceValue') {
      return (
        <IdeaReferenceFieldCell {...props} value={entry?.value}  />
      )
    }

    return (
      <IdeaReferenceFieldCell {...props} value={null} />
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



interface IdeaReferenceFieldCellProps {
  ideaId: string;
  entry: AppIdeaMetadataFieldFragment | null;
  value: MetadataFieldReferenceValue | null;
}

export const IdeaReferenceFieldCell = ({
  ideaId,
  entry,
  value,
}: IdeaReferenceFieldCellProps) => {
  const inputRef = useRef<HTMLInputElement>(null)  

  const [, updateIdeaMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()
  const [search, setSearch] = useState<string>('')

  const [response] = useGetIdeasQuery({
    pause: search.length === 0,
    variables: {
      input: {
        title: search,
      }
    }
  })

  const hasSchemaTypeConflict = useMemo(() => {
    return entry?.schema.type !== 'reference'
  }, [entry?.schema.type])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  
  const onClickIdea = (idea: AppIdeaFragment) => {
    // // Make this better if value is null (field jsut added to schema)
    if (entry?.id) {
      updateIdeaMetadataFieldMutation({
        input: {
          fieldId: entry?.id,
          ideaId,
          field: {
            value: {
              referenceInput: {
                ideaId: idea.id,
                type: 'metadata',
              }
            },
          }
        }
      })
    }
  }

  return (
    <BaseEditableCell ideaId={ideaId} fieldEntry={entry} isInvalid={hasSchemaTypeConflict} editableRef={inputRef}>
      <Popover initialFocusRef={inputRef} placement="bottom">
        <PopoverTrigger>
          <Button
            variant="unstyled"
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
          >
            <Text>{value?.reference?.toIdea.title}</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Input 
            ref={inputRef} 
            value={search} 
            onChange={onChange} 
          />
          <Box p="xsm">
            <VStack align="flex-start">
              {response.data?.ideas.map((idea) => (
                <Button key={idea.id} variant="ghost" w="100%" onClick={() => onClickIdea(idea)}>
                  {idea.title || "Untitled"}
                </Button>
              ))}
            </VStack>
          </Box>
        </PopoverContent>

      </Popover>
    </BaseEditableCell>
  )
}

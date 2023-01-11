import React from 'react'
import { HStack, Button, ButtonProps, Popover, PopoverAnchor, PopoverContent, useDisclosure, Text } from '@chakra-ui/react'
import { BsExclamationCircle } from 'react-icons/bs'

import { AppIdeaMetadataFieldFragment, useUpdateIdeaMetadataFieldMutation } from '@gql/operations'

interface BaseEditableCellProps extends ButtonProps {
  children: React.ReactNode;
  editableRef: React.Ref<HTMLInputElement> | null;
  isInvalid?: boolean;
  fieldEntry?: AppIdeaMetadataFieldFragment | null;
  ideaId: string;
}

export const BaseEditableCell = ({ children, editableRef, ideaId, fieldEntry, isInvalid = false, ...props }: BaseEditableCellProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [, updateIdeaMetadataFieldMutation] = useUpdateIdeaMetadataFieldMutation()

  
  const onClickCell = (e: any) => {
    // @ts-ignore
    editableRef?.current?.focus()

    if (props.onClick) {
      props.onClick(e)
    }

    if (isInvalid) {
      onToggle()
    }
  }

  const onClickResetCell = () => {
    if (fieldEntry?.id) {
      updateIdeaMetadataFieldMutation({
        input: {
          fieldId: fieldEntry?.id,
          ideaId,
          field: {
            schema: {
              type: fieldEntry.schema.type,
            },
            value: null,
          }
        }
      })
    }
  }

  

  return (
    <Popover isOpen={isOpen}  placement='bottom-start' isLazy>
      <PopoverAnchor>
        <HStack 
          role="group"
          borderRadius="0px"
          border={isInvalid ? '1px solid' : 'none'}
          borderColor={isInvalid ? 'red' : 'blue'}
          _focusWithin={{
            border: '1px solid',
            borderColor: isInvalid ? 'red' : 'blue'
          }} 
          h="100%"
          w="100%"
          onClick={onClickCell}
          {...props}
        >
          {children}
        </HStack>
      </PopoverAnchor>
      <PopoverContent p="sm">
        <Text>Schema Type: {fieldEntry?.schema.type}</Text>
        <Text>Field Type: {fieldEntry?.value?.type}</Text>
        <Button onClick={onClickResetCell}>
          Reset Cell
        </Button>
      </PopoverContent>
    </Popover>
  )
}
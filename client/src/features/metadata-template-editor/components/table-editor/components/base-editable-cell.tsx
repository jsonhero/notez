import React from 'react'
import { HStack, Button, ButtonProps, IconButton, Icon } from '@chakra-ui/react'
import { BsExclamationCircle } from 'react-icons/bs'

interface BaseEditableCellProps extends ButtonProps {
  children: React.ReactNode;
  editableRef: React.Ref<HTMLInputElement> | null;
  isInvalid?: boolean;
}

export const BaseEditableCell = ({ children, editableRef, isInvalid = false, ...props }: BaseEditableCellProps) => {

  
  const onClickCell = (e: any) => {
    // @ts-ignore
    editableRef?.current?.focus()

    if (props.onClick) {
      props.onClick(e)
    }
  }

  

  return (
    <HStack 
      as={Button}
      variant="unstyled"
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
  )
}
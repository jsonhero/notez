import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  useCallback,
  useMemo
} from 'react'
import {
  forwardRef,
  Flex,
  Box,
  List,
  ListItem,
  FlexProps
} from '@chakra-ui/react'
import { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion'

import { useGetNotesQuery } from '@gql/operations'


interface TagListProps extends SuggestionProps, FlexProps {

}

export const ReferenceList = forwardRef<SuggestionProps, 'div'>((props, ref) => {
  const [response] = useGetNotesQuery({
    pause: props.query.length === 0,
    variables: {
      input: {
        title: props.query,
      }
    }
  })

  const notes = useMemo(() => response.data?.notes || [], [response.data?.notes])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = notes[index]

    if (item) {
      props.command({ id: item.id, label: item.title })
    }
  }

  const upHandler = () => {
    setSelectedIndex(((selectedIndex + notes.length) - 1) % notes.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % notes.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [notes])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: SuggestionKeyDownProps) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))
  
  return (
    <Flex shadow="md" bg="white" border="1px solid lightgray">
      <List>
        {response.data?.notes.map((note, index) => {
          return (
            <ListItem px="xsm" py="xxsm" bg={index === selectedIndex ? 'gray.100' : 'initial'}>{note.title}</ListItem>
          )
        })}
      </List>
    </Flex>
  )
})
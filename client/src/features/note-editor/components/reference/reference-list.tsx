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

import { useGetIdeasQuery } from '@gql/operations'


interface TagListProps extends SuggestionProps, FlexProps {

}

export const ReferenceList = forwardRef<SuggestionProps, 'div'>((props, ref) => {
  const [response] = useGetIdeasQuery({
    pause: props.query.length === 0,
    variables: {
      input: {
        title: props.query,
      }
    }
  })

  const ideas = useMemo(() => response.data?.ideas || [], [response.data?.ideas])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = ideas[index]

    if (item) {
      props.command({ id: item.id, label: item.title })
    }
  }

  const upHandler = () => {
    setSelectedIndex(((selectedIndex + ideas.length) - 1) % ideas.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % ideas.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [ideas])

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
        {response.data?.ideas.map((idea, index) => {
          return (
            <ListItem px="xsm" py="xxsm" bg={index === selectedIndex ? 'gray.100' : 'initial'}>{idea.title}</ListItem>
          )
        })}
      </List>
    </Flex>
  )
})
import React, { useContext, useState, useRef, useEffect } from 'react'
import { CellContext } from '@tanstack/react-table'
import { HStack, Button, Text, Input } from '@chakra-ui/react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import _ from 'lodash'

import { AppIdeaFragment, useUpdateIdeaMutation } from '@gql/operations'
import { GlobalStoreContext } from '@stores/global'

import { IdeaDataRowFields } from './idea-data-row'
import { BaseEditableCell } from './base-editable-cell'

interface IdeaRefCellCellProps extends CellContext<IdeaDataRowFields, AppIdeaFragment> {}

export const IdeaRefCell = React.memo(({
  cell,
  getValue,
}: IdeaRefCellCellProps) => {
  const [, updateIdeaMutation] = useUpdateIdeaMutation()

  const inputRef = useRef<HTMLInputElement>(null)  
  const idea = getValue()
  const navigate = useNavigate()
  const globalStore = useContext(GlobalStoreContext)

  const [title, setTitle] = useState<string>(idea.title || '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onBlur = () => {
    updateIdeaMutation({
      input: {
        ideaId: idea.id,
        idea: {
          title,
        }
      }
    })
  }

  const onClickIdeaLink = (ideaId: string) => {
    globalStore.setSelectedIdeaId(ideaId)
    navigate({
      search: createSearchParams({
        tab: 'idea'
      }).toString()
    })
  }

  return (
    <BaseEditableCell ideaId={idea.id} editableRef={inputRef}>
      <Input
        ref={inputRef}
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
        value={title} 
        onChange={onChange} 
        onBlur={onBlur} 
      />
      <Button display="none" _groupHover={{ display: 'initial' }} onClick={() => onClickIdeaLink(idea.id)} variant="link">
        <Text fontSize="xs" fontWeight="bold">Open</Text>
      </Button>
    </BaseEditableCell>
  )
}, (prevProps, nextProps) => {
  return prevProps.getValue().id === nextProps.getValue().id
})
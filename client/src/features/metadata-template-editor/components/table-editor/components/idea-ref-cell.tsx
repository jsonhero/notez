import React, { useContext } from 'react'
import { CellContext } from '@tanstack/react-table'
import { HStack, Button, Text } from '@chakra-ui/react'
import { useNavigate, createSearchParams } from 'react-router-dom'

import { AppIdeaFragment } from '@gql/operations'
import { GlobalStoreContext } from '@stores/global'

import { IdeaDataRowFields } from './idea-data-row'

interface IdeaRefCellCellProps extends CellContext<IdeaDataRowFields, AppIdeaFragment> {}

export const IdeaRefCell = ({
  cell,
  getValue,
}: IdeaRefCellCellProps) => {
  const initialValue = getValue()
  const navigate = useNavigate()
  const globalStore = useContext(GlobalStoreContext)

  const onClickIdeaLink = (ideaId: string) => {
    globalStore.setSelectedIdeaId(ideaId)
    navigate({
      search: createSearchParams({
        tab: 'idea'
      }).toString()
    })
  }

  return (
    <HStack sx={{
      w: '100%',
      h: '100%',
    }}>
      <Button onClick={() => onClickIdeaLink(initialValue.id)} variant="link">
        <Text fontSize="xs" fontWeight="bold">{initialValue.title || "Untitled"}</Text>
      </Button>
    </HStack>
  )
}
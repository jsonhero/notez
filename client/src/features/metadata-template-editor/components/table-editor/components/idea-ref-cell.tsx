import React, { useContext } from 'react'
import { CellContext } from '@tanstack/react-table'
import { HStack, Button } from '@chakra-ui/react'
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


  // console.log(initialValue)
  // We need to keep and update the state of the cell normally
  // const [value, setValue] = useState(initialValue)

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value)
  // }

  // const onBlur = () => {
  //   onUpdate(cell.row.original.id, value)
  // }

  // useEffect(() => {
  //   setValue(initialValue)
  // }, [initialValue])

  return (
    <HStack sx={{
      w: '100%',
      h: '100%',
    }}>
      <Button onClick={() => onClickIdeaLink(initialValue.id)} variant="link">{initialValue.title || "Untitled"}</Button>
    </HStack>
  )
}
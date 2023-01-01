import React, { useContext } from 'react'
import { Box, CircularProgress } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { GlobalStoreContext } from '@stores/global'
import { AppNoteFragment, useGetNoteByIdQuery } from '@gql/operations'

export const NoteTableEditor = observer(() => {
  const globalStore = useContext(GlobalStoreContext)

  return (
    <Box>
      {globalStore.selectedNoteTableId ? <NoteTableEditorActive noteTableId={globalStore.selectedNoteTableId} /> : (
        <Box bg="red.100" p="md" borderRadius="3xl">
          No note table selected.
        </Box>
      ) } 
    </Box>
  )
})


interface NoteTableEditorActiveProps {
  noteTableId: string
}

const NoteTableEditorActive = ({ noteTableId }: NoteTableEditorActiveProps) => {
  
  // const [response] = useGetNoteByIdQuery({
  //   variables: {
  //     noteId,
  //   },
  //   requestPolicy: 'cache-and-network',
  // })

  return (
    <Box>
      {/* {
        !response.data?.node ? (
          <CircularProgress isIndeterminate color='blue.300' />
        ) : (
          <>
            {null}
          </>
        )
      } */}
    </Box>
  )
}
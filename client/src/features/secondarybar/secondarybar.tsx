import React, { useContext } from 'react';
import { Box, VStack, HStack, Button, IconButton, Text, Icon } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { GlobalStoreContext } from '@stores/global'
import { useGetNodeQuery } from '@gql/operations'

export const SecondaryBar = observer(() => {
  const globalStore = useContext(GlobalStoreContext)


  return (
    <Box h="100vh" bg="#191919" w="100%" borderLeft="1px solid" borderColor="#292929">
      {globalStore.selectedIdeaId !== null ? <SecondaryContent ideaId={globalStore.selectedIdeaId} /> : null}
    </Box>
  )
})


interface SecondaryContentProps {
  ideaId: string;
}

const SecondaryContent = ({ ideaId }: SecondaryContentProps) => {
  const globalStore = useContext(GlobalStoreContext)

  const [response] = useGetNodeQuery({
    variables: {
      id: ideaId,
    },
  })

  const onClickRef = (ideaId: string) => {
    globalStore.setSelectedIdeaId(ideaId)
  }

  console.log(response, ';ss')

  if (!response.data?.node?.id || response.data.node.__typename !== 'Idea') {
    return null;
  }

  return (
    <Box p="sm">
      <Box>
        <Text fontSize="sm" fontWeight="bold" mb="xsm">{`References ->`}</Text>
        <VStack align="flex-start">
          {response.data.node.toReferences.map((ref) => (
            <Box key={ref.id}>
              <Button onClick={() => onClickRef(ref.toIdea.id)} size="sm" height="auto" py="xxsm" px="xsm">{ref.toIdea.title || 'Untitled'}</Button>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box mt="sm">
        <Text fontSize="sm" fontWeight="bold" mb="xsm">{`<- References`}</Text>
        <VStack align="flex-start">
          {response.data.node.fromReferences.map((ref) => (
            <Box key={ref.id}>
              <Button onClick={() => onClickRef(ref.toIdea.id)} size="sm" height="auto" py="xxsm" px="xsm">{ref.toIdea.title || 'Untitled'}</Button>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}
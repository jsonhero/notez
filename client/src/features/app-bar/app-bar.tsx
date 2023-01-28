import React, { useContext } from 'react'
import { Box, HStack, Button, IconButton, SimpleGrid, Flex } from '@chakra-ui/react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse, BsSearch } from 'react-icons/bs'

import { GlobalStoreContext } from '@stores/global'

export const AppBar = () => {
  const navigate = useNavigate()
  const globalStore = useContext(GlobalStoreContext)

  return (
    <Box bg="#191919" w="100%" h="100%" borderBottom="1px solid" borderColor="#292929">
      <Flex align="center" h="100%">
        <Box width="40px">
          <IconButton 
            variant="ghost" 
            aria-label='expand-l' 
            icon={<BsLayoutSidebarInset />} 
            onClick={() => globalStore.toggleLeftBar()}
          />
        </Box>
        <Box width="275px">
          <IconButton variant="ghost" aria-label='search' icon={<BsSearch />} />
        </Box>
        <Box width="auto" flex={1}>
          Tabs here
        </Box>
        <Flex width="275px">
          <Box flex={1}>
          </Box>
          <IconButton 
            variant="ghost" 
            aria-label='expand-r' 
            icon={<BsLayoutSidebarInsetReverse />}
            onClick={() => globalStore.toggleRightBar()}
          />
        </Flex>
      </Flex>
    </Box>
  )
}
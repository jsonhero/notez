import React from 'react';
import { Box, Flex, VStack, IconButton, Icon } from '@chakra-ui/react'

import { VscFiles } from 'react-icons/vsc'
import { BsTable } from 'react-icons/bs'
import { AiOutlineNodeIndex } from 'react-icons/ai'
import { useNavigate, createSearchParams } from 'react-router-dom'

export const Menubar = () => {
  const navigate = useNavigate()

  return (
    <Box height="100%" bg="gray.900" borderRight="1px solid" borderColor="gray.700">
      <VStack pt="sm">
        <Box>
          <IconButton bg="transparent" aria-label='Ideas' icon={<Icon fill="white" as={VscFiles} />} onClick={() => {
            navigate({
              search: createSearchParams({
                tab: 'idea'
              }).toString()
            })
          }} />
        </Box>
        <Box>
          <IconButton bg="transparent" aria-label='Tables' icon={<Icon fill="white" as={BsTable} />} onClick={() => {
            navigate({
              search: createSearchParams({
                tab: 'table'
              }).toString()
            })
          }} />
        </Box>
        <Box>
          <IconButton bg="transparent" aria-label='Graph' icon={<Icon fill="white" as={AiOutlineNodeIndex} />} onClick={() => {
            navigate({
              search: createSearchParams({
                tab: 'graph'
              }).toString()
            })
          }} />
        </Box>
      </VStack>
    </Box>
  )
}
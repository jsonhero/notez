import React from 'react'
import { Box, HStack, Button } from '@chakra-ui/react'
import { useNavigate, createSearchParams } from 'react-router-dom'


export const AppBar = () => {
  const navigate = useNavigate()
  
  return (
    <Box bg="#191919" w="100%" h="100%" borderBottom="1px solid" borderColor="#292929">
      <Box p="md">
        {/* <HStack>
          <Button variant="ghost" onClick={() => {
            navigate({
              search: createSearchParams({
                tab: 'idea'
              }).toString()
            })
          }}>Notes</Button>
          <Button variant="ghost" onClick={() => {
            navigate({
              search: createSearchParams({
                tab: 'table'
              }).toString()
            })
          }}>Tables</Button>
          <Button variant="ghost" onClick={() => {
            navigate({
              search: createSearchParams({
                tab: 'graph'
              }).toString()
            })
          }}>Graph</Button>
        </HStack> */}
      </Box>
    </Box>
  )
}
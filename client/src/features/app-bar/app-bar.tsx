import React from 'react'
import { Box, HStack, Button } from '@chakra-ui/react'
import { useNavigate, createSearchParams } from 'react-router-dom'


export const AppBar = () => {
  const navigate = useNavigate()
  
  return (
    <Box bg="#E3E7EF" w="100%" h="100%">
      <Box p="md">
        <HStack>
          <Button variant="ghost" onClick={() => {
            navigate({
              search: createSearchParams({
                tab: 'note'
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
        </HStack>
      </Box>
    </Box>
  )
}
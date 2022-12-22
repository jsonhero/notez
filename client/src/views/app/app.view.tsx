import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'

import { Sidebar } from '@features/sidebar'

export const AppView = () => {
  return (
    <Grid 
      templateAreas={`"sidebar main"`}
      gridTemplateColumns="400px auto"
      gridTemplateRows="auto"
    >
      <GridItem area="sidebar">
        <Sidebar />
      </GridItem>
      <GridItem area="main">
        <Box bg="blue" w='100%' h="100%">
          YEet
        </Box>
      </GridItem>
    </Grid>
  )
}
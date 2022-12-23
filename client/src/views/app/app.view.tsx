import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'

import { Sidebar } from '@features/sidebar'
import { AppBar } from '@features/app-bar'
import { NoteEditor } from '@features/note-editor'

export const AppView = () => {
  return (
    <Grid 
      templateAreas={`
        "header header"
        "sidebar main"`
      }
      gridTemplateColumns="400px auto"
      gridTemplateRows="80px auto"
    >
      <GridItem area="header">
        <AppBar />
      </GridItem>
      <GridItem area="sidebar">
        <Sidebar />
      </GridItem>
      <GridItem area="main">
        <Box p="xxl" bg="#FFFFFF" w='100%' h="100%">
          <NoteEditor />
        </Box>
      </GridItem>
    </Grid>
  )
}
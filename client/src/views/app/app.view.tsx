import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import { Sidebar } from '@features/sidebar'
import { AppBar } from '@features/app-bar'
import { NoteEditor } from '@features/note-editor'
import { MetadataTemplateEditor } from '@features/metadata-template-editor'
import { GraphViewer } from '@features/graph-viewer'
import { Menubar } from '@features/menubar'

export const AppView = () => {
  const [searchParams] = useSearchParams()

  return (
    <Grid 
      templateAreas={`
        "header header header"
        "menubar sidebar main"`
      }
      gridTemplateColumns="50px 300px auto"
      gridTemplateRows="48px auto"
    >
      <GridItem area="header">
        <AppBar />
      </GridItem>
      <GridItem area="menubar">
        <Menubar />
      </GridItem>
      <GridItem area="sidebar">
        <Sidebar />
      </GridItem>
      <GridItem area="main">
        <Box p="xxl" bg="#101010" w='100%' h="100%">
          {searchParams.get('tab') === 'table' && <MetadataTemplateEditor />}
          {searchParams.get('tab') === 'idea' &&  <NoteEditor />}
          {searchParams.get('tab') === 'graph' &&  <GraphViewer />}
        </Box>
      </GridItem>
    </Grid>
  )
}
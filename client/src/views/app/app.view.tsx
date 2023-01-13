import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import { Sidebar } from '@features/sidebar'
import { AppBar } from '@features/app-bar'
import { NoteEditor } from '@features/note-editor'
import { MetadataTemplateEditor } from '@features/metadata-template-editor'
import { GraphViewer } from '@features/graph-viewer'

export const AppView = () => {
  const [searchParams] = useSearchParams()

  return (
    <Grid 
      templateAreas={`
        "header header"
        "sidebar main"`
      }
      gridTemplateColumns="300px auto"
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
          {searchParams.get('tab') === 'table' && <MetadataTemplateEditor />}
          {searchParams.get('tab') === 'note' &&  <NoteEditor />}
          {searchParams.get('tab') === 'graph' &&  <GraphViewer />}
        </Box>
      </GridItem>
    </Grid>
  )
}
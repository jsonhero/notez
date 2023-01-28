import React from 'react'
import { Box, Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import { Sidebar } from '@features/sidebar'
import { AppBar } from '@features/app-bar'
import { NoteEditor } from '@features/note-editor'
import { MetadataTemplateEditor } from '@features/metadata-template-editor'
import { GraphViewer } from '@features/graph-viewer'
import { Menubar } from '@features/menubar'
import { SecondaryBar } from '@features/secondarybar'

export const AppView = () => {
  const [searchParams] = useSearchParams()
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })




  return (
    <Grid 
      templateAreas={`
        "header header header header"
        "menubar sidebar main secondarybar"`
      }
      gridTemplateColumns="50px min-content auto min-content"
      gridTemplateRows="48px auto"
    >
      <GridItem area="header">
        <AppBar />
      </GridItem>
      <GridItem area="menubar">
        <Menubar />
      </GridItem>
      <GridItem area="sidebar" width={isOpen ? "280px" : '10px' } onClick={() => onToggle()}>
        <Sidebar />
      </GridItem>
      <GridItem area="main">
        <Box p="xxl" bg="#101010" w='100%' h="100%">
          {searchParams.get('tab') === 'table' && <MetadataTemplateEditor />}
          {searchParams.get('tab') === 'idea' &&  <NoteEditor />}
          {searchParams.get('tab') === 'graph' &&  <GraphViewer />}
        </Box>
      </GridItem>
      <GridItem area="secondarybar">
        <SecondaryBar />
      </GridItem>
    </Grid>
  )
}
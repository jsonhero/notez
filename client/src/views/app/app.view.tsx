import React, { useContext } from 'react'
import { Box, Grid, GridItem, useDisclosure } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import { observer } from 'mobx-react-lite'
import { GlobalStoreContext } from '@stores/global'
import { Sidebar } from '@features/sidebar'
import { AppBar } from '@features/app-bar'
import { NoteEditor } from '@features/note-editor'
import { MetadataTemplateEditor } from '@features/metadata-template-editor'
import { GraphViewer } from '@features/graph-viewer'
import { Menubar } from '@features/menubar'
import { SecondaryBar } from '@features/secondarybar'

export const AppView = observer(() => {
  const [searchParams] = useSearchParams()
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  const globalStore = useContext(GlobalStoreContext)

  return (
    <Grid 
      templateAreas={`
        "header header header header"
        "menubar sidebar main secondarybar"`
      }
      gridTemplateColumns="40px min-content 1fr min-content"
      gridTemplateRows="48px auto"
    >
      <GridItem area="header">
        <AppBar />
      </GridItem>
      <GridItem area="menubar">
        <Menubar />
      </GridItem>
      <GridItem area="sidebar" width={globalStore.leftBarExpanded ? "275px" : "0px"} overflowX="hidden">
        <Sidebar />
      </GridItem>
      <GridItem area="main">
        <Box p="xxl" bg="#101010" w='100%' h="100%">
          {searchParams.get('tab') === 'table' && <MetadataTemplateEditor />}
          {searchParams.get('tab') === 'idea' &&  <NoteEditor />}
          {searchParams.get('tab') === 'graph' &&  <GraphViewer />}
        </Box>
      </GridItem>
      <GridItem area="secondarybar" width={globalStore.rightBarExpanded ? "275px" : "0px"} overflowX="hidden">
        <SecondaryBar />
      </GridItem>
    </Grid>
  )
})
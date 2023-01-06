import React, { useContext } from 'react'
import { Box, VStack, HStack, Button, IconButton, Text, Icon } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useSearchParams } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'

import { GlobalStoreContext  } from '@stores/global'
import { useGetIdeasQuery, useCreateIdeaMutation, useDeleteIdeaMutation, useCreateMetadataTemplateMutation, useGetMetadataTemplatesQuery, useDeleteMetadataTemplateMutation } from '@gql/operations'

export const Sidebar = () => {
  const [searchParams] = useSearchParams()

  return (
    <Box h="100vh" bg="app.gray" w="100%">
      {searchParams.get('tab') === 'table' ? <TableView /> : <IdeaView />}
    </Box>
  )
}

const IdeaView = () => {
  const globalStore = useContext(GlobalStoreContext)
  const [_, createIdeaMutation] = useCreateIdeaMutation()
  const [, deleteIdeaMutation] = useDeleteIdeaMutation()
  const [response, refetchIdeas] = useGetIdeasQuery()

  const onClickCreateIdea = async () => {
    const res = await createIdeaMutation({});
    globalStore.setSelectedIdeaId(res.data?.createIdea.idea.id as string)
    refetchIdeas()
  }

  const onClickIdea = (ideaId: string) => {
    globalStore.setSelectedIdeaId(ideaId)
  }

  const onClickDelete = async (ideaId: string) => {
    await deleteIdeaMutation({
      input: {
        ideaId,
      }
    })

    if (globalStore.selectedIdeaId === ideaId) {
      const newSelectedIdea = response.data?.ideas.find((idea) => idea.id !== ideaId)
      if (newSelectedIdea) {
        globalStore.setSelectedIdeaId(newSelectedIdea.id)
      } else {
        globalStore.setSelectedIdeaId(null)
      }
    }
  }

  return (
    <Box p="small">
      <Box mb="lg">
        <Button onClick={onClickCreateIdea}>
          Create Idea
        </Button>
      </Box>
      <VStack spacing="xsm" align="flex-start">
        {response.data?.ideas.map((idea) => (
          <HStack 
            key={idea.id} 
            sx={{
              w: '100%',
              justifyContent: 'space-between',
              bg: idea.id === globalStore.selectedIdeaId ? "gray.200" : 'initial',
              borderRadius: '4px'
            }}
            role="group"
          >
            <Button size="xs" justifyContent="flex-start" w="100%" onClick={() => onClickIdea(idea.id)} variant="ghost" p="0px" m="0px">
              <Text pl="xsm">
                {idea.title || `Untitled`}
              </Text>
            </Button>
            <IconButton sx={{
              height: 'initial',
              display: 'none',
            }}  _groupHover={{ display: 'initial' }} onClick={() => onClickDelete(idea.id)}  variant="unstyled" aria-label='Delete' 
              icon={<Icon as={BsThreeDots} />} 
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}


const TableView = () => {
  const globalStore = useContext(GlobalStoreContext)
  const [, createMetadataTemplateMutation] = useCreateMetadataTemplateMutation()
  const [, deleteMetadataTemplateMutation] = useDeleteMetadataTemplateMutation()
  const [response] = useGetMetadataTemplatesQuery()

  const onClickCreateMetadataTemplate = () => {
    createMetadataTemplateMutation({})
  }


  const onClickMetadataTemplate = (metadataTemplateId: string) => {
    globalStore.setSelectedMetadataTemplateId(metadataTemplateId)
  }

  const onClickDelete = async (metadataTemplateId: string) => {
    await deleteMetadataTemplateMutation({
      input: {
        metadataTemplateId,
      }
    })

    if (globalStore.selectedMetadataTemplateId === metadataTemplateId) {
      const newSelectedMetadataTemplate = response.data?.metadataTemplates.find((metadataTemplate) => metadataTemplate.id !== metadataTemplateId)
      if (newSelectedMetadataTemplate) {
        globalStore.setSelectedMetadataTemplateId(newSelectedMetadataTemplate.id)
      } else {
        globalStore.setSelectedMetadataTemplateId(null)
      }
    }
  }

  return (
    <Box p="medium">
      <Box mb="lg">
        <Button onClick={onClickCreateMetadataTemplate}>
          Create Table
        </Button>
      </Box>
      <VStack spacing="xsm" align="flex-start">
        {response.data?.metadataTemplates.map((metadataTemplate) => (
          <HStack key={metadataTemplate.id} justify="space-between" w="100%" role="group" 
            bg={metadataTemplate.id === globalStore.selectedMetadataTemplateId ? "gray.200" : 'initial'}
          >
            <Button justifyContent="flex-start" w="100%" onClick={() => onClickMetadataTemplate(metadataTemplate.id)} variant="ghost" p="0px" m="0px">
              <Text pl="sm">
                {metadataTemplate.title || `Untitled`}
              </Text>
            </Button>
            <IconButton display="none" _groupHover={{ display: 'initial' }} onClick={() => onClickDelete(metadataTemplate.id)}  variant="ghost" aria-label='Delete' icon={<DeleteIcon />} />
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}
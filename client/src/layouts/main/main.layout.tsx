import React from 'react';
import { Box, Flex, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
      {/* <Container> */}
        <Outlet />
      {/* </Container> */}
    </>
  )
}
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@lib/query-client'
import { theme } from '@lib/theme'

import { AppRouter } from './app.router'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>      
    </QueryClientProvider>
  )
}
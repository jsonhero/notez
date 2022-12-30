import React from 'react';
import { Provider as UrqlProvider } from 'urql'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@lib/query-client'
import { urqlClient } from '@lib/urql-client'
import { theme } from '@lib/theme'

import { AppRouter } from './app.router'
import { GlobalStore, GlobalStoreContext } from '@stores/global'

export const App = () => {
  return (
    <UrqlProvider value={urqlClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <GlobalStoreContext.Provider value={new GlobalStore()}>
            <AppRouter />
          </GlobalStoreContext.Provider>
        </ChakraProvider>      
      </QueryClientProvider>
    </UrqlProvider>
  )
}
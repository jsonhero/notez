export default {
  api: {
    output: {
      mode: 'split',
      target: 'src/core/api/__generated__/api.ts',
      schemas: 'src/core/api/__generated__/models',
      client: 'react-query',
      mock: false,
      clean: true,
      override: {
        mutator: {
          path: './src/core/api/axios-instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: 'http://localhost:3000/api-json',
    },
  },
};
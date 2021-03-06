module.exports = {
  projects: {
    eventkit: {
      schema: ['http://localhost:3333/api/graphql'],
      documents: ['apps/web/src/**/*.gql'],
      extensions: {
        endpoints: {
          default: {
            url: 'http://localhost:3333/api/graphql',
          },
        },
      },
    },
  },
}

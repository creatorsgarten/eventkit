import React, { Suspense } from 'react'
import { Provider } from 'jotai'
import { ApolloProvider } from '@apollo/client'

import Head from 'next/head'
import { AppProps } from 'next/app'

import { setupIcon } from '../styles/icon'
import { apolloClient } from '../modules/apollo'
import { Layout } from '../modules/layout/Layout'
import { ErrorBoundary } from '../modules/ui/ErrorBoundary'

import '../styles/reset.css'

setupIcon()

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Suspense fallback={<h1>SUSPENDING</h1>}>
          <Provider>
            <ApolloProvider client={apolloClient}>
              <Head>
                <title>EventKit Dashboard</title>
              </Head>

              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ApolloProvider>
          </Provider>
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

export default App

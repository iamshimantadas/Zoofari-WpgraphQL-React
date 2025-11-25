import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from './App.jsx'
import { BrowserRouter } from 'react-router'


const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_WPGRAPHQL_API_URL }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
)

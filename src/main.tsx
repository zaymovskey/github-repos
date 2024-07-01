import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={apolloClient}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>,
);

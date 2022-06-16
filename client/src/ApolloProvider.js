import React from 'react';
import App from './App';
import {ApolloClient,InMemoryCache,createHttpLink,ApolloProvider} from '@apollo/client'
import {setContext} from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/'
})

const authLink = setContext(() => {
    //get token from local storage
    const token = localStorage.getItem('jwtToken');
    //set token as authorization header
    return{
        headers : {
            //merge the existing header request with this
            Authorization : token ? `Bearer ${token}` : ''
        }
    }
})


const client = new ApolloClient({
    link : authLink.concat(httpLink),
    cache : new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)

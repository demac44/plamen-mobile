import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from '@apollo/client/utilities';

import Test from './components/Test';
import Login from './routes/Entry/Login';
import Register from './routes/Entry/Register';

const httpLink = new HttpLink({
  // uri:'https://plamen-main.herokuapp.com/graphql'
  uri:'http://192.168.1.56:8000/graphql'
})

const wsLink = new WebSocketLink({
  // uri:`wss://plamen-main.herokuapp.com/graphql`,
  uri:`ws://192.168.1.56:8000/graphql`,
  options: {
    reconnect: true,
  }
})

const link = split(
  ({ query }) => {
    const {kind, operation} = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  credentials:"include",
})

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator> 
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

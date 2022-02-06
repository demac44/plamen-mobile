import React, {createContext, useCallback, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { offsetLimitPagination } from '@apollo/client/utilities';

import Login from './src/Screens/Entry/Login';
import Register from './src/Screens/Entry/Register';
import Feed from './src/Screens/Feed/Feed';
import { Text } from 'react-native';
import axios from 'axios';
import MainLoader from './src/Components/General components/Loaders/MainLoader';
import Saved from './src/Screens/Saved/Saved';
import Explore from './src/Screens/Explore/Explore';
import Story from './src/Components/Stories/Story';
import Chats from './src/Screens/Chat/Chats';
import Chat from './src/Screens/Chat/Chat';
import Profile from './src/Screens/Profile/Profile';
import UsersList from './src/Screens/Lists/UsersList';
import Search from './src/Screens/Search/Search';

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
  cache: new InMemoryCache({
    typePolicies: {
      Query:{
        fields:{
        get_post_comments:{
          keyArgs: ['postID'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
        }},
        get_feed_posts:{
          keyArgs: ['postID'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
        }},
        get_saved_posts:{
          keyArgs: ['postID'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
        }},
        get_profile_posts:{
          keyArgs: ['username'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
        }},
        random_posts:{
          keyArgs: ['postID'],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
        }},
      //   get_messages:{
      //     keyArgs: ['sender', "receiver", "msgID"],
      //     merge(existing = [], incoming) {
      //       return [...existing, ...incoming];
      //   }},
      }
    }
  }
}),
  credentials:"include",
})

const Stack = createNativeStackNavigator();


export const UserContext = createContext({})

const App = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const auth = async () => {
    try{
      setLoading(true)
      await AsyncStorage.getItem('ACCESS_TOKEN').then(res => {
        axios({
          method:'post',
          url: "http://192.168.1.56:8000/api/verify_token",
          data:{
            token: res
          }
        }).then(response => {
          if(response.data.token && response.data.user){
            setUser(response.data.user)
            setAuthenticated(true)
            setLoading(false)
          } else {
            setAuthenticated(false)
            setLoading(false)
          }
          }).catch(err => {setLoading(false);return err})
      })
    }
    catch{{setLoading(false);return null}}
  } 

  useEffect(()=>{
    auth()
  }, [authenticated])

  const authCallback = useCallback(val => {
    setAuthenticated(val)
  }, [setAuthenticated])
  
  return (
    <>
      {loading ? <MainLoader/> :
      <ApolloProvider client={client}>
        <UserContext.Provider value={user}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Feed' screenOptions={{headerShown: false}}>
              {authenticated ?
              <>
                <Stack.Screen name="Feed" component={Feed}/>
                <Stack.Screen name="Saved" component={Saved}/>
                <Stack.Screen name="Explore" component={Explore}/>
                <Stack.Screen name="Story" component={Story}/>
                <Stack.Screen name="Chats" component={Chats}/>
                <Stack.Screen name="Chat" component={Chat}/>
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="UsersList" component={UsersList}/>
                <Stack.Screen name="Search" component={Search}/>

              </>
              :
              <>
                <Stack.Screen name="Login">
                  {() => <Login authCallback={authCallback}/>}
                </Stack.Screen>
                <Stack.Screen name="Register" component={Register} />
              </>}
            </Stack.Navigator> 
          </NavigationContainer>
        </UserContext.Provider>
      </ApolloProvider>}
    </>
  );
};

export default App;


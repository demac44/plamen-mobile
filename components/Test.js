import React from 'react';
import { Text } from 'react-native';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';


const Test = () => {
    const {data, loading, error} = useQuery(GET_USER, {
        variables:{
        userID: 32,
        username: "demac22"
        }
  })


  if(loading) return <Text>Loading...</Text>
  if(error) console.log(error);

  console.log(data);

  return (
        <>
            <Text>{data?.get_user?.username}</Text>
        </>
  );
};

export default Test;


const GET_USER = gql`
  query ($userID: Int!, $username: String!){
    get_user(username: $username, userID: $userID){
      username
      first_name
      last_name
      profile_picture
    }
  }
`
import React, { useContext } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import BottomNavbar from '../../../Components/Navbars/Bottom navbar/BottomNavbar'
import TopNavbar from '../../../Components/Navbars/Top navbar/TopNavbar'
import ChangeActivityStatus from '../../../Components/Profile/Settings/ChangeActivityStatus'
import ChangeNames from '../../../Components/Profile/Settings/ChangeNames'
import ChangePassword from '../../../Components/Profile/Settings/ChangePassword'
import {useQuery, useMutation} from '@apollo/client'
import gql from 'graphql-tag'

import { UserContext } from '../../../../App'


const Settings = ({navigation}) => {
    const currentUser = useContext(UserContext)
    const {data, loading, refetch} = useQuery(GET_USER, {
        variables:{
            username: currentUser.username,
            userID: currentUser.userID
        }
    })

    return (
        <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
            <TopNavbar navigation={navigation}/>
            <ScrollView style={{paddingTop:60, paddingBottom:60}}>
                <ChangeActivityStatus userID={currentUser.userID} username={currentUser.username}/>
                {!loading && <ChangeNames 
                    usernm={currentUser.username}
                    userID={currentUser.userID} 
                    navigation={navigation}
                    user={data?.get_user}
                    refetch={refetch}
                />
                }
                <ChangePassword userID={currentUser.userID}/>
            </ScrollView>
            <BottomNavbar navigation={navigation}/> 
        </KeyboardAvoidingView>
    )
}

export default Settings

const GET_USER = gql`
    query($username: String!, $userID: Int!){
        get_user(username: $username, userID: $userID){
            first_name
            last_name
            username
        }
    }
`
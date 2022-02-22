import React, { useContext } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import BottomNavbar from '../../../Components/Navbars/Bottom navbar/BottomNavbar'
import TopNavbar from '../../../Components/Navbars/Top navbar/TopNavbar'
import ChangeActivityStatus from '../../../Components/Profile/Settings/ChangeActivityStatus'
import ChangeNames from '../../../Components/Profile/Settings/ChangeNames'
import ChangePassword from '../../../Components/Profile/Settings/ChangePassword'

import { UserContext } from '../../../../App'

const Settings = ({navigation}) => {
    const currentUser = useContext(UserContext)

    return (
        <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
            <TopNavbar navigation={navigation}/>
            <ScrollView style={{paddingTop:60, paddingBottom:60}}>
                <ChangeActivityStatus userID={currentUser.userID} username={currentUser.username}/>
                <ChangeNames/>
                <ChangePassword userID={currentUser.userID}/>
            </ScrollView>
            <BottomNavbar navigation={navigation}/> 
        </KeyboardAvoidingView>
    )
}

export default Settings
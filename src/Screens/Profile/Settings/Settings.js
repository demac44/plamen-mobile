import React from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import BottomNavbar from '../../../Components/Navbars/Bottom navbar/BottomNavbar'
import TopNavbar from '../../../Components/Navbars/Top navbar/TopNavbar'
import ChangeActivityStatus from '../../../Components/Profile/Settings/ChangeActivityStatus'

const Settings = ({navigation}) => {
    return (
        <KeyboardAvoidingView enabled={false} behavior='height' style={{flex:1, backgroundColor:"#1b1b1b"}}>
            <TopNavbar navigation={navigation}/>
            <ChangeActivityStatus/>

            <BottomNavbar navigation={navigation}/> 
        </KeyboardAvoidingView>
    )
}

export default Settings
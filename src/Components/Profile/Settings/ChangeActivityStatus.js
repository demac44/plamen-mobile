import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Text, TouchableOpacity, View } from 'react-native'

import {useQuery, useMutation} from '@apollo/client'
import gql from 'graphql-tag'

import { UserContext } from '../../../../App'

const ChangeActivityStatus = () => {
    const currentUser = useContext(UserContext)
    const [change_status] = useMutation(CHANGE_STATUS)
    const {data, refetch, loading} = useQuery(GET_STATUS, {variables:{uid: currentUser.userID, usernm: currentUser.username}})

    const handleChange = () => {
        !loading &&
        change_status({
            variables:{
                uid: currentUser.userID,
                status: !data?.get_user?.show_status
            }
        }).then(()=>{
            refetch()
        })
    }


    return (
        <View style={styles.box}>
            <Text style={{fontSize:16, marginRight:10}}>Activity status: </Text>
            {!loading && <View style={styles.switch}>
                <FontAwesomeIcon icon='lock-open' size={16} color='#aaa'/>
                <FontAwesomeIcon icon='lock' size={16} color='#aaa'/>
                <TouchableOpacity
                onPress={handleChange}
                style={{...styles.indicator, 
                        backgroundColor:data?.get_user?.show_status ? "green" : "darkred",
                        left:data?.get_user?.show_status ? 33 : 0
                }}
            >
            </TouchableOpacity>
            </View>}
        </View>
    )
}

export default ChangeActivityStatus


const styles = {
    box:{
        marginTop:60, 
        borderWidth:1, 
        borderColor:"#2f2f2f", 
        borderRadius:5, 
        flexDirection:'row', 
        padding:10, 
        position:'relative',
        alignItems:"center"
    },
    switch:{
        flexDirection:'row',
        width:60,
        justifyContent:'space-between',
        borderWidth:1, 
        borderColor:"#2f2f2f", 
        borderRadius:50, 
        padding:5
    },
    indicator:{
        width:25, 
        height:25, 
        borderRadius:50, 
        borderWidth:2, 
        borderColor:"#3f3f3f", 
        position:'absolute', 
        top:0, 
    }

}


const CHANGE_STATUS = gql`
    mutation ($uid: Int!, $status: Boolean!){
        change_activity_status(userID: $uid, show_status: $status){
            show_status
        }
    }
`

const GET_STATUS = gql`
    query ($uid: Int!, $usernm: String!){
        get_user (username: $usernm, userID: $uid){
            show_status
        }
    }
`
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StatsBox = ({data}) => {
    const navigation = useNavigation()

    return (
        <View style={styles.cont}>
            <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('UsersList', {data: data?.get_followers, title:"Followers"})}>
                <Text style={styles.title}>Followers</Text>
                <Text style={styles.nums}>{data?.get_followers?.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('UsersList', {data: data?.get_following, title: "Following"})}>
                <Text style={styles.title}>Following</Text>
                <Text style={styles.nums}>{data?.get_following?.length}</Text>
            </TouchableOpacity>

            <View style={styles.box}>
                <Text style={styles.title}>Posts</Text>
                <Text style={styles.nums}>{data?.no_of_posts}</Text>
            </View>
        </View>
    );
};

export default StatsBox;


const styles = {
    cont:{
        display:'flex', 
        flexDirection:"row", 
        width:"100%", 
        justifyContent:'space-around', 
        alignItems:'center', 
        marginTop:20
    },
    box:{
        display:'flex', 
        alignItems:'center'
    },
    title:{
        color:"white", 
        fontSize:16
    },
    nums:{
        fontSize:15, 
        marginTop:5
    }
}

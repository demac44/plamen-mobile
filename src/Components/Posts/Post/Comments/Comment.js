import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Avatar from '../../../General components/Avatar';
import trashIcon from '../../../../Assets/images/icons/trash-icon-min.png'
import { UserContext } from '../../../../../App';

const win = Dimensions.get('window')



const Comment = ({cmt}) => {
    const user = useContext(UserContext)

    return (
        <View style={styles.comment}>
            <Avatar image={cmt.profile_picture} size={30}/>

            <Text style={styles.textBox}><Text style={{fontWeight:"bold"}}>{cmt.username+' '}</Text>{cmt.comment_text}</Text>

            {cmt.userID===user.userID && <Image source={trashIcon} style={{width:13, marginLeft:5}}/>}
        </View>
    );
};

export default Comment;

const styles = StyleSheet.create({
    comment:{
        width:"100%",
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        padding:5
    },
    textBox:{
        backgroundColor:"#2f2f2f",
        width:win.width - 15 - 13 - 40, // width of avatar and icon and padding
        padding:10,
        borderRadius:5,
        marginLeft:5
    }
})
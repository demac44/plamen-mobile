import React from 'react';
import {View} from 'react-native'

const ActivityBar = ({last_seen}) => {
    return (
        <View style={{...styles.activityBar, backgroundColor: getTime(last_seen) ? 'lime' : "darkred"}}></View>
    );
};

export default ActivityBar;

const getTime = (last_seen) => {
    let utcSeconds = parseInt(last_seen);
    utcSeconds = new Date(utcSeconds).getTime()
    let d = Date.now() - utcSeconds
    d = Math.floor((d/1000)/60)
    if (d<3) return true
    return false
}

const styles = {
    activityBar:{
        width:"100%", 
        height:3, 
        position:'absolute', 
        top:0, 
        borderRadius:5
    }
}
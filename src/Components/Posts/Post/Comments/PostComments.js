import React from 'react';
import { View } from 'react-native';
import Comment from './Comment';

const PostComments = ({comments}) => {
    return (
        <View>
            {comments.map(cmt => <Comment cmt={cmt} key={cmt.commentID}/>)}
        </View>
    );
};

export default PostComments;

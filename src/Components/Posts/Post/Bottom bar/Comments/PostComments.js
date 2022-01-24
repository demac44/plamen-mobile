import React from 'react';
import { ScrollView } from 'react-native';
import Comment from './Comment';

const PostComments = ({comments}) => {


    return (
        <ScrollView>
            {comments.map(cmt => <Comment cmt={cmt} key={cmt.commentID}/>)}
        </ScrollView>
    );
};

export default PostComments;

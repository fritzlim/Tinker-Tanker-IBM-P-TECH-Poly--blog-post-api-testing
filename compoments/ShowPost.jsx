import styles from '../stylesheets/styles';
import React from 'react';
import { Text } from 'react-native';

function ShowPost(props) {
    return (
        <React.Fragment>
            <Text style={styles.title}>{props.data.title}</Text>
            <Text>{props.data.content}</Text>
        </React.Fragment>
    );
}

export default ShowPost;
import styles from '../stylesheets/styles';
import { Text, FlatList } from 'react-native';

function ShowAllPosts(props) {
    if (props.data.length !== undefined) {

    return (
        <FlatList
            data={props.data}
            renderItem={({item}) => 
            <>
                <Text style={styles.title}>{item.id}: {item.title}</Text>
                <Text>{item.content}{'\n\n'}</Text>
            </>}
        />
    );
    } else {
        return null;
    }
}

export default ShowAllPosts;
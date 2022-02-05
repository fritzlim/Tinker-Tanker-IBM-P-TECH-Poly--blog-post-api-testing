import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spacer: { // Adapted from https://reactnative.dev/docs/button#example.
        marginVertical: 10
    },
    separator: { // Adapted from https://reactnative.dev/docs/button#example.
        marginVertical: 20,
        width: '100%', // Adapted from https://blog.logrocket.com/common-bugs-react-native-scrollview/.
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    scrollView: {
        marginTop: 30,
        marginHorizontal: 15
    },
    pageTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    title: {
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
});

export default styles;
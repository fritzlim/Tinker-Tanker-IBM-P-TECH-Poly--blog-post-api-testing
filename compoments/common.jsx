import styles from '../stylesheets/styles';
import { View } from 'react-native';

export const Separator = () => ( // Adapted from https://reactnative.dev/docs/button#example.
    <View style={styles.separator} />
);

export const Spacer = () => (
    <View style={styles.spacer} />
);
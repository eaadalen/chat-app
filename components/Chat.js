import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, color } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View 
            style={{
                flex: 1,
                backgroundColor : color,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
        </View>
    );
}

export default Chat;
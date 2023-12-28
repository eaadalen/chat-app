import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat, KeyboardAvoidingView, Bubble } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const [messages, setMessages] = useState([]);
    const { name, userID } = route.params;

    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    }
    const renderBubble = (props) => {
        return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
      }

    useEffect(() => {
      navigation.setOptions({ title: name });
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
      const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          newMessages.push({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()) 
          })
        });
        setMessages(newMessages);
      });
      return () => {
        if (unsubMessages) unsubMessages();
      }
    }, []);

    return (
        <View style={styles.container}>
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            user={{
              _id: userID,
              name: name
            }}
            accessible={true}
            accessibilityLabel="Chat text box"
            accessibilityHint="Displays messages."
            accessibilityRole="text"
          />
          { /*Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null*/ }
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });

export default Chat;
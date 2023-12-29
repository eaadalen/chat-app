import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat, KeyboardAvoidingView, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
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
    
    let unsubMessages;

    useEffect(() => {
      navigation.setOptions({ title: name });
      if (isConnected === true) {
        if (unsubMessages) unsubMessages();
        unsubMessages = null;
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
        unsubMessages = onSnapshot(q, (documentsSnapshot) => {
          let newMessages = [];
          documentsSnapshot.forEach(doc => {
            newMessages.push({ 
              id: doc.id, 
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()) 
            })
          });
          cacheMessges(newMessages)
          setMessages(newMessages);
        });
      } else {
        loadCachedMessages();
      }
      return () => {
        if (unsubMessages) unsubMessages();
      }
    }, [isConnected]);

    const cacheMessges = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem('_messages', JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      }
    }

    const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem("_messages") || [];
      setMessages(JSON.parse(cachedMessages));
    }

    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
     }

    return (
        <View style={styles.container}>
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
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
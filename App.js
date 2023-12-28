import { StyleSheet } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBNUEeJ5QDsd9tELmN9e0z5_brD06psIqk",
    authDomain: "chatapp-d9c91.firebaseapp.com",
    projectId: "chatapp-d9c91",
    storageBucket: "chatapp-d9c91.appspot.com",
    messagingSenderId: "257832775469",
    appId: "1:257832775469:web:1e71d4303ee625a8abeda4",
    measurementId: "G-1KV9JHQ3N7"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start}/>
        <Stack.Screen name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
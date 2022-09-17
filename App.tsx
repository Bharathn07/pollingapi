
import { StyleSheet, Text, View } from 'react-native';

import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './components/redux/store';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>

      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Screen1} />
            <Stack.Screen name="Details" component={Screen2} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightcyan',
  },
});

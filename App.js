import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DictionaryCards from './sub-games/dictionaryCard/DictionaryCards';
import EnglishTilesGame from './sub-games/RevisedEnglishTilesGame/EnglishTilesGame';
import FrenchTilesGame from './sub-games/FrenchTilesGame/FrenchTilesGame';
import TextInputGame from './sub-games/TextInputGame/TextInputGame';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <>
    <View styles={styles.button}>
      <Button
        title="Go to Dictionary cards"
        onPress={() =>
          navigation.navigate('DictionaryCards',)
        }
        color='gray'
      />
    </View>
    <Button
      title="Go to English Tiles Game"
      onPress={() =>
        navigation.navigate('EnglishTilesGame',)
      }
      color='gray'
    />
     <Button
      title="Go to French Tiles Game"
      onPress={() =>
        navigation.navigate('FrenchTilesGame',)
      }
      color='gray'
    />
    <Button
      title="Go to Text Input Game"
      onPress={() =>
        navigation.navigate('TextInputGame',)
      }
      color='gray'
    />
    </>
  );
};

const DictionaryCardsGameApp = () => {
  return <DictionaryCards/>;
};

const EnglishTilesGameApp = () => {
  return <EnglishTilesGame/>;
};

const FrenchTilesGameApp = () => {
  return <FrenchTilesGame/>;
};

const TextInputGameApp = () => {
  return <TextInputGame/>;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Games' }}
        />
        <Stack.Screen name="DictionaryCards" component={DictionaryCardsGameApp} />
        <Stack.Screen name="EnglishTilesGame" component={EnglishTilesGameApp} />
        <Stack.Screen name="FrenchTilesGame" component={FrenchTilesGameApp} />
        <Stack.Screen name="TextInputGame" component={TextInputGameApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingTop: '30',
    paddingBottom: '30'
  }
});

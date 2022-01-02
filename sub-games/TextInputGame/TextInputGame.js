import { setStatusBarTranslucent, StatusBar } from 'expo-status-bar';
import React from 'react';
import {onChangeText, Image, Screen, TouchableHighlight, TextInput, FlatList, Button, alignItems, justifyContent, Platform, StyleSheet, AppButton, TouchableOpacity, TouchableHighlightStyleSheet, Text, View, Dimensions, Animated, PanResponder, backgroundColor, render } from 'react-native';
import {useState} from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

const vocabCards = [
  {
     image: require('./assets/mango.jpg'),
     description: "Mangos are sweet fruits that are typically are a yellow color with a hint of red/ orange. They have a hard center and juicy, soft pulp. Mangos typically grow on talll trees in tropical areas.", 
     engText: "Mango",
     frenchText: "Mangue", 
     //audio: require('/Users/jiya/test/assets/sound.m4a'),
   },
 
   {
     image: require('./assets/watermelon.jpeg'),
     description: "Watermelons are amoung the biggest fruits and come in sphereical shapes. They have a dark green outer layer, black seeds, and are red on the inside. They are sweet, juicy, and great to eat during the summertime!",
     engText: "Watermelon",
     frenchText: "Pastèque",
     //audio: require('/Users/jiya/test/assets/watermelon.m4a'),
   },
 
   {
     image: require('./assets/baobabFruit.jpeg'),
     description: "Baobab Fruit is common in Africa. It is light green or grey on the outside, and its pulp divides into small white pieces. The fruit tastes dry and has a yogurt-like flavor.",
     engText: "Baobab Fruit",
     frenchText: "fruit du baobab",
     //audio: require('/Users/jiya/test/assets/baobab fruit.m4a'),
   },
 
   {
     image: require('./assets/madd.jpeg'),
     description: "Madd is a orange/brown fruit that contains a soft and juicy pulp. The fruit is sweet and tart. The fruits usually grow on wines and take more than a year to harvest",
     engText: "Madd",
     frenchText: "Fou",
     //audio: require('/Users/jiya/test/assets/madd.m4a'),
   },
 
   {
     image: require('./assets/ditax.jpeg'),
     description: "Ditax has a brown outer coating and a green pulp. It can have both a sweet and sour flavor and has a dry pulp. Ditax also has a seed in the middle of the fruit.",
     engText: "Ditax",
     frenchText: "Ditax", 
     //audio: require('/Users/jiya/test/assets/ditax.m4a'),
   },
 
   {
     image: require('./assets/coconut.jpeg'),
     description: "Coconuts have a brown outer coating and are white on the inside. They are filled with flavored water and are typically hard to break. Coconuts are also found on high trees.",
     engText: "Coconut",
     frenchText: "Noix de coco", 
     //audio: require('/Users/jiya/test/assets/coconut.m4a'),
   },
 
   {image: require('./assets/tomato.jpeg'),
     description: "Tomatoes are red on the outside and on the inside. They have a squishy, soft pulp, which is filled with seeds. Tomatoes taste juicy and sweet, but can taste sour if they are not ripe.",
     engText: "Tomato",
     frenchText: "Tomate",
     //audio: require('/Users/jiya/test/assets/tomato.m4a'),
   },
]

//engligh text 
export default function TextInputGame() {
  const [englText, setenglText] = useState("");
  const [corrData, setCorrData] = useState(false);
  const [incorrData, setIncorrData] = useState(false);

  const compareEngText = () => {
    if(englText === vocabCards[index].engText) {
      setCorrData(true);
      setIncorrData(false);
    }else{
      setCorrData(false);
      setIncorrData(true);
    }
    
  }

//french text
//export default function App() {
  const [frenText, setfrenText] = useState("");
  const [correctData, setCorrectData] = useState(false);
  const [incorrectData, setIncorrectData] = useState(false);
  const [index, setIndex] = useState(0);
  console.log(index)

  const compareFrenText = () => {
    if(frenText === vocabCards[index].frenchText) {
      setCorrectData(true);
      setIncorrectData(false);
    }else{
      setCorrectData(false);
      setIncorrectData(true);
    }
  }

  const wcompareFrenText = () => {
    if (setCorrectData === false) {
      <View style = {styles.frenchContainer}>
        <Text>HIIIIIIIIII</Text>
      </View>
    }
  }
 
  return (
    <View style={styles.container}>
      <View style = {styles.topContainer}>
        <Text style = {styles.topText}>Spelling Game</Text>
      </View>

      <View style = {styles.imgContainer}>
        <Image source={vocabCards[index].image} style ={styles.imageFormat} onPress={()=>{console.log(index)}}/> 
      </View> 

    <View style = {styles.instContainer}> 
      <Text style = {styles.instText}>Fill in the text box with the English and French words of the image shown above. Don't add any unnecessary spaces!</Text>
    </View>

    <View style = {styles.englishContainer}>
      <TextInput 
      onChangeText= {(text) => setenglText(text)}
      keyboardType= "ascii-capable"
      placeholder="English Translation" style = {styles.textFormat}/> 
      {corrData ? <AntDesign name="checkcircle" size = {24} color = "#77DD77" style = {styles.englishCheckmark} /> : null}
      {incorrData ? <Entypo name="circle-with-cross" size={24} color="#FF392E" style = {styles.englishCross} /> : null}
     
      <Button title="Go" color="#3f3f3f" onPress={()=> 
        {console.log(englText);
          compareEngText();
        }}/>
    </View>
    
    <View style = {styles.frenchContainer}>
     <TextInput 
      onChangeText= {(text) => setfrenText(text)}
      keyboardType= "ascii-capable"
      //clearButtonMode = "always"
      placeholder="French Translation" style = {styles.textFormat}/> 
      {correctData ? <AntDesign name="checkcircle" size = {24} color = "#77DD77" style = {styles.FrenchCheckmark} /> : null}
      {incorrectData ? <Entypo name="circle-with-cross" size={24} color="#FF392E" style = {styles.frenchCross} /> : null}
      <Button title="Go" color="#3f3f3f" style = {styles.frenchButton} onPress={()=> 
      { console.log(frenText);
        compareFrenText();
      }}/>
    </View>
    
    
      <View style = {styles.moveButtons}>
         <Feather name="arrow-right-circle" size={24} color="#7f7f7f" style = {styles.nextButton} onPress={()=>{
            setIndex(index+1)
            console.log(index)
            if(index === 6) {
            console.log(index)
            setIndex(0);
          }
        }
      }/>
      </View> 
      <View style = {styles.moveButtons}> 
        <Feather name="arrow-left-circle" size={24} color="#7f7f7f" style = {styles.backButton} onPress={()=>{
            if(index === 0) {
              setIndex(vocabCards.length-1);
            } else{
              setIndex(index-1);
            }
          }
        }/>
      </View>
  </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // top 
  topText: {
    fontWeight: 'bold',
     fontSize: 21,
   },

   topContainer: {
     alignItems: 'center',
     width: "100%",
     height: "20%",
     top: "-10%",
     borderColor: 'black',
    // borderWidth: 0, 
    paddingBottom: "4%",
     backgroundColor: "#DFCAA0",
     justifyContent: 'flex-end',
   },

   //instructions
   instContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '-10%', 
    width: "95%", 
  },

   instText: {
    fontStyle: 'italic',
     fontSize: 19,
     textAlign: "center",
  },
  
   //image 
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: "-10%",
    width: "90%",
    height: "40%",
  },
  
  englishContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: "-0.5%",
    width: "90%",
    //height: "10%",
  },

  frenchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: "-0.5%",
    width: "90%",
    //height: "10%",
  },

  imageFormat: {
    width: "95%",
    height: "80%",
  },
  textFormat: {
    borderColor: "#ccc",
    borderWidth: 2,
    paddingHorizontal: 10, 
    paddingBottom: 10,
  },

  sampleText: {
    fontSize: 100, 
  },

  englishCheckmark: {
    bottom: '60%',
    left: '95%',
    position: 'absolute',
  },

  FrenchCheckmark: {
    bottom: '60%',
    left: '95%',
    position: 'absolute',
  },

  englishCross: {
    bottom: '60%',
    left: '95%',
    position: 'absolute',
  },

  frenchCross: {
    bottom: '60%',
    left: '95%',
    position: 'absolute',
  },

  moveButtons: {
    left: '35%',
    top: '2%',
  },

  nextButton: {
    bottom: '-70%',
  },

  backButton: {
    right: 300,
    bottom: '30%',
  }
});

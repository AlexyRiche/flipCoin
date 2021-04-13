import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, Animated, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Coin = () => {

  const rotateValue = useRef(new Animated.Value(0)).current;
  const [myCoinColor, setCoinColor] = useState('#2a4494');
  const [myButton, setButton] = useState(false);
  let isFlipped = false;

  const setColor = () => {
    let face = Math.floor(Math.random() * 2) + 1 ;

    if (face == 1) {
      setCoinColor('#2a4494');
    } else {
      setCoinColor('#FC4A02');
    }
  }
  const flip = () => {

    let AnimationConfig = {
      duration: 1000,
      useNativeDriver: true
    }

    if (isFlipped) {
      AnimationConfig = {
        ...AnimationConfig,
        toValue: 0
      }
    } else {
      AnimationConfig = {
        ...AnimationConfig,
        toValue: 540
      }
    }
    isFlipped = !isFlipped;
    Animated.timing(rotateValue, AnimationConfig).start(() => setColor());
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.coin,
      {
        transform: [{
          rotateX: rotateValue.interpolate({
            inputRange: [0, 540],
            outputRange: ['0deg', '540deg']
          })
        }]
      }, {backgroundColor: myCoinColor}]}>
      </Animated.View>
      <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#7CDDDB' : '#44CFCB'}, styles.button ]} onPress={flip}>
        <Text style={{fontSize: 20, color: 'white'}}>Flip the coin</Text>
      </Pressable>
    </View>
    )
}

const Die = () => {

  const rotateValue = useRef(new Animated.Value(0)).current;

  const faces = [
    require('./src/img/die_1.png'),
    require('./src/img/die_2.png'),
    require('./src/img/die_3.png'),
    require('./src/img/die_4.png'),
    require('./src/img/die_5.png'),
    require('./src/img/die_6.png')
  ]
  const [img, setImgDie] = useState(require('./src/img/die_1.png'));

  let face = Math.floor(Math.random() * 5) + 1;
  let isFlipped = false;

  const rollDie = () => {
    face = Math.floor(Math.random() * 5) + 1;

    let AnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    }

    if (isFlipped) {
      AnimationConfig = {
        ...AnimationConfig,
        toValue: 0
      }
    } else {
      AnimationConfig = {
        ...AnimationConfig,
        toValue: 540,
      }
    }
    isFlipped = !isFlipped
    Animated.timing(rotateValue, AnimationConfig).start(() => setImgDie(faces[face]));
  }

  return (
    <View style={styles.container}>
      
      <Animated.Image style={[styles.die,
       {
        transform: [{
          rotate: rotateValue.interpolate({
            inputRange: [0, 540],
            outputRange: ['0deg', '540deg']
          })
        }]
        }]} source={img}>
        
        </Animated.Image>

      <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#7CDDDB' : '#44CFCB'}, styles.button ]} onPress={rollDie}>
        <Text style={{fontSize: 20, color: 'white'}}>Roll the die</Text>
      </Pressable>
    </View>
  )
}


const homeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#7CDDDB' : '#44CFCB'}, styles.homeButton]} onPress= {() => navigation.navigate('FlipCoin')}>
          <Text style={{fontSize: 20, color: 'white'}}>Flip a Coin</Text>
        </Pressable>
        <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#7CDDDB' : '#44CFCB'}, styles.homeButton]} onPress={() => navigation.navigate('DieScreen')}>
          <Text style={{fontSize: 20, color: 'white'}}>Roll a die</Text>
        </Pressable>
    </View>
  )
}

const flipCoinScreen = () => {
  return (
     <View style={styles.container}>
      <Coin />
    </View>
  )
}

const dieScreen = () => {
  return (
     <View style={styles.container}>
       <Die />
    </View>
  )
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="FlipCoin" component={flipCoinScreen} />
        <Stack.Screen name="DieScreen" component={dieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const Coin = () => {

//   return (

//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  coin: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    marginBottom: 150,
  },
  button: {
    width: 350,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  homeButton: {
    width: 350,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  die: {
    width: 75,
    height: 75,
    marginBottom: 50
  }
});

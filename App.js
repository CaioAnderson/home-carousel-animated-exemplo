import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import {
  StyleSheet, Text, View, FlatList, Animated, Image, Dimensions
} from 'react-native';

import { DATA } from './src/service/data';
import { COLORS } from './src/utils/colors';

const { width, height } = Dimensions.get('screen');

const Indicator = ({ scrollX }) => {
  return <View style={{ flexDirection: 'row', position: 'absolute', bottom: 100 }}>
    {DATA.map((_, i) => {

      const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.4, 0.8],
        extrapolate: 'clamp'
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: 'clamp'
      });

      return <Animated.View
        key={`indicator-${i}`}
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: '#fff',
          margin: 10,
          opacity,
          transform: [{
            scale,
          }]
        }}
      />
    })}
  </View>
}


const BackImage = ({ scrollX }) => {

  const backgroundColor = scrollX.interpolate({
    inputRange: COLORS.map((_, i) => i * width),
    outputRange: COLORS.map(color => color),
  })

  return <Animated.View
    style={[StyleSheet.absoluteFill,
    {
      backgroundColor,
    }
    ]}
  />
}

const BackgroundImage = ({ scrollX }) => {

  const YOLO = Animated.modulo(Animated.divide(
    Animated.modulo(scrollX, width),
    new Animated.Value(width)), 1);

  const rotate = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: ['35deg', '-35deg', '35deg']
  })

  const translateX = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, -height, 0]
  })


  return <Animated.View
    style={{
      width: height,
      height: height,
      backgroundColor: '#fff',
      borderRadius: 86,
      position: 'absolute',
      top: -height * 0.6,
      left: -height * 0.3,
      transform: [
        {
          rotate
        },
        {
          translateX
        }
      ]
    }}
  />
}

export default function App() {

  const scrollX = useRef(new Animated.Value(0)).current;


  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <BackImage scrollX={scrollX} />
      <BackgroundImage scrollX={scrollX} />

      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{
            nativeEvent: { contentOffset: { x: scrollX } }
          }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <View style={{ width, alignItems: 'center', padding: 20 }}>
            <View style={{ flex: .7, justifyContent: 'center' }}>
              <Image source={{ uri: item.image }}
                style={styles.image} />
            </View>

            <View style={{ flex: .3 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

          </View>
        }}
      />

      <Indicator scrollX={scrollX} />

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

  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain'
  },

  title: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 24,
    marginBottom: 10

  },

  description: {
    fontWeight: '300',
    color: '#fff',
  },

});

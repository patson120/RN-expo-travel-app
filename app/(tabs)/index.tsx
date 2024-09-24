import TextButton from '@/components/TextButton'
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '@/constants'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useRef, useState } from 'react'
import { Image, Platform, TouchableOpacity, SafeAreaView, Text, View, Animated, ScrollView } from 'react-native'

const Dashboard = () => {

  const router = useRouter()

  const [countries, setcountries] = useState<any[]>([{ id: -1, name: '' }, ...dummyData.countries, { id: -2, name: '' }])
  const [places, setPlaces] = useState<any[]>([{ id: -1 }, ...dummyData.countries[0].places, { id: -2 }])

  const countryScrollX = useRef(new Animated.Value(0)).current
  const placeScrollX = useRef(new Animated.Value(0)).current

  const [placeScrollPosition, setPlaceScrollPosition] = useState(0)
  const [countryScrollPosition, setCountryScrollPosition] = useState(0)

  const COUNTRIES_ITEM_SIZE = SIZES.width / 2.8
  const PLACES_ITEM_SIZE = Platform.OS === 'ios' ? SIZES.width / 1.25 : SIZES.width / 1.2
  const EMPTY_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2

  const exploreButtonHandler = () => {
    // Get place current index
    const currentIndex = parseInt(`${placeScrollPosition}`, 10)

    // Navigate to Place
    router.push({ pathname: `/Place`, params: { countryId: countryScrollPosition, placeId: currentIndex } });
  }

  const renderHeader = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base
        }}
        className={`flex-row items-center`}>
        {/* Side Drawer */}
        <TouchableOpacity
          onPress={() => console.info("Side Drawer")}
          className='w-11 h-11 justify-center items-center'>
          <Image
            source={icons.side_drawer}
            resizeMode='contain'
            className='w-6 h-6'
            style={{
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        {/* Label title */}
        <View className='flex-1 justify-center items-center'>
          <Text style={{
            color: COLORS.white,
            ...FONTS.h3
          }}>ASIA</Text>
        </View>

        {/* Profile */}
        <TouchableOpacity
          onPress={() => { console.info("Profile") }}
        >
          <Image
            source={images.profile_pic}
            resizeMode='contain'
            className='w-11 h-11 rounded-3xl'
          />
        </TouchableOpacity>
      </View>
    )
  }
  const renderCountries = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment='center'
        snapToInterval={COUNTRIES_ITEM_SIZE}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        data={countries}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: countryScrollX } } }
        ], { useNativeDriver: false })}
        onMomentumScrollEnd={(event) => {
          // Calculate position
          var position = (event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZE).toFixed(0)

          setCountryScrollPosition(Number(position))
          // Set place
          setPlaces([
            { id: -1 },
            ...dummyData.countries[Number(position)].places,
            { id: -2 },
          ])
        }}
        renderItem={({ item, index }) => {
          const opacity = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          })
          const fontSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE
            ],
            outputRange: [15, 25, 15],
            extrapolate: 'clamp'
          })
          const mapSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE
            ],
            outputRange: [25, Platform.OS === 'android' ? 60 : 80, 25],
            extrapolate: 'clamp'
          })
          if (index === 0 || index === countries.length - 1) {
            return <View style={{ width: COUNTRIES_ITEM_SIZE }} />
          } else {
            return (
              <Animated.View
                className={`justify-center items-center`}
                style={{
                  opacity: opacity,
                  height: 130,
                  width: COUNTRIES_ITEM_SIZE,
                }}>
                <Animated.Image
                  source={item.image}
                  resizeMode='contain'
                  style={{
                    width: mapSize,
                    height: mapSize,
                    tintColor: COLORS.white
                  }}
                />
                <Animated.Text
                  style={{
                    color: COLORS.white,
                    marginTop: 3,
                    ...FONTS.h1,
                    fontSize: fontSize,
                  }}>
                  {item.name}
                </Animated.Text>
              </Animated.View>
            )
          }
        }}
      />
    )
  }
  const renderPlaces = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={places}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{
          alignItems: 'center'
        }}
        snapToAlignment={'center'}
        snapToInterval={Platform.OS === 'ios' ? (PLACES_ITEM_SIZE + 28) : PLACES_ITEM_SIZE}
        scrollEventThrottle={16}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: placeScrollX } } }
        ], { useNativeDriver: false })}
        onMomentumScrollEnd={(event) => {
          // Calculate position
          var position = (event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE).toFixed(0)
          // Set Place scroll position
          setPlaceScrollPosition(Number(position))
        }}
        renderItem={({ item, index }) => {
          const opacity = placeScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          })
          let activeHeight = 0
          if (Platform.OS === 'ios') {
            if (SIZES.height > 800) {
              activeHeight = SIZES.height / 2
            }
            else {
              activeHeight = SIZES.height / 1.65
            }
          }
          else {
            activeHeight = SIZES.height / 1.75
          }
          const height = placeScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE
            ],
            outputRange: [SIZES.height / 2.25, activeHeight, SIZES.height / 2.25,],
            extrapolate: 'clamp'
          })
          if (index === 0 || index === places.length - 1) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />
          }
          else {
            return (
              <Animated.View
                className="justify-center items-center"
                style={{
                  opacity: opacity,
                  height: height,
                  width: PLACES_ITEM_SIZE,
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 10
                }}>
                <Animated.Image
                  source={item.image}
                  resizeMode='cover'
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    borderRadius: 20
                  }} />
                <View style={{ marginHorizontal: SIZES.padding }}
                  className='flex-1 justify-end items-center'>
                  <Text style={{
                    marginBottom: SIZES.radius,
                    color: COLORS.white,
                    ...FONTS.h1
                  }}>{item.name}</Text>
                  <Text style={{
                    marginBottom: SIZES.padding * 2,
                    textAlign: 'center',
                    color: COLORS.white,
                    ...FONTS.body3
                  }}>{item.description}</Text>
                  <View className='mt-3' />
                  <TextButton
                    label='Explore'
                    onPress={exploreButtonHandler}
                    customContainerStyle={{
                      position: 'absolute',
                      bottom: -20,
                      width: 150,
                      paddingVertical: 9
                    }}
                  />
                </View>
              </Animated.View>
            )
          }
        }}
      />
    )
  }

  return (
    <SafeAreaView className='flex-1' style={{ backgroundColor: COLORS.black }}>
      {Platform.OS == 'android' ? <View className='mt-0'><StatusBar hidden={true} style='auto' /></View> : null}

      {renderHeader()}

      <ScrollView contentContainerStyle={{
        paddingBottom: Platform.OS === 'android' ? 40 : 0
      }}>
        <View style={{ height: 700 }}>
          {/* Countries */}
          <View>
            {renderCountries()}
          </View>

          {/* Place */}
          <View style={{ height: Platform.OS === 'ios' ? 500 : 450 }}>
            {renderPlaces()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Dashboard
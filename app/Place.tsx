import { View, Text, SafeAreaView, Platform, ImageBackground, Image, Animated } from 'react-native'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { COLORS, dummyData, FONTS, icons, SIZES } from '@/constants'
import HeaderBar from '@/components/HeaderBar'
import TextIconButton from '@/components/TextIconButton'

import SlidingUpPanel from 'rn-sliding-up-panel'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MapStyle } from '@/styles'
import Rating from '@/components/Rating'
import TextButton from '@/components/TextButton'

const Place = () => {
  const router = useRouter()

  const { countryId, placeId } = useLocalSearchParams()
  const [country, setCountry] = useState(dummyData.countries[Number(countryId)])
  const [place, setPlace] = useState(country.places[Number(placeId)])
  const [selectedHotel, setSelectedHotel] = useState<any>()

  const [allowDragging, setAllowDragging] = useState(true)
  const _draggedValue = useRef(new Animated.Value(0)).current

  let _panel = useRef(null)

  useEffect(() => {
    // Listener that will disable panel dragging whenever the mapview is shown 
    _draggedValue.addListener(({ value }) => {
      if (value > SIZES.height) {
        setAllowDragging(false)
      }
    })
    return () => {
      _draggedValue.removeAllListeners()
    }
  }, [])


  const goBack = () => {
    router.back()
  }

  const renderPlace = () => {
    return (
      <ImageBackground
        className='flex-1 h-full w-full'
        source={place.image}>
        <HeaderBar
          title=''
          leftOnPressed={goBack}
          containerStyle={{
            marginTop: SIZES.padding * 1.4
          }}
        />
        <View style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'flex-end',
          marginBottom: 100
        }}>

          {/* Name & rattings */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Text style={{
              color: COLORS.white,
              ...FONTS.largeTitle
            }}>{place.name}</Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Text style={{
                marginRight: 5,
                color: COLORS.white,
                ...FONTS.h3
              }}>{place.rate}</Text>
              <Image
                source={icons.star}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20
                }}
              />
            </View>
          </View>

          {/* Description */}
          <Text style={{
            marginTop: SIZES.base,
            color: COLORS.white,
            ...FONTS.body3
          }}>{place.description}</Text>

          {/* Text Icon button */}
          <TextIconButton
            label='Book a flight'
            icon={icons.aeroplane}
            onPress={() => console.log("Book a flight")}
            customContainerStyle={{
              marginTop: 30
            }}
          />
        </View>
      </ImageBackground>
    )
  }
  const renderMap = () => {
    return (
      <SlidingUpPanel
        ref={(c: any) => (_panel = c)}
        allowDragging={allowDragging}
        draggableRange={{
          top: SIZES.height + 120,
          bottom: 120
        }}
        animatedValue={_draggedValue}
        onBottomReached={() => { setAllowDragging(true) }}
        showBackdrop={false}
        snappingPoints={[SIZES.height + 120]}
        height={SIZES.height + 120}
        friction={0.7}
      >
        <View className='flex-1 bg-transparent'>
          {/* Panel header */}
          <View
            style={{ height: 120 }}
            className='justify-center items-center bg-transparent'>
            <Image
              source={icons.up_arrow}
              resizeMode='contain'
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.white
              }}
            />
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>SWIPE FOR DETAILS</Text>
          </View>
          {/* Panel details */}
          <View style={{ backgroundColor: COLORS.white }}
            className='flex-1 justify-center items-center'>
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={place?.mapInitialRegion}
              customMapStyle={MapStyle}
              className='flex-1 h-full w-full'>
              {
                place.hotels.map((hotel, index) => (
                  <Marker
                    key={index}
                    coordinate={hotel.latlng}
                    identifier={`${hotel.id}`}
                    onPress={() => setSelectedHotel(hotel)}>
                    <Image
                      source={selectedHotel?.id === hotel.id ? icons.bed_on : icons.bed_off}
                      resizeMode='contain'
                      style={{
                        width: 50,
                        height: 50,
                      }}
                    />
                  </Marker>
                ))
              }
            </MapView>
            {/* Header */}
            <HeaderBar
              title={selectedHotel?.name}
              leftOnPressed={() => _panel.hide()}
              right={true}
              containerStyle={{
                position: 'absolute',
                top: SIZES.padding * 1.5
              }}
            />

            {/* Hotel details */}
            {
            (selectedHotel) && 
            <View
              style={{
                position: 'absolute',
                bottom: 30,
                left: 0,
                right: 0,
                padding: SIZES.radius
              }}>
              <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Hotels in {place.name}</Text>
              <View style={{
                flexDirection: 'row',
                paddingTop: SIZES.radius,
                padding: SIZES.radius,
                borderRadius: 15,
                backgroundColor: COLORS.transparentBlack1
              }}>
                <Image
                  source={selectedHotel?.image}
                  resizeMode='cover'
                  style={{
                    width: 90,
                    height: 120,
                    borderRadius: 15
                  }}
                />
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginLeft: SIZES.radius
                }}>
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{selectedHotel?.name}</Text>

                  {/* Rating  */}
                  <Rating
                    containerStyle={{ marginTop: SIZES.base }}
                    rate={selectedHotel?.rate}
                  />

                  <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                    <TextButton
                      label='Details'
                      customContainerStyle={{
                        marginTop: SIZES.base,
                        height: 45,
                        width: 100,
                      }}
                      customLabelStyle={{ ...FONTS.h3, }}
                      onPress={() => console.info("Details clicked")}
                    />
                    <View className='flex-1 justify-center items-end'>
                      <Text style={{
                        color: COLORS.lightGray, ...FONTS.body5,
                        fontSize: Platform.OS === 'ios' ? SIZES.body4 : SIZES.body5
                      }}>from $ {selectedHotel?.price} / night</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            }
          </View>

        </View>
      </SlidingUpPanel>
    )
  }

  return (
    <SafeAreaView className='flex-1'>
      {Platform.OS === 'ios' ? null : <View className=''><StatusBar hidden style='light' /></View>}
      {renderPlace()}
      {renderMap()}
    </SafeAreaView>
  )
}

export default Place
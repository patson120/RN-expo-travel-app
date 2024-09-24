

import { COLORS, FONTS, icons, SIZES } from '@/constants'
import React, { FC } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    title: string,
    leftOnPressed: () => void,
    right?: React.ReactNode,
    containerStyle?: any
}

const HeaderBar: FC<Props> = ({
    title,
    leftOnPressed,
    right,
    containerStyle
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                paddingHorizontal: SIZES.padding,
                ...containerStyle
            }}>

            {/* Back */}
            <View className='items-start'>
                <TouchableOpacity
                    className='justify-center items-center w-12 h-12 rounded-3xl'
                    style={{ backgroundColor: COLORS.transparentBlack }}
                    onPress={leftOnPressed}>
                    <Image
                        source={icons.left_arrow}
                        resizeMode='contain'
                        className='w-5 h-5'
                        style={{ tintColor: COLORS.white }}
                    />
                </TouchableOpacity>
            </View>

            {/* Title */}
            <View className='flex-1 justify-center items-center'>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {title}
                </Text>
            </View>

            {/* Settings */}
            {
                right && <TouchableOpacity
                    onPress={() => { }}
                    style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: COLORS.transparentBlack
                    }}>
                    <Image
                        source={icons.settings}
                        resizeMode='contain'
                        className='w-5 h-5'
                        style={{ tintColor: COLORS.white }}
                    />

                </TouchableOpacity>
            }
        </View>
    )
}

export default HeaderBar
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { COLORS, FONTS, SIZES } from '@/constants'

type Props = {
    label: string,
    icon: any,
    customContainerStyle?: any,
    customLabelStyle?: any,
    onPress: () => void
}

const TextIconButton: FC<Props> = ({
    label,
    icon,
    customContainerStyle,
    customLabelStyle,
    onPress

}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className='flex-row justify-center items-center'
            style={{
                height: 60,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle,
            }}>
            <Text style={{
                marginRight: SIZES.base,
                ...FONTS.h2,
                ...customLabelStyle,
            }}>{label}</Text>

            <Image
                source={icon}
                resizeMode='contain'
                className='w-6 h-6'
            />
        </TouchableOpacity>
    )
}

export default TextIconButton
import { COLORS, FONTS, SIZES } from '@/constants'
import React, { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'
type Props = {
    label: string,
    customContainerStyle?: any,
    customLabelStyle?: any,
    onPress: () => void
}
const TextButton: FC<Props> = ({ label, customContainerStyle, customLabelStyle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...customContainerStyle
            }}>
            <Text style={{ ...FONTS.h2, ...customLabelStyle }}>{label}</Text>
        </TouchableOpacity>
    )
}
export default TextButton
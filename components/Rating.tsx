

import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { icons } from '@/constants'

type Props = {
    containerStyle?: any,
    rate: number
}

const Rating: FC<Props> = ({ containerStyle, rate }) => {
    const starComponents = []
    for (let i = 0; i < rate; i++) {
        starComponents.push(
            <Image
                key={`full-${i}`}
                source={icons.star}
                resizeMode='cover'
                style={{
                    marginLeft: i == 0 ? 0: 5,
                    width: 15,
                    height: 15
                }}
            />
        )
    }
    return (
        <View style={{ flexDirection: 'row', ...containerStyle }}>
            {starComponents}
        </View>
    )
}

export default Rating
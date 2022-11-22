import { Text, View } from 'react-native'

import tw from '@lib/twrnc'
import React from 'react'

export default function TextPlaceholder({ text, icon, style }: TextPlaceholderProps) {
  return (
    <View style={tw.style('items-center justify-center', style)}>
      {icon && <View style={tw`mb-2`}>{icon}</View>}
      <Text style={tw`text-gray text-center font-regular`}>{text}</Text>
    </View>
  )
}

interface TextPlaceholderProps {
  text: string | JSX.Element
  icon?: JSX.Element
  style?: any
}

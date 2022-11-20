import { Text, View } from 'react-native'

import tw from '@lib/twrnc'
import React from 'react'

export default function TextPlaceholder({ text, icon }: TextPlaceholderProps) {
  return (
    <View style={tw`items-center justify-center`}>
      {icon && <View style={tw`mb-2`}>{icon}</View>}
      <Text style={tw`text-gray text-center font-regular`}>{text}</Text>
    </View>
  )
}

interface TextPlaceholderProps {
  text: string | JSX.Element
  icon?: JSX.Element
}

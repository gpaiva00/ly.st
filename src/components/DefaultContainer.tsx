import tw from '@lib/twrnc'
import React from 'react'
import { View } from 'react-native'

export default function DefaultContainer({ children }: DefaultContainerProps) {
  return <View style={tw`flex-1 bg-background pt-10 px-5`}>{children}</View>
}

interface DefaultContainerProps {
  children: React.ReactNode
}

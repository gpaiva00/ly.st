import { Text } from 'react-native'

import tw from '@lib/twrnc'

interface TitleProps {
  style?: string
  children: string
}

export default function ScreenSubtitle({ style, children }: TitleProps) {
  return (
    <Text
      numberOfLines={1}
      style={tw.style('text-gray text-xs', style)}>
      {children}
    </Text>
  )
}

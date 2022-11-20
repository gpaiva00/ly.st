import tw from '@lib/twrnc'
import { Text } from 'react-native'

export const CHAR_TITLE_LIMIT = 13

export default function ScreenTitle({ style, children }: TitleProps) {
  return (
    <Text
      numberOfLines={1}
      style={tw.style(
        'font-black text-black',
        {
          'text-3xl': children.length <= CHAR_TITLE_LIMIT,
          'text-2xl flex-row max-w-[250px]': children.length > CHAR_TITLE_LIMIT,
        },
        style
      )}>
      {children}
    </Text>
  )
}

interface TitleProps {
  style?: string
  children: string | React.ReactNode
}

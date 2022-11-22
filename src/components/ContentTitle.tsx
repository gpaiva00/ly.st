import tw from '@lib/twrnc'
import { Variants } from '@typings/ListVariant'
import { Text } from 'react-native'

export default function ContentTitle({
  variant,
  children,
  alignCenter = false,
  style,
}: ContentTitleProps) {
  return (
    <Text
      style={tw.style(
        'font-semibold text-black',
        {
          'text-primary': variant === 'primary',
          'text-center': alignCenter,
        },
        style
      )}>
      {children}
    </Text>
  )
}

interface ContentTitleProps {
  variant?: Variants
  children: React.ReactNode
  alignCenter?: boolean
  style?: any
}

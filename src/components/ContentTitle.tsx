import tw from '@lib/twrnc'
import { ListVariant } from '@typings/ListVariant'
import { Text } from 'react-native'

export default function ContentTitle({ variant, children }: ContentTitleProps) {
  return (
    <Text
      style={tw.style('font-bold text-black', {
        'text-primary': variant === 'primary',
      })}>
      {children}
    </Text>
  )
}

interface ContentTitleProps {
  variant?: ListVariant
  children: React.ReactNode
}

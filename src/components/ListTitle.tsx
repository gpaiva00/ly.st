import tw from '@lib/twrnc'
import { ListVariant } from '@typings/ListVariant'
import { Text } from 'react-native'

export default function ListTitle({ variant, children }: ListTitleProps) {
  return (
    <Text
      style={tw.style('font-regular', {
        'text-danger': variant === 'danger',
        'text-black': variant === 'default',
        'text-primary': variant === 'primary' || variant === 'completed',
        'line-through': variant === 'completed',
      })}>
      {children}
    </Text>
  )
}

interface ListTitleProps {
  variant?: ListVariant
  children: React.ReactNode
}

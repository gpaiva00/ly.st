import tw from '@lib/twrnc'
import { Variants } from '@typings/ListVariant'
import { Text } from 'react-native'

export default function ListTitle({
  variant = 'default',
  children,
  style,
}: ListTitleProps) {
  return (
    <Text
      style={tw.style(
        'font-regular text-base',
        {
          'text-danger': variant === 'danger',
          'text-black': variant === 'default',
          'text-primary': variant === 'primary',
          'line-through opacity-50 text-gray': variant === 'completed',
        },
        style
      )}>
      {children}
    </Text>
  )
}

interface ListTitleProps {
  variant?: Variants
  children: React.ReactNode
  style?: any
}

import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import tw from '@lib/twrnc'

interface ButtonProps {
  text?: string
  onPress: (...args) => void
  icon?: JSX.Element
  isLoading?: boolean
  style?: string
  variant?: 'primary' | 'secondary' | 'transparent' | 'circle-primary'
}

export default function Button({
  text,
  icon,
  onPress,
  isLoading,
  style,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center justify-center rounded-lg p-2',
        {
          'bg-transparent': variant === 'transparent',
          'border border-primary': variant === 'secondary',
          'bg-primary': variant === 'primary',
          'bg-primary rounded-full h-auto': variant === 'circle-primary',
        },
        style
      )}
      onPress={onPress}
      disabled={isLoading}
      {...props}>
      {icon && icon}
      {isLoading && (
        <ActivityIndicator
          size="small"
          color="white"
        />
      )}
      {text && !isLoading && (
        <Text
          style={tw.style('text-base font-semibold', {
            'text-primary': variant === 'secondary',
            'text-zinc-500': variant === 'transparent',
            'text-white': variant === 'primary',
            'ml-2': !!icon,
          })}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}

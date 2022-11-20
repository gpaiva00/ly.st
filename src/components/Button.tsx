import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import tw from '@lib/twrnc'

export default function Button({
  text,
  icon,
  onPress,
  isLoading,
  style,
  variant = 'primary',
  size,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center justify-center rounded-lg p-2',
        {
          'bg-transparent p-0': variant === 'transparent',
          'border border-primary': variant === 'secondary',
          'bg-primary': variant === 'primary',
          'bg-primary rounded-full h-auto': variant === 'circle-primary',
          'h-6 w-6': size === 'sm',
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
            'text-primary': variant === 'secondary' || variant === 'transparent',
            'text-white': variant === 'primary',
            'ml-2': !!icon,
          })}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}

interface ButtonProps {
  text?: string
  onPress: (...args) => void
  icon?: JSX.Element
  isLoading?: boolean
  style?: string
  variant?: 'primary' | 'secondary' | 'transparent' | 'circle-primary'
  size?: 'sm' | 'md' | 'lg'
}

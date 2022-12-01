import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

import tw from '@lib/twrnc'
import { INPUT_SIZE } from '@style/sizes'

export default function Button({
  text,
  icon,
  onPress,
  isLoading,
  style,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center justify-center rounded-xl shadow-lg',
        {
          'bg-transparent p-0': variant === 'transparent',
          'border border-primary': variant === 'secondary',
          'bg-primary': variant === 'primary',
          'bg-primary rounded-full h-auto': variant === 'circle-primary',
          height: INPUT_SIZE,
          'h-6 w-6': size === 'sm',
          'w-1/2': size === 'lg',
          'w-1/3': size === 'md',
          'w-full': size === 'full',
        },
        style
      )}
      onPress={onPress}
      disabled={isLoading}
      {...props}
    >
      {icon && icon}
      {isLoading && <ActivityIndicator size="small" color="white" />}
      {text && !isLoading && (
        <Text
          style={tw.style('text-base font-semibold', {
            'text-primary': variant === 'secondary' || variant === 'transparent',
            'text-white': variant === 'primary',
            'ml-2': !!icon,
          })}
        >
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
  style?: any
  variant?: 'primary' | 'secondary' | 'transparent' | 'circle-primary'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
}

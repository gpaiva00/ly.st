import { TextInput as NativeTextInput, TextInputProps } from 'react-native'

import tw from '@lib/twrnc'
import colors from '@style/colors'

interface CustomTextInputProps extends TextInputProps {
  placeholder: string
  value?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  style?: string
}

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  size = 'full',
  style,
  ...props
}: CustomTextInputProps) {
  return (
    <NativeTextInput
      style={tw.style(
        'border border-gray rounded-lg px-2 w-full h-8',
        {
          'w-1/6': size === 'xs',
          'w-[50px]': size === 'sm',
          'w-1/3': size === 'md',
          'w-1/2': size === 'lg',
          'w-full': size === 'full',
        },
        style
      )}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  )
}

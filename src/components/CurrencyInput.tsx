import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input'

import tw from '@lib/twrnc'
import colors from '@style/colors'
import { INPUT_SIZE } from '@style/sizes'

export default function CustomCurrencyInput({
  placeholder,
  value,
  onChangeValue,
  size = 'full',
  style,
  ...props
}: CustomCurrencyInputProps) {
  return (
    <CurrencyInput
      style={tw.style(
        'border border-lightGray rounded-xl px-2 w-full shadow-lg',
        {
          'w-1/6': size === 'xs',
          'w-[50px]': size === 'sm',
          'w-1/3': size === 'md',
          'w-1/2': size === 'lg',
          'w-full': size === 'full',
          height: INPUT_SIZE,
        },
        style
      )}
      placeholder={placeholder}
      placeholderTextColor={colors.gray}
      value={value}
      onChangeValue={onChangeValue}
      autoCapitalize="none"
      {...props}
    />
  )
}

interface CustomCurrencyInputProps extends CurrencyInputProps {
  placeholder: string
  value?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  style?: string
  onChangeValue: (value: number) => void
}

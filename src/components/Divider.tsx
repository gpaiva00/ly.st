import tw from '@lib/twrnc'
import { Variants } from '@typings/ListVariant'
import React from 'react'
import { View } from 'react-native'

export default function Divider({ variant }: DividerProps) {
  return (
    <View
      style={tw.style('border-b-[0.5px] border-b-lightGray', {
        'border-b-primary': variant === 'primary',
        'border-b-gray': variant === 'dark',
      })}
    />
  )
}

interface DividerProps {
  variant?: Variants
}

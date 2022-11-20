import tw from '@lib/twrnc'
import { ListVariant } from '@typings/ListVariant'
import React from 'react'
import { View } from 'react-native'

export default function Divider({ variant }: DividerProps) {
  return (
    <View
      style={tw.style('border-b-[1px] border-b-lightGray', {
        'border-b-primary': variant === 'primary',
      })}
    />
  )
}

interface DividerProps {
  variant?: ListVariant
}

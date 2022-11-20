import { SMALL_ICON_SIZE } from '@common/iconSizes'
import Button from '@components/Button'
import ScreenSubtitle from '@components/ScreenSubtitle'
import ScreenTitle from '@components/ScreenTitle'
import tw from '@lib/twrnc'
import colors from '@style/colors'
import { CaretLeft } from 'phosphor-react-native'
import React from 'react'
import { View } from 'react-native'

export default function Header({
  title,
  subtitle,
  options,
  style,
  onPressBackButton,
}: HeaderProps) {
  return (
    <View style={tw.style('flex-row items-center justify-between pb-6', style)}>
      <View style={tw`flex-row items-center`}>
        {onPressBackButton && (
          <Button
            onPress={onPressBackButton}
            variant="transparent"
            icon={
              <CaretLeft
                color={colors.black}
                size={SMALL_ICON_SIZE}
                weight="bold"
              />
            }
            style={tw`mr-2`}
          />
        )}
        <View>
          {subtitle && <ScreenSubtitle>{subtitle}</ScreenSubtitle>}
          <ScreenTitle>{title}</ScreenTitle>
        </View>
      </View>
      {options}
    </View>
  )
}

interface HeaderProps {
  title: string
  subtitle?: string
  options?: JSX.Element
  style?: string
  onPressBackButton?: () => void
}

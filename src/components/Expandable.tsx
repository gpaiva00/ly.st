import ContentTitle from '@components/ContentTitle'
import Divider from '@components/Divider'
import ListTitle from '@components/ListTitle'
import tw from '@lib/twrnc'
import colors from '@style/colors'
import { ICON_SIZES } from '@style/sizes'
import { Variants } from '@typings/ListVariant'
import { CaretRight, Check } from 'phosphor-react-native'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

export default function Expandable({
  title,
  children,
  variant = 'default',
  highlight = false,
  style,
  titleStyle,
  onToggle = () => {},
  onLongPress = () => {},
}: ExpandableProps) {
  const [showContent, setShowContent] = useState(false)

  const toggleShowContent = () => {
    onToggle(!showContent)
    setShowContent(!showContent)
  }

  return (
    <>
      <View style={tw.style(style)}>
        <TouchableOpacity onPress={toggleShowContent} onLongPress={onLongPress}>
          <View style={tw`flex-row items-center justify-between py-3`}>
            {highlight ? (
              <ContentTitle variant="primary" style={tw.style(titleStyle)}>
                {title}
              </ContentTitle>
            ) : (
              <ListTitle
                variant={showContent ? 'default' : variant}
                style={tw.style(titleStyle)}
              >
                {title}
              </ListTitle>
            )}
            {variant === 'completed' && !showContent ? (
              <Check size={ICON_SIZES.SMALL} color={colors.primary} weight="bold" />
            ) : (
              <CaretRight
                size={ICON_SIZES.SMALL}
                color={
                  colors[showContent && !highlight ? 'lightGray' : variant] ||
                  colors.lightGray
                }
                weight="bold"
                style={tw.style({
                  transform: showContent && [{ rotate: '90deg' }],
                })}
              />
            )}
          </View>
        </TouchableOpacity>

        {showContent && children}
      </View>
      <Divider variant={variant} />
    </>
  )
}

interface ExpandableProps {
  variant?: Variants
  children: React.ReactNode
  title: string
  highlight?: boolean
  style?: any
  titleStyle?: string
  onToggle?: (showContent: boolean) => void
  onLongPress?: () => void
}

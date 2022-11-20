import { SMALL_ICON_SIZE } from '@common/iconSizes'
import Divider from '@components/Divider'
import ListTitle from '@components/ListTitle'
import tw from '@lib/twrnc'
import colors from '@style/colors'
import { Category } from '@typings/Category'
import { List, ListItem as ListItemTypings } from '@typings/List'
import { ListVariant } from '@typings/ListVariant'
import { CaretRight } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

export default function ListItem({
  item,
  icon,
  variant = 'default',
  onPress,
  onLongPress,
  alignCenter = false,
}: ListItemProps) {
  return (
    <TouchableOpacity
      key={item.id}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={tw`flex-row items-center justify-between py-3`}>
        <View
          style={tw.style('flex-row', {
            'flex-1 items-center justify-center': alignCenter,
          })}>
          {icon && <View style={tw`mr-2`}>{icon}</View>}
          <ListTitle variant={variant}>{item.title}</ListTitle>
        </View>

        {onPress && (
          <CaretRight
            size={SMALL_ICON_SIZE}
            color={colors[variant] || colors.lightGray}
            weight="bold"
          />
        )}
      </View>
      <Divider />
    </TouchableOpacity>
  )
}

interface ListItemProps {
  item: List | ListItemTypings | Category | { id: number | string; title: string }
  icon?: JSX.Element
  onPress?: () => void
  onLongPress?: () => void
  variant?: ListVariant
  alignCenter?: boolean
}

import ContentTitle from '@components/ContentTitle'
import Divider from '@components/Divider'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import { Category } from '@typings/Category'
import { HistoryItem as HistoryItemTyping } from '@typings/History'
import { ItemsByCategory } from '@typings/List'
import { getCategoryTitleByID } from '@utils/getCategoryTitleByID'
import { separateByCategory } from '@utils/separateByCategory'
import React from 'react'
import { View } from 'react-native'

export default function HistoryItem({ history, categories }: HistoryItemProps) {
  return (
    <View
      key={history.id}
      style={tw`flex-1 w-full items-start bg-white rounded-xl px-5 py-3 mb-2`}
    >
      <TextPlaceholder style={tw`mb-2`} text={`compras de ${history.createdAt}`} />
      {separateByCategory(history.listItems).map(
        ({ categoryID, items }: ItemsByCategory) => (
          <View key={categoryID} style={tw`flex-1 w-full`}>
            <ContentTitle variant="primary" alignCenter style={tw`py-2 font-regular`}>
              {getCategoryTitleByID(categoryID, categories)}
            </ContentTitle>

            {items.map(item => (
              <View key={item.id} style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-row`}>
                  <TextPlaceholder text={item.title} />
                  {item.quantity > 1 && <TextPlaceholder text={` x ${item.quantity}`} />}
                </View>
                <TextPlaceholder text={`R$ ${item.price || 0}`} />
              </View>
            ))}
          </View>
        )
      )}

      <View style={tw`w-full mt-4 items-start`}>
        <View style={tw`w-full mb-2`}>
          <Divider />
        </View>
        <TextPlaceholder text="total" />
        <ContentTitle>{history.total}</ContentTitle>
      </View>
    </View>
  )
}

interface HistoryItemProps {
  history: HistoryItemTyping
  categories: Category[]
}

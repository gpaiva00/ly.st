import { DEFAULT_ICON_SIZE, MEDIUM_ICON_SIZE, SMALL_ICON_SIZE } from '@common/iconSizes'
import routeNames from '@common/routesNames'
import Button from '@components/Button'
import DefaultContainer from '@components/DefaultContainer'
import Header from '@components/Header'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import colors from '@style/colors'
import { PlusCircle, Tag } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)

  const getLists = async () => {}

  const handleGoToCategories = () => navigation.navigate(routeNames.CATEGORIES)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLists()
    })

    return unsubscribe
  }, [])

  return (
    <DefaultContainer>
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-1`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getLists}
          />
        }>
        <Header
          title="listas"
          options={
            <View style={tw`flex-row`}>
              <Button
                onPress={handleGoToCategories}
                variant="transparent"
                icon={
                  <Tag
                    size={MEDIUM_ICON_SIZE}
                    color={colors.black}
                    weight="fill"
                  />
                }
              />
              <Button
                onPress={() => {}}
                variant="transparent"
                style={tw`ml-2`}
                icon={
                  <PlusCircle
                    size={DEFAULT_ICON_SIZE}
                    color={colors.primary}
                    weight="fill"
                  />
                }
              />
            </View>
          }
        />

        <View style={tw`flex-1 justify-center items-center`}>
          <TextPlaceholder
            text={
              <View style={tw`flex-row items-center`}>
                <TextPlaceholder text="aperte em" />
                <PlusCircle
                  size={SMALL_ICON_SIZE}
                  color={colors.gray}
                  weight="fill"
                  style={tw`mx-2`}
                />
                <TextPlaceholder text="para adicionar uma lista" />
              </View>
            }
          />
        </View>
      </ScrollView>
    </DefaultContainer>
  )
}

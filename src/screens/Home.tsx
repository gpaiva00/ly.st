import routeNames from '@common/routesNames'
import Button from '@components/Button'
import DefaultContainer from '@components/DefaultContainer'
import Divider from '@components/Divider'
import Header from '@components/Header'
import ListItem from '@components/ListItem'
import TextInput from '@components/TextInput'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import {
  createList,
  deleteList,
  getLists as getListsFromStorage,
} from '@repositories/List'
import colors from '@style/colors'
import { ICON_SIZES } from '@style/sizes'
import { List } from '@typings/List'
import generateID from '@utils/generateID'
import { TagSimple } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import Toast from 'react-native-root-toast'

export default function Home({ navigation }) {
  const [lists, setLists] = useState<List[]>([])
  const [newList, setNewList] = useState<List>({} as List)

  const getLists = async () => {
    try {
      const lists = await getListsFromStorage()
      setLists(lists)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoToCategories = () => navigation.navigate(routeNames.CATEGORIES)

  const handleAddList = async () => {
    try {
      if (!newList?.title) return Toast.show('insira um nome para sua lista')

      const newListWithId: List = { ...newList, id: generateID(), items: [] }

      setLists([...lists, newListWithId])
      setNewList({} as List)

      await createList(newListWithId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnPressItem = (list: List) =>
    navigation.navigate(routeNames.LIST, { listParam: list })

  const handleOnLongPressItem = (item: List) => {
    Alert.alert('remover lista', 'tem certeza que deseja remover essa lista?', [
      {
        text: 'cancelar',
        style: 'cancel',
      },
      {
        text: 'sim',
        onPress: () => {
          try {
            deleteList(item.id).then(() => {
              getLists()
            })
          } catch (error) {
            console.error(error)
          }
        },
      },
    ])
  }

  const handleOnChangeInputText = (title: string) => setNewList({ ...newList, title })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLists()
    })

    return unsubscribe
  }, [])

  return (
    <DefaultContainer>
      <Header
        title="ly.st"
        options={
          <Button
            onPress={handleGoToCategories}
            variant="transparent"
            icon={
              <TagSimple
                size={ICON_SIZES.MEDIUM}
                color={colors.black}
                weight="bold"
              />
            }
            size="sm"
          />
        }
      />

      <View style={tw`flex-row items-center justify-between mb-4`}>
        <TextInput
          placeholder="nome da lista"
          value={newList?.title}
          onChangeText={handleOnChangeInputText}
          spellCheck={false}
          onSubmitEditing={handleAddList}
          returnKeyLabel="Pronto"
          style={tw`w-[220px]`}
        />
        <Button
          text="adicionar"
          onPress={handleAddList}
        />
      </View>

      <Divider />

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-grow pb-4`}
        showsVerticalScrollIndicator={false}>
        {!lists.length && (
          <View style={tw`flex-1 justify-center items-center`}>
            <TextPlaceholder text="sem listas por enquanto" />
          </View>
        )}

        {!!lists.length && (
          <View style={tw`flex-1`}>
            {lists.map(list => (
              <ListItem
                key={list.id}
                item={list}
                onPress={() => handleOnPressItem(list)}
                onLongPress={() => handleOnLongPressItem(list)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </DefaultContainer>
  )
}

import { MEDIUM_ICON_SIZE } from '@common/iconSizes'
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
    Alert.alert('remover lista', 'Tem certeza que deseja remover essa lista?', [
      {
        text: 'cancelar',
        style: 'cancel',
      },
      {
        text: 'remover',
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
    getLists()
  }, [])

  return (
    <DefaultContainer>
      <Header
        title="listas"
        options={
          <Button
            onPress={handleGoToCategories}
            variant="transparent"
            icon={
              <TagSimple
                size={MEDIUM_ICON_SIZE}
                color={colors.black}
              />
            }
          />
        }
      />

      <TextInput
        placeholder="nova da lista"
        value={newList?.title}
        onChangeText={handleOnChangeInputText}
        spellCheck={false}
        onSubmitEditing={handleAddList}
        style={tw`mb-6`}
        returnKeyLabel="Pronto"
      />

      <Divider />

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-grow pb-4`}
        showsVerticalScrollIndicator={false}>
        {!lists.length && (
          <View style={tw`flex-1 justify-center items-center`}>
            <TextPlaceholder text="insira o nome da lista e aperte Pronto" />
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

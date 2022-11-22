import DEFAULT_CATEGORIES from '@common/defaultCategories'
import Button from '@components/Button'
import DefaultContainer from '@components/DefaultContainer'
import Divider from '@components/Divider'
import Header from '@components/Header'
import ListItem from '@components/ListItem'
import TextInput from '@components/TextInput'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import {
  createCategory,
  createDefaultCategories,
  deleteCategory,
  getCategories as getCategoriesFromStorage,
} from '@repositories/Category'
import { Category } from '@typings/Category'
import generateID from '@utils/generateID'
import isAppRunningFirstTime from '@utils/isAppRunningFirstTime'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import Toast from 'react-native-root-toast'

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState<Category>({} as Category)

  const handleGoBack = () => navigation.goBack()

  const handleOnChangeInputText = (title: string) =>
    setNewCategory({ ...newCategory, title })

  const handleAddCategory = async () => {
    try {
      if (!newCategory?.title) return Toast.show('insira um nome para sua categoria')

      const newCategoryWithId = { ...newCategory, id: generateID() }

      setCategories([...categories, newCategoryWithId])
      setNewCategory({} as Category)
      await createCategory(newCategoryWithId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnLongPressItem = (item: Category) => {
    Alert.alert('remover categoria', 'tem certeza que deseja remover essa categoria?', [
      {
        text: 'cancelar',
        style: 'cancel',
      },
      {
        text: 'sim',
        onPress: () => {
          try {
            deleteCategory(item.id).then(() => {
              getCategories()
            })
          } catch (error) {
            console.log(error)
          }
        },
      },
    ])
  }

  const getCategories = async () => {
    try {
      let categories = await getCategoriesFromStorage()
      const runningFirstTime = await isAppRunningFirstTime()

      if (runningFirstTime) {
        createDefaultCategories()
        categories = DEFAULT_CATEGORIES
      }

      setCategories(categories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategories()
    })

    return unsubscribe
  }, [])

  return (
    <DefaultContainer>
      <Header
        title="categorias"
        onPressBackButton={handleGoBack}
      />

      <View style={tw`flex-row items-center justify-between mb-4`}>
        <TextInput
          placeholder="ex: comidas, bebidas, etc."
          value={newCategory?.title}
          onChangeText={handleOnChangeInputText}
          spellCheck={false}
          autoFocus
          onSubmitEditing={handleAddCategory}
          returnKeyLabel="Pronto"
          style={tw`w-[200px]`}
        />
        <Button
          text="adicionar"
          onPress={handleAddCategory}
          size="md"
        />
      </View>

      <Divider />

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-grow pb-4`}
        showsVerticalScrollIndicator={false}>
        {!categories.length && (
          <View style={tw`flex-1 justify-center items-center`}>
            <TextPlaceholder
              text={
                <View style={tw`flex-row items-center`}>
                  <TextPlaceholder text="digite o nome da categoria e aperte Pronto " />
                </View>
              }
            />
          </View>
        )}

        {!!categories.length && (
          <View style={tw`flex-1`}>
            {categories.map(list => (
              <ListItem
                key={list.id}
                item={list}
                // icon={
                //   <TagSimple
                //     size={SMALL_ICON_SIZE}
                //     color={colors.primary}
                //     weight="fill"
                //   />
                // }
                onLongPress={() => handleOnLongPressItem(list)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </DefaultContainer>
  )
}

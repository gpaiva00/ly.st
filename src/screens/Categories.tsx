import { SMALL_ICON_SIZE } from '@common/iconSizes'
import DefaultContainer from '@components/DefaultContainer'
import Divider from '@components/Divider'
import Header from '@components/Header'
import ListItem from '@components/ListItem'
import TextInput from '@components/TextInput'
import TextPlaceholder from '@components/TextPlaceholder'
import tw from '@lib/twrnc'
import {
  createCategory,
  deleteCategory,
  getCategories as getCategoriesFromStorage,
} from '@repositories/Category'
import colors from '@style/colors'
import { Category } from '@typings/Category'
import generateID from '@utils/generateID'
import { TagSimple } from 'phosphor-react-native'
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
      if (!newCategory?.title) Toast.show('insira um nome para sua categoria')

      const newCategoryWithId = { ...newCategory, id: generateID() }

      setCategories([...categories, newCategoryWithId])
      setNewCategory({} as Category)
      await createCategory(newCategoryWithId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnLongPressItem = (item: Category) => {
    Alert.alert('remover categoria', 'Tem certeza que deseja remover essa categoria?', [
      {
        text: 'cancelar',
        style: 'cancel',
      },
      {
        text: 'remover',
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
      const categories = await getCategoriesFromStorage()
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

      <TextInput
        placeholder="ex: comidas, bebidas, produtos de limpeza, etc."
        value={newCategory?.title}
        onChangeText={handleOnChangeInputText}
        spellCheck={false}
        autoFocus
        onSubmitEditing={handleAddCategory}
        returnKeyLabel="Pronto"
        style={tw`mb-6`}
      />

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
                icon={
                  <TagSimple
                    size={SMALL_ICON_SIZE}
                    color={colors.primary}
                    weight="fill"
                  />
                }
                onLongPress={() => handleOnLongPressItem(list)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </DefaultContainer>
  )
}

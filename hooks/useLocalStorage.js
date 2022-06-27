import {useCallback, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

async function getSavedValue (key, initialValue) {
  const savedValue = JSON.parse(await AsyncStorage.getItem(key))
  if (savedValue) return savedValue
  if (initialValue instanceof Function) return initialValue()
  return initialValue
}
export default function useLocalStorage (key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue)
  })
  useEffect(() => {
    const detect = async () => {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    }
    detect()
  }, [value])
  return [value, setValue]
}

import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './slices/navigationSlice'
import azelisReducer from './slices/azelis/azelisSlice'

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    azelis: azelisReducer
  }
})

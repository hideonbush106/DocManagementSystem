import React from 'react'
import { DataContext, DataContextType } from '~/context/DataContext'

const useData = () => {
  return React.useContext(DataContext) as DataContextType
}

export default useData

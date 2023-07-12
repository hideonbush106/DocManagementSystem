import React, { useState } from 'react'
import { Search } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { SearchFieldStyles } from './SearchField.styled'

interface Props {
  handleSearch: (value: string) => void
}

const SearchField = (props: Props) => {
  const [value, setValue] = useState('')
  const handleClick = () => {
    props.handleSearch(value)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <SearchFieldStyles
      size='small'
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start' onClick={handleClick}>
            <Search />
          </InputAdornment>
        )
      }}
      variant='outlined'
      placeholder='Search file'
      onChange={handleChange}
      onKeyUp={(e) => {
        if (e.key === 'Enter') props.handleSearch(value)
      }}
    />
  )
}

export default SearchField

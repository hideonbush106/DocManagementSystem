import { Search } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import { SearchFieldStyles } from './SearchField.styled'

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchField = (props: Props) => {
  return (
    <SearchFieldStyles
      size='small'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Search />
          </InputAdornment>
        )
      }}
      variant='outlined'
      placeholder='Search file'
      onChange={props.onChange}
    />
  )
}

export default SearchField

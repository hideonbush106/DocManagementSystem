import React from 'react'
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
// import useUserApi from '~/hooks/api/useUserApi'
// import { User } from '~/global/interface'

interface EmployeeSelectProps {
  selectedEmployee: string
  onChange: (event: SelectChangeEvent<string>) => void
  onClearFilter: () => void
}
const data = ['Hao Nguyen', 'Nguyen Thi Thanh Hao']
const FilterByEmployee: React.FC<EmployeeSelectProps> = ({ selectedEmployee, onChange, onClearFilter }) => {
  // const { getAllUsers } = useUserApi()
  // const [employees, setEmployees] = React.useState<User[]>([])
  // const [loading, setLoading] = React.useState<boolean>(true)
  // const [loadingEmployee, setLoadingEmployee] = React.useState<boolean>(false)
  // const fetchEmployees = async () => {
  //   try {
  //     const result = await getAllUsers()
  //     setEmployees(result.data)
  //     setLoading(false)
  //     setLoadingEmployee(false)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <FormControl variant='standard' sx={{ minWidth: 150, marginBottom: '1rem', marginRight: '20px' }}>
      <InputLabel id='status-select-label'>Employee</InputLabel>
      <Select labelId='status-select-label' id='status-select' value={selectedEmployee} onChange={onChange}>
        {data.map((d) => (
          <MenuItem value={d} key={d}>
            {d}
          </MenuItem>
        ))}
      </Select>
      {selectedEmployee && (
        <IconButton
          onClick={onClearFilter}
          size='small'
          sx={{ position: 'absolute', top: '70%', right: '20px', transform: 'translateY(-50%)' }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </FormControl>
  )
}

export default FilterByEmployee

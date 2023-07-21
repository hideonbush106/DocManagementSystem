import React from 'react'
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

interface EmployeeSelectProps {
  selectedEmployee: string
  onChange: (event: SelectChangeEvent<string>) => void
  onClearFilter: () => void
}
const data = ['Hao Nguyen', 'Nguyen Thi Thanh Hao']
const FilterByEmployee: React.FC<EmployeeSelectProps> = ({ selectedEmployee, onChange, onClearFilter }) => {
  return (
    <FormControl variant='standard' sx={{ minWidth: 150, marginBottom: '1rem' }}>
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

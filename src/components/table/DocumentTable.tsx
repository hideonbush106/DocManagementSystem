import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material'

const TableCellCustom = styled(TableCell)({
  height: '20px',
  border: 'none',
  outline: 'none',
  padding: '5px 10px 5px 0'
})

const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const DocumentTable = () => {
  return (
    <TableContainer sx={{ boxShadow: 'none', margin: '10px 0' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCellCustom>Dessert (100g serving)</TableCellCustom>
            <TableCellCustom align='right'>Calories</TableCellCustom>
            <TableCellCustom align='right'>Fat&nbsp;(g)</TableCellCustom>
            <TableCellCustom align='right'>Carbs&nbsp;(g)</TableCellCustom>
            <TableCellCustom align='right'>Protein&nbsp;(g)</TableCellCustom>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCellCustom component='th' scope='row'>
                {row.name}
              </TableCellCustom>
              <TableCellCustom align='right'>{row.calories}</TableCellCustom>
              <TableCellCustom align='right'>{row.fat}</TableCellCustom>
              <TableCellCustom align='right'>{row.carbs}</TableCellCustom>
              <TableCellCustom align='right'>{row.protein}</TableCellCustom>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DocumentTable

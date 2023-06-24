import { useState } from 'react'

function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const maxPage = Math.ceil(data.length / itemsPerPage)

  function currentData(): T[] {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }

  function next(): void {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage))
  }

  function prev(): void {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }

  function jump(page: number): void {
    const pageNumber = Math.max(1, page)
    setCurrentPage(() => Math.min(pageNumber, maxPage))
  }

  return { next, prev, jump, currentData, currentPage, maxPage }
}

export default usePagination

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'

interface PaginationProps {
  pages: number
  items: number
  page: number
}

export const Pagination =({ items, page, pages }: PaginationProps) =>  {
  const [, setSearchParams] = useSearchParams()

  const FirstPage = () => {
    setSearchParams(params => {
      params.set('page' , '1')
      return params
    })
  }
  const NextPage = () => {
    if(page + 1 > pages) {
      return
    }
    setSearchParams(params => {
      params.set('page', String(page + 1))
      return params
    })
  }
  const PreviousPage = () => {
    if(page - 1 <= 0) {
      return
    }
    setSearchParams(params => {
      params.set('page', String(page - 1))
      return params
    })
  }
  const LastPage = () => {
    setSearchParams(params => {
      params.set('page' ,String(pages))
      return params
    })
  }

  return (
    <div className="flex text-sm items-center justify-between text-zinc-500">
      <span>Showing 10 of {items} items</span>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>

          <Select defaultValue="10">
            <SelectTrigger aria-label="Page" />
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span>Page {page} of {pages}</span>

        <div className="space-x-1.5">
          <Button onClick={FirstPage} size="icon" disabled={page - 1 <= 0}>
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button onClick={PreviousPage}  size="icon" disabled={page - 1 <= 0}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button onClick={NextPage} size="icon" disabled={page + 1 > pages}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button onClick={LastPage} size="icon" disabled={page + 1 > pages}>
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

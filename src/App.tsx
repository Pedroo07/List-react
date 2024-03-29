import { Plus, Search, FileDown, MoreHorizontal, Filter } from "lucide-react"
import { Header } from "./components/header"
import { Tabs } from "./components/tabs"
import { Button } from "./components/ui/button"
import { Control, Input } from "./components/ui/input"
import { Table, TableBody, TableCell } from "./components/ui/table"
import { TableHead, TableHeader, TableRow } from "./components/ui/table"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { Pagination } from "./components/pagination"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { KeyboardEvent } from "react"
import { CreateTagForm } from './components/createTagForm'
import * as Dialog from '@radix-ui/react-dialog'

export interface TagResponse {
  first: number
  prev: number | null
  next: number
  last: number
  pages: number
  items: number
  data: Tag[]
}

export interface Tag {
  title: string
  amountOfVideos: number
  id: string
}

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlFilter = searchParams.get('filter') ?? ''
  const [filter, setFilter] = useState(urlFilter)
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const { data: TagsResponse, isLoading } = useQuery<TagResponse>({
    queryKey: ['get-tags', urlFilter, page],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`)
      const data = await response.json()
      console.log(data)
      return data
      if (isLoading) {
        return null
      }
    },
    placeholderData: keepPreviousData
  })
  const filteredItens = () => {
    setSearchParams(params => {
      params.set('page', '1')
      params.set('filter', filter)

      return params
    })

  }
  const handleKeyEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      filteredItens()
    }

  }
  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button variant="primary">
                <Plus className="size-3 " />
                Create New
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/70" />
              <Dialog.Content className="fixed right-0 top-0 bottom-0 h-screen min-w-[320px] bg-zinc-950 border-zinc-900 border-l">
                <div className="space-y-3">
                  <Dialog.Title className="text-xl font-bold">
                    Create Tag
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-zinc-500">
                    Tags can be used to group videos about similar concepts.
                  </Dialog.Description>
                </div>
                <CreateTagForm />
                <Dialog.Close />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Input variant="filter" >
              <Search className="size-3" />
              <Control placeholder="Search tags..." onKeyDown={handleKeyEnter} onChange={e => setFilter(e.target.value)} value={filter} />
            </Input>
            <Button onClick={filteredItens}>
              <Filter className="size-3" />
              Filter
            </Button>
          </div>
          <Button>
            <FileDown className="size-3" />
            Export
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TagsResponse?.data.map((tag) => {
              return (
                <TableRow key={tag.id}>
                  <TableCell> </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{tag.title}</span>
                        <span className="font-xs text-zinc-500">{tag.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300"> {tag.amountOfVideos} video(s)</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {TagsResponse && <Pagination pages={TagsResponse.pages} items={TagsResponse.items} page={page} />}
      </main>
    </div>
  )
}

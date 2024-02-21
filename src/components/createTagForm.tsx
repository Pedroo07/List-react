import { Button } from './ui/button'
import { Check, X } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'

const createTagSchema = z.object({
    name: z.string().min(3, { message: 'Minimium 3 caractres' }),
    slug: z.string()
})
type CreateTagSchema = z.infer<typeof createTagSchema>
export const CreateTagForm = () => {
    const { register, handleSubmit } = useForm<CreateTagSchema>({
        resolver: zodResolver(createTagSchema)
    })

    const createTag = (data: CreateTagSchema) => {
        console.log(data)
    }
    return (
        <form className='w-full space-y-6' onSubmit={handleSubmit(createTag)} >
            <div className='space-y-2'>
                <label className='text-sm font-medium block' htmlFor='name'>Tag name</label>
                <input {...register('name')} type="text" id='name' className='border-zinc-800 rounded-lg px-3 py-2 block bg-zinc-800/50 w-full' />
            </div>
            <div className='space-y-2'>
                <label className='text-sm font-medium block' htmlFor='slug'>Slug</label>
                <input {...register('slug')} type="text" readOnly id='slug' className='border-zinc-800 rounded-lg px-3 py-2 block bg-zinc-800/50 w-full' />
            </div>
            <div className='flex items-center justify-end gap-2'>
                <Dialog.Close asChild>
                    <Button type='button'>
                        <X className='size-3' />
                        Cancel
                    </Button>
                </Dialog.Close>
                <Button type='submit' className='bg-teal-400 text-teal-950'>
                    <Check className='size-3' />
                    Save
                </Button>
            </div>
        </form>
    )
}


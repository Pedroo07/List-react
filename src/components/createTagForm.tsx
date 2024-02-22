import { Button } from './ui/button'
import { Check, Loader2, X } from 'lucide-react'
import {  z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import slugify from 'slugify'

const createTagSchema = z.object({
    title: z.string().min(3, { message: 'Minimium 3 caracteres' })
})

type CreateTagSchema = z.infer<typeof createTagSchema>

function getSlugFromString(input: string): string {
    return slugify(input, {
        lower: true,
        remove: /[*+~.()'"!:@]/g
    });
}
 export const CreateTagForm = () => {
    const { register, handleSubmit, watch, formState } = useForm<CreateTagSchema>({
        resolver: zodResolver(createTagSchema)
    })

    const slug = watch('title') ? getSlugFromString(watch('title')) : ''

    const createTag = async ({title}: CreateTagSchema) => {
        console.log({title , slug})

        await new Promise(resolve =>  setTimeout(resolve, 2000))

        await fetch('http://localhost:3333/tags', {
            method: 'POST',
            body: JSON.stringify({
                title,
                slug,
                amountOfvideos: 0
            })
        })
    }
    return (
        <form className='w-full space-y-6' onSubmit={handleSubmit(createTag)} >
            <div className='space-y-2'>
                <label className='text-sm font-medium block' htmlFor='title'>Tag name</label>
                <input {...register('title')} type="text" id='title' className='border-zinc-800 rounded-lg px-3 py-2 block bg-zinc-800/50 w-full' />
                {formState.errors?.title && (
                    <p className='text-sm text-red-400 px-2'>{formState.errors.title.message}</p>
                )}
            </div>
            <div className='space-y-2'>
                <label className='text-sm font-medium block' htmlFor='slug'>Slug</label>
                <input type="text" readOnly id='slug' value={slug} className='border-zinc-800 rounded-lg px-3 py-2 block bg-zinc-800/50 w-full' />
                
            </div>
            <div className='flex items-center justify-end gap-2'>
                <Dialog.Close asChild>
                    <Button type='button'>
                        <X className='size-3' />
                        Cancel
                    </Button>
                </Dialog.Close>
                <Button type='submit' disabled={formState.isSubmitting} className='bg-teal-400 text-teal-950'>
                    {formState.isSubmitting ? <Loader2 className='size-3 animate-spin'/>  : <Check className='size-3' />}
                    
                    Save
                </Button>
            </div>
        </form>
    )
}


'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CreateOrUpdateUserSchema } from './schema'

type Props = {
  form: UseFormReturn<CreateOrUpdateUserSchema>
  onSubmit: (data: CreateOrUpdateUserSchema) => void
  setIsUserModalOpen: Dispatch<SetStateAction<boolean>>
  isUserModalOpen: boolean
  defaultValues: CreateOrUpdateUserSchema | null
}

export const UserForm = ({
  form,
  onSubmit,
  setIsUserModalOpen,
  isUserModalOpen,
  defaultValues,
}: Props) => {
  const isSubmitting = form.formState.isSubmitting

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues)
    } else {
      form.reset({
        name: '',
        ap_paterno: '',
        ap_materno: '',
        ci: '',
        expedido_en: '',
        email: '',
        fecha_nacimiento: '',
        phone: '',
        address: '',
        avatar_url: '',
      })
    }
  }, [defaultValues, form])

  return (
    <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{defaultValues ? 'Editar usuario' : 'Agregar usuario'}</DialogTitle>
        </DialogHeader>
        <div className='max-h-[calc(100svh-200px)] overflow-y-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='ap_paterno'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido paterno</FormLabel>
                    <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='ap_materno'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido materno</FormLabel>
                    <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='ci'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CI</FormLabel>
                    <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='expedido_en'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expedido en</FormLabel>
                    <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl><Input type='email' {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fecha_nacimiento'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl><Input type='date' {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl><Input type='tel' {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl><Input {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='avatar_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL del avatar</FormLabel>
                    <FormControl><Input type='url' {...field} disabled={isSubmitting} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de usuario</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={isSubmitting}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      >
                        <option value="USER">Usuario</option>
                        <option value="ADMIN">Administrador</option>
                        <option value="PROVEEDOR">Proveedor</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <DialogFooter>
                <Button type='submit' disabled={isSubmitting}>
                  {defaultValues ? 'Actualizar' : 'Agregar'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

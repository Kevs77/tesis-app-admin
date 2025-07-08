'use client'

import { FC, useEffect, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import {
  createOrUpdateUserSchema,
  CreateOrUpdateUserSchema,
} from './schema'
import { createUser, deleteUser, updateUser } from '@/actions/users'
import { UserTableRow } from './user-table-row'
import { UserForm } from './user-form'

type Props = {
  users: CreateOrUpdateUserSchema[]
}

export const UserPageComponent: FC<Props> = ({ users }) => {
  const [currentUser, setCurrentUser] = useState<CreateOrUpdateUserSchema | null>(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const form = useForm<CreateOrUpdateUserSchema>({
    resolver: zodResolver(createOrUpdateUserSchema),
    defaultValues: {
      name: '',
      ap_paterno: '',
      ap_materno: '',
      email: '',
      ci: '',
      expedido_en: '',
      fecha_nacimiento: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: '',
      type: 'USER',
      intent: 'create',
    },
  })

  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      form.reset({
        ...currentUser,
        password: '',
        confirmPassword: '',
        intent: 'update',
      })
    } else {
      form.reset({
        name: '',
        ap_paterno: '',
        ap_materno: '',
        email: '',
        ci: '',
        expedido_en: '',
        fecha_nacimiento: '',
        address: '',
        phone: '',
        password: '',
        confirmPassword: '',
        type: 'USER',
        intent: 'create',
      })
    }
  }, [currentUser, form])

 const userSubmitHandler = async (data: CreateOrUpdateUserSchema) => {
  try {
    if (data.intent === 'update' && data.id) {
      await updateUser(data.id, {
        name: data.name,
        ap_paterno: data.ap_paterno,
        ap_materno: data.ap_materno,
        email: data.email,
        ci: data.ci,
        expedido_en: data.expedido_en,
        fecha_nacimiento: data.fecha_nacimiento,
        avatar_url: data.avatar_url ?? '',
        address: data.address ?? '',
        phone: data.phone ?? '',
        type: data.type,
      })
      toast.success('Usuario actualizado')
    } else {
      await createUser({
        id: crypto.randomUUID(), // ← aquí se genera el id
        name: data.name,
        ap_paterno: data.ap_paterno,
        ap_materno: data.ap_materno,
        email: data.email,
        ci: data.ci,
        expedido_en: data.expedido_en,
        fecha_nacimiento: data.fecha_nacimiento,
        avatar_url: data.avatar_url ?? '',
        address: data.address ?? '',
        phone: data.phone ?? '',
        expo_notification_token: null,
        stripe_customer_id: null,
        type: data.type,
      })
      toast.success('Usuario creado')
    }

    form.reset()
    router.refresh()
    setIsUserModalOpen(false)
  } catch (error) {
    console.error(error)
    toast.error('Error al guardar usuario')
  }
}



  const deleteUserHandler = async () => {
    if (currentUser?.id) {
      await deleteUser(currentUser.id)
      router.refresh()
      toast.success('Usuario eliminado')
      setIsDeleteModalOpen(false)
      setCurrentUser(null)
    }
  }

  return (
    <main className="grid flex-1 gap-4 p-4 sm:px-6 md:gap-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Administrador de usuarios</h1>
        <Button
          onClick={() => {
            setCurrentUser(null)
            setIsUserModalOpen(true)
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Agregar usuario
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre completo</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>CI</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <UserTableRow
              key={user.id}
              user={user}
              setCurrentUser={setCurrentUser}
              setIsUserModalOpen={setIsUserModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          ))}
        </TableBody>
      </Table>

      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentUser ? 'Editar' : 'Nuevo'} usuario</DialogTitle>
          </DialogHeader>
          <UserForm
            form={form}
            onSubmit={userSubmitHandler}
            defaultValues={currentUser}
            setIsUserModalOpen={setIsUserModalOpen}
            isUserModalOpen={isUserModalOpen}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar usuario</DialogTitle>
          </DialogHeader>
          <p>¿Deseas eliminar a {currentUser?.name}?</p>
          <DialogFooter>
            <Button variant="destructive" onClick={deleteUserHandler}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

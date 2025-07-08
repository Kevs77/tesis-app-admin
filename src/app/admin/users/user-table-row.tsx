import { Dispatch, SetStateAction } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CreateOrUpdateUserSchema } from '@/app/admin/users/schema'


type Props = {
   user: CreateOrUpdateUserSchema
  setIsUserModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentUser: Dispatch<SetStateAction<CreateOrUpdateUserSchema | null>>
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
}

export const UserTableRow = ({
  user,
  setIsUserModalOpen,
  setCurrentUser,
  setIsDeleteModalOpen,
}: Props) => {
  const handleEditClick = () => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      ap_paterno: user.ap_paterno,
      ap_materno: user.ap_materno,
      email: user.email,
      ci: user.ci,
      expedido_en: user.expedido_en,
      fecha_nacimiento: user.fecha_nacimiento,
      phone: user.phone ?? '',
      address: user.address ?? '',
      type: user.type,
      avatar_url: user.avatar_url ?? '',
      password: '',            
      confirmPassword: '', 
      intent: 'update',
    })
    setIsUserModalOpen(true)
  }

  const handleDeleteClick = () => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      ap_paterno: user.ap_paterno,
      ap_materno: user.ap_materno,
      email: user.email,
      ci: user.ci,
      expedido_en: user.expedido_en,
      fecha_nacimiento: user.fecha_nacimiento,
      phone: user.phone ?? '',
      address: user.address ?? '',
      type: user.type,
      avatar_url: user.avatar_url ?? '',
      password: '',            
      confirmPassword: '', 
      intent: 'update',
    })
    setIsDeleteModalOpen(true)
  }

  return (
    <TableRow key={user.id}>
      <TableCell>{user.name} {user.ap_paterno} {user.ap_materno}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.ci} {user.expedido_en}</TableCell>
      <TableCell>{user.type}</TableCell>
      <TableCell className='flex gap-2'>
        <Button variant='ghost' size='icon' onClick={handleEditClick}>
          <Pencil className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='icon' onClick={handleDeleteClick}>
          <Trash2 className='h-4 w-4' />
        </Button>
      </TableCell>
    </TableRow>
  )
}

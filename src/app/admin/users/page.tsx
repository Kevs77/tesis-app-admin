'use client'

import { getUsers } from '@/actions/users'
import { UserPageComponent } from '@/app/admin/users/page-component'
import { CreateOrUpdateUserSchema } from '@/app/admin/users/schema'

export default async function UsersPage() {
  const usersRaw = await getUsers()

  const users: CreateOrUpdateUserSchema[] = usersRaw.map(user => ({
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
    avatar_url: user.avatar_url ?? '',
    password: '',
    confirmPassword: '',
    type: user.type as 'USER' | 'ADMIN' | 'PROVEEDOR',
    intent: 'update',
  }))

  return <UserPageComponent users={users} />
}

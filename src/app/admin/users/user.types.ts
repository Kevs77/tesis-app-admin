// app/admin/users/users.types.ts

export type UserRow = {
  id: string
  name: string
  ap_paterno: string
  ap_materno: string
  email: string
  ci: string
  expedido_en: string
  fecha_nacimiento: string
  phone: string | null
  address: string | null
  avatar_url: string | null
  type:  'ADMIN' | 'PROVEEDOR' | 'USER'
  created_at: string | null
}

export type UsersResponse = UserRow[]

export type UpdateUserSchema = {
  id: string
  name: string
  ap_paterno: string
  ap_materno: string
  email: string
  ci: string
  expedido_en: string
  fecha_nacimiento: string
  phone: string
  address: string
  avatar_url: string
  type: string
}

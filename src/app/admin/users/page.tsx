import { getUsers } from '@/actions/users'
import { UserPageComponent } from '@/app/admin/users/page-component'

export default async function UsersPage() {
  const users = await getUsers()

  return <UserPageComponent users={users} />
}

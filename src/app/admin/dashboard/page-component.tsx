'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type MonthlyOrderData = {
  name: string;
  orders: number;
};

type CatrgoryData = {
  name: string;
  products: number;
};

type LatestUser = {
  id: string;
  email: string;
  date: string | null;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PageComponent = ({
  monthlyOrders,
  categoryData,
  latestUsers,
}: {
  monthlyOrders: MonthlyOrderData[];
  categoryData: CatrgoryData[];
  latestUsers: LatestUser[];
}) => {
  return (
    <div className='flex-1 p-8 overflow-auto'>
      <h1 className='text-3xl font-bold mb-6'>Descripción general del panel de control</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos a lo largo del tiempo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={monthlyOrders}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='orders' name='Pedidos' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Products Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de productos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey='products'
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  fill='#8884d8'
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category To products Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Productos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='products' name='Productos' fill='#82ca9d' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Latest Users */}
        <Card>
          <CardHeader>
            <CardTitle>Últimos usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Correo electrónico</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.date
                        ? new Date(user.date).toLocaleString('es-ES', {
                            dateStyle: 'long',
                            timeStyle: 'short',
                          })
                        : 'Sin fecha'}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageComponent;

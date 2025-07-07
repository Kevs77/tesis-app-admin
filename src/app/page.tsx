'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Star,
  Smartphone,
  Zap,
  ShoppingCart,
  Gift,
} from 'lucide-react';
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
}



const MotionWrapper = ({ children, delay = 0 }: MotionWrapperProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const features = [
  {
    icon: Smartphone,
    title: 'Interfaz fácil de usar',
    description: 'Diseño intuitivo para una navegación y compras sin esfuerzo.',
  },
  {
    icon: Zap,
    title: 'Búsqueda a gran velocidad',
    description:
      'Encuentra proveedores en segundos con nuestro motor de búsqueda.',
  },
  {
    icon: Gift,
    title: 'Ofertas exclusivas',
    description: 'Accede a descuentos y ofertas especiales solo en la aplicación.',
  },
];

const testimonials = [
  {
    name: 'David Quiroz',
    comment:
      "TesisApp ha revolucionado la forma en que compro. ¡Es tan conveniente!",
  },
  {
    name: 'Miranda Castillo',
    comment:
      "Las ofertas exclusivas de esta aplicación son inmejorables. ¡He ahorrado tanto!",
  },
];

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ rotateX: 0, rotateY: 0 });

  const router = useRouter()

  const handleClick = () => {
    router.push('/auth')
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    setRotate({ rotateX, rotateY });
  };

  return (
    <div className='min-h-screen'>
      <header className='container mx-auto px-4 py-6 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>TesisApp</h1>
      </header>

      <main className='container mx-auto px-4 py-12'>
        <section className='mb-24'>
          <div className='flex flex-col justify-between md:flex-row items-center'>
            <div className='md:w-1/2 mb-8 md:mb-0 ml-8'>
              <MotionWrapper>
                <h2 className='text-4xl md:text-6xl font-bold mb-4'>
                Descubre beneficios 
                </h2>
              </MotionWrapper>
              <MotionWrapper delay={0.2}>
                <p className='text-xl  mb-6'>
                Solicite directamente desde su bolsillo con nuestra
                Aplicación móvil innovadora.
                </p>
              </MotionWrapper>
              <MotionWrapper delay={0.4}>
                <Button size='lg' className='bg-[#1BC464] hover:bg-[#1bc464d7]'>
                  Descargar ahora <ChevronRight className='ml-2 h-4 w-4' />
                </Button>
              </MotionWrapper>
            </div>

            <div className='w-1/3'>
              <motion.div
                className='relative'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Image
                  width={1331}
                  height={888}
                  src='/app-pics.png'
                  alt='GadgetApp Screenshot'
                  className='rounded-3xl object-cover shadow-2xl mx-auto h-[500px] w-[250px]'
                />
                <Badge className='absolute top-4 right-4 bg-[#1bc464] text-white'>
                  Nueva versión
                </Badge>
              </motion.div>
            </div>
          </div>
        </section>

        <section className='mb-24'>
          <h3 className='text-3xl font-bold mb-8 text-center'>Caracteristicas de la aplicación</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <MotionWrapper key={index} delay={index * 0.1}>
                <Card>
                  <CardContent className='p-6 flex flex-col items-center text-center'>
                    <feature.icon className='h-12 w-12  mb-4' />
                    <h4 className='text-xl font-semibold mb-2'>
                      {feature.title}
                    </h4>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </MotionWrapper>
            ))}
          </div>
        </section>

        <section className='mb-24'>
          <Card className='bg-[#1BC464] text-white'>
            <CardContent className='p-8 text-center'>
              <h3 className='text-3xl font-bold mb-4'>
              Descarga TesisApp hoy mismo
              </h3>
              <p className='text-xl mb-6'>
              Experimenta el futuro de las compras al alcance de tu mano.
              </p>
              <div className='flex flex-wrap justify-center gap-4 md:gap-0 md:flex-nowrap md:space-x-4'>
                <Button size='lg' className='bg-white hover:bg-indigo-100'>
                  <Image
                    src='/apple.jpeg'
                    alt='App Store'
                    className='mr-2 h-6 w-6'
                    height={24}
                    width={24}
                  />
                  App Store
                </Button>
                
              </div>
            </CardContent>
          </Card>
        </section>

        

        <section className='text-center'>
          <h3 className='text-3xl font-bold mb-4'>
          ¿Listo para realizar tus pedidos?
          </h3>
          
          <Button
            size='lg'
            onClick={handleClick}
            className='bg-[#1BC464] hover:bg-[#1bc464d7]'
          >
            INICIAR SESIÓN <ChevronRight className='ml-6 h-6 w-6' />
          </Button>

        </section>
      </main>

      <footer className='bg-[#1BC464] text-white'>
        <Link
          href={``}
          target='_blank'
          className='container mx-auto px-4 text-center'
        >
          <p>Creado por: Jhonathan Mamani</p>
        </Link>
      </footer>
    </div>
  );
}

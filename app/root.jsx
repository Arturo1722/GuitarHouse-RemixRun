import {useState, useEffect} from 'react';
import { 
    Meta, 
    Links, 
    Outlet, 
    Scripts, 
    LiveReload,
    useCatch,
    Link } from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'



export function meta() {
    return(
        {
            charset: 'utf-8',
            title: 'Guitarla - Remix',
            viewport: "width=device-width,initial-scale-1"
        }
    )
}

//agregar las hojas de estilo
export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        },
        {
            rel:'stylesheet',
            href:'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel:'preconnect',
            href:'https://fonts.gstatic.com',
            crossOrigin: "true"
        },
        {
            rel:'stylesheet',
            href:'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        
    ]
}

export default function App(){

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS)

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    const agregarCarrito = guitarra => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            // Iterar sobre el arreglo, e identificar el elemento duplicado
            const carritoActualizado = carrito.map( guitarraState => {
                if(guitarraState.id === guitarra.id) {
                    //reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState
            })
            // Añadimos al carrito
            setCarrito(carritoActualizado)
        } else  {
           // registro  nuevo, agregar al carrito
           setCarrito([...carrito, guitarra]) 
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }


    return(
        <Document>
           <Outlet 
            context={{
                agregarCarrito,
                carrito,
                actualizarCantidad,
                eliminarGuitarra
            }}
           /> 
        </Document>
    )
}

function Document({children}) {
    return(
        <html>
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header/>
                {children}
                <Footer/>
                <Scripts />
                <LiveReload/>
            </body>
        </html>
    )
}

// Manejo de errores  Al definir estos dos componenetes podemos mandar una respuesta de error en caso de presentarse
export function CatchBoundary() {
    const error = useCatch()
    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link to="/" className='error-enlace'>Tal vez quieras volver a la página principal </Link>
        </Document>
    )
}

export function ErrorBoundary({ error }) {
    return(
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link to="/" className='error-enlace'>Tal vez quieras volver a la página principal</Link>
        </Document>
    )
}
import imagen from '../../public/img/nosotros.jpg';
import styles from '~/styles/nosotros.css';

export function meta() {
  return {
    title: 'GuitarLA - Sobre Nosotros',
    description: 'Venta de guitarras, blog de música'
  }

}

export function links() {
  return [
    {
      rel:'stylesheet',
      href: styles
    },
    {
      rel:'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

function Nosotros() {
  return (
      <main className="contenedor nosotros">
        <h2 className="heading">Nosotros</h2>

        <div className="contenido">
            <img src={imagen} alt="imagen sobre nosotros"/>

            <div>
                <p>Phasellus id neque non felis porttitor porta. Mauris sed tortor orci. Nullam eget pretium quam, non facilisis nunc.
                  Nam ornare fermentum magna, vitae interdum nisl auctor vel. Mauris pretium massa sed odio sollicitudin,
                  id ultricies elit aliquam.
                </p>
                <p>Phasellus id neque non felis porttitor porta. Mauris sed tortor orci. Nullam eget pretium quam, non facilisis nunc.
                  Nam ornare fermentum magna, vitae interdum nisl auctor vel. Mauris pretium massa sed odio sollicitudin,
                  id ultricies elit aliquam.
                </p>
            </div>
        </div>
      </main>
  )
}

export default Nosotros

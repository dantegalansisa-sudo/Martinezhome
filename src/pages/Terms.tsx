import { Link } from 'react-router-dom';
import LegalPage, { type LegalSection } from '../components/LegalPage';
import { CONTACT } from '../data/site';
import { useSeo } from '../useTitle';

const SECTIONS: LegalSection[] = [
  {
    id: 'aceptacion',
    title: 'Aceptación de los términos',
    body: (
      <p>
        Estos términos regulan el uso del sitio web de <strong>Martínez Home Inmobiliaria</strong> (“Martínez Home”, “nosotros”). Al navegar por el sitio,
        enviar un formulario o agendar una visita, aceptas estos términos y nuestra <Link to="/privacidad">Política de privacidad</Link>. Si no estás de
        acuerdo, te pedimos no utilizar el sitio.
      </p>
    ),
  },
  {
    id: 'servicios',
    title: 'Nuestros servicios',
    body: (
      <>
        <p>
          Martínez Home es una inmobiliaria con sede en Santo Domingo Este que ofrece servicios de <strong>intermediación y asesoría</strong> en la compra,
          venta, alquiler e inversión de bienes inmuebles en República Dominicana.
        </p>
        <p>
          Salvo que se indique expresamente lo contrario, actuamos como intermediarios: <strong>no somos propietarios ni desarrolladores</strong> de las
          propiedades publicadas. Las condiciones finales de cada operación las definen el propietario o el desarrollador y se formalizan por contrato.
        </p>
      </>
    ),
  },
  {
    id: 'informacion',
    title: 'Información de las propiedades',
    body: (
      <>
        <p>Publicamos la información de cada propiedad de buena fe y según los datos que nos suministran los propietarios y desarrolladores. Ten en cuenta que:</p>
        <ul>
          <li><strong>Los precios, la disponibilidad y las condiciones pueden cambiar sin previo aviso</strong>, y una unidad puede venderse o reservarse antes de que actualicemos el sitio.</li>
          <li>Los <strong>metrajes son aproximados</strong> y pueden variar respecto a los planos definitivos o la mensura catastral.</li>
          <li>Algunas imágenes son <strong>renders o ilustraciones de referencia</strong>; los acabados, el mobiliario y la decoración pueden no estar incluidos. Las marcamos como “Imágenes de referencia”.</li>
          <li>Las <strong>ubicaciones en el mapa son aproximadas</strong>; la dirección exacta se comparte al coordinar la visita.</li>
          <li>Las propiedades sin precio publicado muestran “Precio a consultar”.</li>
        </ul>
        <p>La información del sitio <strong>no constituye una oferta vinculante</strong>. Solo son válidas las condiciones que consten por escrito en el contrato correspondiente.</p>
      </>
    ),
  },
  {
    id: 'monedas',
    title: 'Precios, monedas y conversiones',
    body: (
      <p>
        Cada propiedad se publica en la moneda indicada por su propietario o desarrollador (dólares estadounidenses o pesos dominicanos). Las conversiones que
        muestra el selector de moneda usan una <strong>tasa referencial</strong> y aparecen marcadas con “≈”; son solo orientativas. Para cualquier pago se
        aplicará la tasa acordada por escrito o, en su defecto, la vigente del Banco Central de la República Dominicana.
      </p>
    ),
  },
  {
    id: 'proyectos',
    title: 'Proyectos en planos y planes de pago',
    body: (
      <ul>
        <li>Las <strong>fechas de entrega</strong> son estimadas y dependen del desarrollador del proyecto.</li>
        <li>Los <strong>planes de pago</strong> publicados (reserva, separación, inicial en cuotas y pago contra entrega) son informativos; los montos y plazos definitivos constan en el contrato de promesa de compraventa.</li>
        <li>La aprobación de un <strong>financiamiento bancario</strong> depende exclusivamente de la entidad financiera y de tu perfil crediticio. Podemos acompañarte en el proceso, pero no garantizamos su aprobación.</li>
      </ul>
    ),
  },
  {
    id: 'pagos',
    title: 'Pagos, reservas y prevención de fraudes',
    body: (
      <>
        <p>
          Ningún pago se realiza a través de este sitio web. Las reservas, separaciones y demás pagos se efectúan únicamente según las{' '}
          <strong>instrucciones escritas</strong> del contrato o del desarrollador, y siempre contra un recibo.
        </p>
        <p>
          <strong>Martínez Home nunca te pedirá transferir dinero a cuentas personales no verificadas</strong> por mensajes de redes sociales. Si recibes una
          solicitud así a nombre nuestro, verifícala antes llamando al <strong>{CONTACT.phone}</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'visitas',
    title: 'Visitas y citas',
    body: (
      <p>
        Las citas solicitadas desde el sitio quedan sujetas a confirmación de un asesor según la disponibilidad de la propiedad y del propietario. Si no
        puedes asistir, te agradecemos avisarnos con antelación para reprogramar.
      </p>
    ),
  },
  {
    id: 'honorarios',
    title: 'Honorarios',
    body: (
      <p>
        El uso del sitio es gratuito. Los honorarios o comisiones por nuestros servicios de intermediación se acuerdan por escrito con el propietario o el
        cliente antes de iniciar la gestión, conforme a las prácticas del mercado inmobiliario dominicano.
      </p>
    ),
  },
  {
    id: 'diligencia',
    title: 'Recomendaciones antes de comprar',
    body: (
      <>
        <p>Toda operación inmobiliaria debe hacerse con la debida diligencia. Te recomendamos, y te acompañamos en el proceso de:</p>
        <ul>
          <li>Verificar el <strong>Certificado de Título</strong> y el estado jurídico del inmueble ante la Jurisdicción Inmobiliaria (Ley No. 108-05 de Registro Inmobiliario).</li>
          <li>Confirmar que la propiedad esté libre de cargas, gravámenes o litigios, y al día en sus impuestos.</li>
          <li>Revisar los permisos del proyecto en el caso de propiedades en planos.</li>
          <li>Contar con la asesoría de un abogado de tu confianza para la revisión y firma de los contratos.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'lavado',
    title: 'Identificación del cliente',
    body: (
      <p>
        Como intermediarios inmobiliarios estamos sujetos a la <strong>Ley No. 155-17 contra el Lavado de Activos y el Financiamiento del Terrorismo</strong>.
        Por ello, al avanzar en una operación podremos solicitarte documentos de identidad y de origen de los fondos. Nos reservamos el derecho de no
        continuar una gestión cuando no sea posible cumplir con estas verificaciones.
      </p>
    ),
  },
  {
    id: 'uso',
    title: 'Uso adecuado del sitio',
    body: (
      <ul>
        <li>Usa el sitio solo con fines lícitos y proporciona información veraz en los formularios.</li>
        <li>No está permitido copiar, extraer de forma masiva o republicar el contenido, las fotografías o los datos de las propiedades sin autorización.</li>
        <li>No intentes afectar el funcionamiento o la seguridad del sitio.</li>
      </ul>
    ),
  },
  {
    id: 'propiedad-intelectual',
    title: 'Propiedad intelectual',
    body: (
      <p>
        La marca Martínez Home, el logotipo, los textos, el diseño del sitio y los videos son propiedad de Martínez Home o se usan con autorización de sus
        titulares. Las fotografías e imágenes de los proyectos pueden pertenecer a sus respectivos desarrolladores.
      </p>
    ),
  },
  {
    id: 'enlaces',
    title: 'Enlaces a terceros',
    body: (
      <p>
        El sitio contiene enlaces a servicios de terceros, como WhatsApp, Instagram, Threads y OpenStreetMap. No somos responsables de su contenido ni de
        sus políticas, que te recomendamos revisar.
      </p>
    ),
  },
  {
    id: 'responsabilidad',
    title: 'Limitación de responsabilidad',
    body: (
      <p>
        Trabajamos para que la información del sitio sea exacta y esté actualizada, pero no garantizamos que esté libre de errores u omisiones. Martínez
        Home no será responsable por decisiones tomadas únicamente con base en la información publicada sin confirmarla con un asesor, ni por
        interrupciones temporales del sitio. Nada de lo anterior limita los derechos que te reconoce la Ley No. 358-05 de Protección de los Derechos del
        Consumidor o Usuario.
      </p>
    ),
  },
  {
    id: 'ley',
    title: 'Ley aplicable y jurisdicción',
    body: (
      <p>
        Estos términos se rigen por las leyes de la República Dominicana. Cualquier controversia se procurará resolver primero de forma amistosa y, de no
        lograrse, se someterá a los tribunales competentes de Santo Domingo.
      </p>
    ),
  },
  {
    id: 'modificaciones',
    title: 'Modificaciones',
    body: <p>Podemos actualizar estos términos en cualquier momento. La versión vigente es la publicada en esta página, con su fecha de última actualización.</p>,
  },
];

export default function Terms() {
  useSeo({
    title: 'Términos y condiciones',
    description: 'Condiciones de uso del sitio de Martínez Home Inmobiliaria: información de propiedades, precios, planes de pago, visitas y servicios de intermediación en República Dominicana.',
  });
  return (
    <LegalPage
      eyebrow="Legal"
      title="Términos y condiciones"
      lead="Las reglas claras hacen relaciones duraderas. Estas son las condiciones de uso de nuestro sitio y de nuestros servicios."
      updated="13 de octubre de 2026"
      sections={SECTIONS}
      other={{ prefix: 'nuestra', label: 'Política de privacidad', to: '/privacidad' }}
    />
  );
}

import LegalPage, { type LegalSection } from '../components/LegalPage';
import { CONTACT } from '../data/site';
import { useSeo } from '../useTitle';
import { getLang, t } from '../i18n';
import { PRIVACY_EN, PRIVACY_EN_META } from './legal-en';

const SECTIONS: LegalSection[] = [
  {
    id: 'responsable',
    title: 'Responsable del tratamiento',
    body: (
      <>
        <p>
          <strong>Martínez Home Inmobiliaria</strong> (en adelante, “Martínez Home”, “nosotros”), con domicilio en {CONTACT.address}, República Dominicana,
          es responsable del tratamiento de los datos personales que nos facilitas a través de este sitio web, de nuestras redes sociales y de nuestros
          canales de contacto.
        </p>
        <p>
          Esta política explica qué datos recopilamos, para qué los usamos y cuáles son tus derechos, de acuerdo con la Constitución de la República
          Dominicana y la <strong>Ley No. 172-13 sobre Protección Integral de los Datos Personales</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'datos',
    title: 'Datos que recopilamos',
    body: (
      <>
        <p>Solo recopilamos los datos que tú decides compartir y los mínimos necesarios para atenderte:</p>
        <ul>
          <li><strong>Formulario de contacto:</strong> nombre, teléfono, correo electrónico (opcional), tipo de operación que te interesa, tipo de propiedad, presupuesto, zona de interés, canal de contacto preferido y mensaje.</li>
          <li><strong>Agendar visita:</strong> nombre, teléfono, fecha, hora y modalidad de la visita, y la propiedad de interés.</li>
          <li><strong>Vende con nosotros:</strong> nombre, teléfono y la información de tu propiedad (tipo, ubicación, precio esperado y detalles).</li>
          <li><strong>Datos técnicos:</strong> nuestro proveedor de alojamiento puede registrar de forma automática datos como la dirección IP, el tipo de navegador y las páginas visitadas, con fines de seguridad y funcionamiento.</li>
        </ul>
        <p>No solicitamos a través del sitio web datos financieros, números de tarjeta, contraseñas ni documentos de identidad.</p>
      </>
    ),
  },
  {
    id: 'finalidad',
    title: 'Para qué usamos tus datos',
    body: (
      <ul>
        <li>Responder tus consultas y enviarte información de propiedades que se ajusten a lo que buscas.</li>
        <li>Coordinar y confirmar visitas presenciales o por videollamada.</li>
        <li>Evaluar, valorar y promocionar la propiedad que deseas vender o alquilar con nosotros.</li>
        <li>Darle seguimiento a tu proceso de compra, venta, alquiler o inversión.</li>
        <li>Cumplir con nuestras obligaciones legales, incluidas las de identificación de clientes que establece la <strong>Ley No. 155-17 contra el Lavado de Activos y el Financiamiento del Terrorismo</strong> para los intermediarios inmobiliarios.</li>
      </ul>
    ),
  },
  {
    id: 'base-legal',
    title: 'Base legal del tratamiento',
    body: (
      <p>
        Tratamos tus datos sobre la base de tu <strong>consentimiento</strong>, que otorgas al enviar un formulario o escribirnos; de la necesidad de
        atender tu solicitud y las gestiones previas a un contrato que tú mismo pides; y del cumplimiento de las <strong>obligaciones legales</strong> que
        aplican a nuestra actividad. Puedes retirar tu consentimiento en cualquier momento.
      </p>
    ),
  },
  {
    id: 'whatsapp',
    title: 'Comunicación por WhatsApp',
    body: (
      <p>
        Al enviar un formulario, el sitio abre WhatsApp con tu mensaje ya redactado para que tú lo envíes. La conversación queda sujeta también a las
        condiciones y la política de privacidad de WhatsApp (Meta Platforms). Si prefieres otro canal, puedes llamarnos o indicarlo en el formulario.
      </p>
    ),
  },
  {
    id: 'compartir',
    title: 'Con quién compartimos tus datos',
    body: (
      <>
        <p><strong>No vendemos ni alquilamos tus datos personales.</strong> Solo los compartimos cuando es necesario para atenderte:</p>
        <ul>
          <li>Con los <strong>asesores de nuestro equipo</strong> que gestionan tu solicitud.</li>
          <li>Con el <strong>propietario o desarrollador</strong> de la propiedad de tu interés, cuando avanzas en una negociación y con tu autorización.</li>
          <li>Con <strong>entidades financieras</strong>, cuando nos pides apoyo para gestionar un financiamiento.</li>
          <li>Con <strong>abogados, notarios y tasadores</strong> que intervienen en el cierre de una operación.</li>
          <li>Con las <strong>autoridades competentes</strong>, cuando la ley lo exija.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'proveedores',
    title: 'Servicios de terceros en el sitio',
    body: (
      <ul>
        <li><strong>Alojamiento web:</strong> el sitio está alojado en Vercel, que procesa datos técnicos de las visitas para entregar el contenido.</li>
        <li><strong>Tipografías:</strong> las fuentes se cargan desde Google Fonts.</li>
        <li><strong>Mapas:</strong> los mapas de ubicación usan OpenStreetMap. Las ubicaciones mostradas son aproximadas.</li>
        <li><strong>Redes sociales:</strong> los enlaces a Instagram, Threads y WhatsApp te llevan a servicios externos con sus propias políticas.</li>
      </ul>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies y almacenamiento en tu dispositivo',
    body: (
      <p>
        No usamos cookies publicitarias ni de rastreo. El sitio guarda en el almacenamiento local de tu navegador tus <strong>propiedades favoritas</strong> y
        la <strong>moneda</strong> en que prefieres ver los precios, para que no los pierdas al volver. Esa información permanece en tu dispositivo, no se
        envía a nuestros servidores y puedes borrarla en cualquier momento desde la configuración de tu navegador.
      </p>
    ),
  },
  {
    id: 'conservacion',
    title: 'Cuánto tiempo conservamos tus datos',
    body: (
      <p>
        Conservamos los datos de las consultas mientras exista una relación activa contigo y hasta 24 meses después del último contacto, salvo que nos
        pidas eliminarlos antes. La documentación de operaciones concretadas se conserva durante los plazos que exija la ley, incluidos los de la normativa
        de prevención de lavado de activos.
      </p>
    ),
  },
  {
    id: 'derechos',
    title: 'Tus derechos',
    body: (
      <>
        <p>Como titular de tus datos puedes ejercer en cualquier momento los derechos que te reconoce la Ley No. 172-13:</p>
        <ul>
          <li><strong>Acceso:</strong> saber qué datos tuyos tenemos y cómo los usamos.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
          <li><strong>Cancelación o supresión:</strong> pedir que eliminemos tus datos cuando ya no sean necesarios.</li>
          <li><strong>Oposición:</strong> oponerte a que usemos tus datos para un fin determinado, como el envío de ofertas.</li>
        </ul>
        <p>
          Para ejercerlos, escríbenos por WhatsApp al <strong>{CONTACT.phone}</strong>, llámanos o visítanos en nuestra oficina. Te responderemos en un plazo
          razonable y conforme a la ley, y podremos pedirte que confirmes tu identidad para proteger tu información.
        </p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: 'Seguridad',
    body: (
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra el acceso no autorizado, la pérdida o la alteración. El sitio
        funciona con conexión cifrada (HTTPS). Ningún sistema es completamente infalible, pero revisamos y mejoramos nuestras prácticas de forma continua.
      </p>
    ),
  },
  {
    id: 'menores',
    title: 'Menores de edad',
    body: <p>Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos de forma consciente datos de menores de edad.</p>,
  },
  {
    id: 'cambios',
    title: 'Cambios a esta política',
    body: (
      <p>
        Podemos actualizar esta política para reflejar cambios en nuestros servicios o en la ley. Publicaremos la versión vigente en esta página, con su
        fecha de última actualización.
      </p>
    ),
  },
];

export default function Privacy() {
  const en = getLang() === 'en';
  useSeo({
    title: t('Política de privacidad'),
    description: t('Cómo Martínez Home Inmobiliaria recopila, usa y protege tus datos personales conforme a la Ley 172-13 de República Dominicana.'),
  });
  return en ? (
    <LegalPage {...PRIVACY_EN_META} sections={PRIVACY_EN} other={{ prefix: 'our', label: 'Terms and Conditions', to: '/terminos' }} />
  ) : (
    <LegalPage
      eyebrow="Legal"
      title="Política de privacidad"
      lead="Tu confianza es la base de nuestro trabajo. Aquí te explicamos, en lenguaje claro, cómo cuidamos tus datos personales."
      updated="13 de octubre de 2026"
      sections={SECTIONS}
      other={{ prefix: 'nuestros', label: 'Términos y condiciones', to: '/terminos' }}
    />
  );
}

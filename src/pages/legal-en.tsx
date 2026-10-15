import { Link } from 'react-router-dom';
import type { LegalSection } from '../components/LegalPage';
import { CONTACT } from '../data/site';

export const PRIVACY_EN_META = {
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  lead: 'Your trust is the foundation of our work. Here we explain, in plain language, how we protect your personal data.',
  updated: 'October 13, 2026',
};

export const PRIVACY_EN: LegalSection[] = [
  {
    id: 'responsable',
    title: 'Data controller',
    body: (
      <>
        <p>
          <strong>Martínez Home Inmobiliaria</strong> (hereinafter, “Martínez Home”, “we”, “us”), with its address at {CONTACT.address}, Dominican Republic,
          is the controller of the personal data you provide to us through this website, our social media accounts and our contact channels.
        </p>
        <p>
          This policy explains what data we collect, what we use it for and what your rights are, in accordance with the Constitution of the Dominican
          Republic and <strong>Law No. 172-13 on the Comprehensive Protection of Personal Data (Ley No. 172-13 sobre Protección Integral de los Datos Personales)</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'datos',
    title: 'Data we collect',
    body: (
      <>
        <p>We only collect the data you choose to share and the minimum necessary to assist you:</p>
        <ul>
          <li><strong>Contact form:</strong> name, phone number, email address (optional), type of transaction you are interested in, property type, budget, area of interest, preferred contact channel and message.</li>
          <li><strong>Schedule a viewing:</strong> name, phone number, date, time and format of the viewing, and the property of interest.</li>
          <li><strong>Sell with us:</strong> name, phone number and information about your property (type, location, expected price and details).</li>
          <li><strong>Technical data:</strong> our hosting provider may automatically record data such as your IP address, browser type and the pages visited, for security and operational purposes.</li>
        </ul>
        <p>We do not request financial data, card numbers, passwords or identity documents through the website.</p>
      </>
    ),
  },
  {
    id: 'finalidad',
    title: 'How we use your data',
    body: (
      <ul>
        <li>To answer your inquiries and send you information about properties that match what you are looking for.</li>
        <li>To arrange and confirm in-person or video-call viewings.</li>
        <li>To evaluate, appraise and market the property you wish to sell or rent through us.</li>
        <li>To follow up on your purchase, sale, rental or investment process.</li>
        <li>To comply with our legal obligations, including the customer identification requirements that <strong>Law No. 155-17 against Money Laundering and Terrorist Financing (Ley No. 155-17 contra el Lavado de Activos y el Financiamiento del Terrorismo)</strong> establishes for real estate intermediaries.</li>
      </ul>
    ),
  },
  {
    id: 'base-legal',
    title: 'Legal basis for processing',
    body: (
      <p>
        We process your data on the basis of your <strong>consent</strong>, which you give when you submit a form or write to us; the need to handle your
        request and the pre-contractual steps you yourself ask for; and compliance with the <strong>legal obligations</strong> that apply to our
        business. You may withdraw your consent at any time.
      </p>
    ),
  },
  {
    id: 'whatsapp',
    title: 'Communication via WhatsApp',
    body: (
      <p>
        When you submit a form, the site opens WhatsApp with your message already drafted so that you can send it yourself. The conversation is also
        subject to the terms and privacy policy of WhatsApp (Meta Platforms). If you prefer another channel, you can call us or indicate it in the form.
      </p>
    ),
  },
  {
    id: 'compartir',
    title: 'Who we share your data with',
    body: (
      <>
        <p><strong>We do not sell or rent your personal data.</strong> We only share it when necessary to assist you:</p>
        <ul>
          <li>With the <strong>advisors on our team</strong> who handle your request.</li>
          <li>With the <strong>owner or developer</strong> of the property you are interested in, when you move forward with a negotiation and with your authorization.</li>
          <li>With <strong>financial institutions</strong>, when you ask us for help arranging financing.</li>
          <li>With <strong>lawyers, notaries and appraisers</strong> involved in closing a transaction.</li>
          <li>With the <strong>competent authorities</strong>, when required by law.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'proveedores',
    title: 'Third-party services on the site',
    body: (
      <ul>
        <li><strong>Web hosting:</strong> the site is hosted on Vercel, which processes technical data about visits in order to deliver the content.</li>
        <li><strong>Typography:</strong> fonts are loaded from Google Fonts.</li>
        <li><strong>Maps:</strong> location maps use OpenStreetMap. The locations shown are approximate.</li>
        <li><strong>Social media:</strong> links to Instagram, Threads and WhatsApp take you to external services with their own policies.</li>
      </ul>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and storage on your device',
    body: (
      <p>
        We do not use advertising or tracking cookies. The site stores your <strong>favorite properties</strong> and the <strong>currency</strong> in which you
        prefer to view prices in your browser’s local storage, so that you do not lose them when you return. This information stays on your device, is not
        sent to our servers, and you can delete it at any time from your browser settings.
      </p>
    ),
  },
  {
    id: 'conservacion',
    title: 'How long we keep your data',
    body: (
      <p>
        We keep inquiry data for as long as there is an active relationship with you and for up to 24 months after the last contact, unless you ask us to
        delete it sooner. Documentation of completed transactions is kept for the periods required by law, including those under anti-money laundering
        regulations.
      </p>
    ),
  },
  {
    id: 'derechos',
    title: 'Your rights',
    body: (
      <>
        <p>As the data subject, you may exercise at any time the rights granted to you by Law No. 172-13:</p>
        <ul>
          <li><strong>Access:</strong> to know what data of yours we hold and how we use it.</li>
          <li><strong>Rectification:</strong> to correct inaccurate or incomplete data.</li>
          <li><strong>Cancellation or erasure:</strong> to ask us to delete your data when it is no longer necessary.</li>
          <li><strong>Objection:</strong> to object to our use of your data for a specific purpose, such as sending offers.</li>
        </ul>
        <p>
          To exercise them, write to us on WhatsApp at <strong>{CONTACT.phone}</strong>, call us or visit us at our office. We will respond within a reasonable
          time and in accordance with the law, and we may ask you to confirm your identity in order to protect your information.
        </p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: 'Security',
    body: (
      <p>
        We apply reasonable technical and organizational measures to protect your data against unauthorized access, loss or alteration. The site runs
        over an encrypted connection (HTTPS). No system is completely infallible, but we continuously review and improve our practices.
      </p>
    ),
  },
  {
    id: 'menores',
    title: 'Minors',
    body: <p>Our services are intended for persons over 18 years of age. We do not knowingly collect data from minors.</p>,
  },
  {
    id: 'cambios',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy to reflect changes in our services or in the law. We will publish the current version on this page, together with its
        last updated date.
      </p>
    ),
  },
];

export const TERMS_EN_META = {
  eyebrow: 'Legal',
  title: 'Terms and Conditions',
  lead: 'Clear rules make for lasting relationships. These are the terms of use for our website and our services.',
  updated: 'October 13, 2026',
};

export const TERMS_EN: LegalSection[] = [
  {
    id: 'aceptacion',
    title: 'Acceptance of the terms',
    body: (
      <p>
        These terms govern the use of the website of <strong>Martínez Home Inmobiliaria</strong> (“Martínez Home”, “we”, “us”). By browsing the site,
        submitting a form or scheduling a viewing, you accept these terms and our <Link to="/privacidad">Privacy Policy</Link>. If you do not agree, we ask
        that you do not use the site.
      </p>
    ),
  },
  {
    id: 'servicios',
    title: 'Our services',
    body: (
      <>
        <p>
          Martínez Home is a real estate agency based in Santo Domingo Este that provides <strong>brokerage and advisory</strong> services for the purchase,
          sale, rental and investment of real estate in the Dominican Republic.
        </p>
        <p>
          Unless expressly stated otherwise, we act as intermediaries: <strong>we are not the owners or developers</strong> of the properties listed. The
          final terms of each transaction are set by the owner or the developer and are formalized by contract.
        </p>
      </>
    ),
  },
  {
    id: 'informacion',
    title: 'Property information',
    body: (
      <>
        <p>We publish the information on each property in good faith and based on the data provided to us by owners and developers. Please note that:</p>
        <ul>
          <li><strong>Prices, availability and conditions may change without prior notice</strong>, and a unit may be sold or reserved before we update the site.</li>
          <li><strong>Floor areas are approximate</strong> and may differ from the final plans or the cadastral survey.</li>
          <li>Some images are <strong>renderings or reference illustrations</strong>; finishes, furniture and decoration may not be included. We label them as “Reference images”.</li>
          <li><strong>Map locations are approximate</strong>; the exact address is shared when the viewing is arranged.</li>
          <li>Properties without a published price show “Price on request”.</li>
        </ul>
        <p>The information on the site <strong>does not constitute a binding offer</strong>. Only the conditions set out in writing in the corresponding contract are valid.</p>
      </>
    ),
  },
  {
    id: 'monedas',
    title: 'Prices, currencies and conversions',
    body: (
      <p>
        Each property is listed in the currency indicated by its owner or developer (US dollars or Dominican pesos). The conversions shown by the currency
        selector use a <strong>reference rate</strong> and are marked with “≈”; they are for guidance only. For any payment, the rate agreed in writing will
        apply or, failing that, the rate in effect published by the Banco Central de la República Dominicana (Central Bank).
      </p>
    ),
  },
  {
    id: 'proyectos',
    title: 'Pre-construction projects and payment plans',
    body: (
      <ul>
        <li><strong>Delivery dates</strong> are estimates and depend on the project developer.</li>
        <li>The published <strong>payment plans</strong> (reservation, holding deposit, down payment in installments and payment upon delivery) are for information only; the final amounts and terms are set out in the promise of sale agreement.</li>
        <li>Approval of <strong>bank financing</strong> depends solely on the financial institution and your credit profile. We can assist you through the process, but we do not guarantee approval.</li>
      </ul>
    ),
  },
  {
    id: 'pagos',
    title: 'Payments, reservations and fraud prevention',
    body: (
      <>
        <p>
          No payments are made through this website. Reservations, holding deposits and all other payments are made only in accordance with the{' '}
          <strong>written instructions</strong> in the contract or from the developer, and always against a receipt.
        </p>
        <p>
          <strong>Martínez Home will never ask you to transfer money to unverified personal accounts</strong> through social media messages. If you receive
          such a request in our name, verify it first by calling <strong>{CONTACT.phone}</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'visitas',
    title: 'Viewings and appointments',
    body: (
      <p>
        Appointments requested through the site are subject to confirmation by an advisor, depending on the availability of the property and the owner. If
        you cannot attend, we would appreciate advance notice so we can reschedule.
      </p>
    ),
  },
  {
    id: 'honorarios',
    title: 'Fees',
    body: (
      <p>
        Use of the site is free of charge. Fees or commissions for our brokerage services are agreed in writing with the owner or the client before work
        begins, in accordance with the practices of the Dominican real estate market.
      </p>
    ),
  },
  {
    id: 'diligencia',
    title: 'Recommendations before buying',
    body: (
      <>
        <p>Every real estate transaction should be carried out with due diligence. We recommend that you, and we will assist you in the process to:</p>
        <ul>
          <li>Verify the <strong>Certificate of Title (Certificado de Título)</strong> and the legal status of the property before the Real Estate Jurisdiction (Jurisdicción Inmobiliaria) (Law No. 108-05 on Real Estate Registration, Ley No. 108-05 de Registro Inmobiliario).</li>
          <li>Confirm that the property is free of encumbrances, liens or litigation, and that its taxes are up to date.</li>
          <li>Review the project permits in the case of pre-construction properties.</li>
          <li>Obtain advice from a lawyer you trust for the review and signing of contracts.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'lavado',
    title: 'Customer identification',
    body: (
      <p>
        As real estate intermediaries, we are subject to <strong>Law No. 155-17 against Money Laundering and Terrorist Financing (Ley No. 155-17 contra el Lavado de Activos y el Financiamiento del Terrorismo)</strong>.
        Accordingly, as a transaction progresses we may ask you for identity documents and documentation on the source of funds. We reserve the right not
        to continue with a transaction when it is not possible to complete these verifications.
      </p>
    ),
  },
  {
    id: 'uso',
    title: 'Appropriate use of the site',
    body: (
      <ul>
        <li>Use the site only for lawful purposes and provide truthful information in the forms.</li>
        <li>Copying, bulk extraction or republication of the content, photographs or property data without authorization is not permitted.</li>
        <li>Do not attempt to interfere with the operation or security of the site.</li>
      </ul>
    ),
  },
  {
    id: 'propiedad-intelectual',
    title: 'Intellectual property',
    body: (
      <p>
        The Martínez Home brand, logo, texts, site design and videos are the property of Martínez Home or are used with the authorization of their
        owners. Photographs and images of the projects may belong to their respective developers.
      </p>
    ),
  },
  {
    id: 'enlaces',
    title: 'Third-party links',
    body: (
      <p>
        The site contains links to third-party services, such as WhatsApp, Instagram, Threads and OpenStreetMap. We are not responsible for their content
        or their policies, which we recommend you review.
      </p>
    ),
  },
  {
    id: 'responsabilidad',
    title: 'Limitation of liability',
    body: (
      <p>
        We work to keep the information on the site accurate and up to date, but we do not guarantee that it is free of errors or omissions. Martínez Home
        shall not be liable for decisions made solely on the basis of the published information without confirming it with an advisor, nor for temporary
        interruptions of the site. Nothing in the foregoing limits the rights granted to you by Law No. 358-05 on Consumer Protection (Ley No. 358-05 de
        Protección de los Derechos del Consumidor o Usuario).
      </p>
    ),
  },
  {
    id: 'ley',
    title: 'Governing law and jurisdiction',
    body: (
      <p>
        These terms are governed by the laws of the Dominican Republic. Any dispute shall first be sought to be resolved amicably and, failing that, shall be
        submitted to the competent courts of Santo Domingo.
      </p>
    ),
  },
  {
    id: 'modificaciones',
    title: 'Amendments',
    body: <p>We may update these terms at any time. The current version is the one published on this page, together with its last updated date.</p>,
  },
];

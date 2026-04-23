import Link from 'next/link';
import type { Metadata } from 'next';

const CONTENT = {
  he: {
    dir: 'rtl' as const,
    back: '← חזרה לדף הבית',
    badge: 'עדכון אחרון',
    title: 'תנאי שימוש',
    subtitle: 'Clean+ — שירותי ניקיון מקצועיים',
    privacyLink: 'מדיניות הפרטיות',
    sections: [
      {
        title: '1. קבלת התנאים',
        body: `השימוש באתר cleanplus.co.il מהווה הסכמה מלאה לתנאי שימוש אלה. אם אינכם מסכימים, הימנעו משימוש באתר. תנאי שימוש אלה חלים בנוסף למדיניות הפרטיות של החברה.`,
      },
      {
        title: '2. הגדרות',
        defs: [
          ['"החברה"', 'קמינוס הפקות בע״מ, הפועלת תחת המותג המסחרי Clean+'],
          ['"המשתמש"', 'כל אדם או גוף המשתמש באתר'],
          ['"השירות"', 'שירותי ניקיון מקצועיים המסופקים על ידי החברה'],
          ['"הפנייה"', 'טופס יצירת קשר המועבר דרך האתר'],
        ],
      },
      {
        title: '3. מטרת האתר',
        body: 'האתר משמש כאמצעי לקבלת מידע על שירותי הניקיון ולהעברת פנייה לקבלת הצעת מחיר. לא מתבצעות עסקאות כספיות באתר.',
      },
      {
        title: '4. הגשת פנייה',
        intro: 'בעת מילוי טופס הפנייה, המשתמש מאשר כי:',
        bullets: [
          'הפרטים שמסר נכונים ומדויקים',
          'הינו מעל גיל 18, או פועל בהסכמת הורה/אפוטרופוס',
          'הוא מסכים לקבל חזרה שיחת טלפון ו/או הודעת WhatsApp מנציג החברה',
          'הוא מסכים למדיניות הפרטיות של האתר',
        ],
      },
      {
        title: '5. תנאי השירות',
        subs: [
          ['5.1 הצעות מחיר', 'הצעת מחיר שתתקבל מהחברה תהא בתוקף למשך 30 יום מיום הנפקתה, אלא אם צוין אחרת.'],
          ['5.2 ביטול', 'ניתן לבטל שירות ללא עלות עד 24 שעות לפני מועד הביצוע. ביטול בפחות מ-24 שעות עשוי לחייב בדמי ביטול בגובה 30% ממחיר השירות.'],
          ['5.3 ערבות שביעות רצון', 'החברה מתחייבת לחזור ולתקן ליקויים שדווחו תוך 48 שעות מסיום השירות, ללא תשלום נוסף. במקרה של אי-שביעות רצון מוצדקת, החברה תשיב את התשלום במלואו.'],
          ['5.4 ביטוח', 'החברה מחזיקה ביטוח אחריות מקצועית וצד שלישי. נזקי רכוש שנגרמו על ידי הצוות יש לדווח תוך 24 שעות.'],
        ],
      },
      {
        title: '6. הגבלת אחריות',
        intro: 'החברה לא תהא אחראית לנזקים שנגרמו עקב:',
        bullets: [
          'מידע שגוי שמסר המשתמש בטופס הפנייה',
          'הפרעות בזמינות האתר עקב תחזוקה או כוח עליון',
          'שימוש לרעה בנתוני קשר שנמסרו',
          'נזקים עקב חפצי ערך שלא הוצהרו מראש',
        ],
      },
      {
        title: '7. קניין רוחני',
        body: 'כל תוכן האתר — לרבות טקסטים, עיצוב, לוגו, תמונות וקוד — מוגן בזכויות יוצרים ושייך לחברה. אין להעתיק, לפרסם מחדש או להשתמש בתוכן ללא אישור מפורש בכתב.',
      },
      {
        title: '8. שינויים בתנאים',
        body: 'החברה רשאית לשנות תנאים אלה בכל עת. שינויים מהותיים יפורסמו באתר. המשך השימוש לאחר פרסום שינויים מהווה הסכמה לנוסח המעודכן.',
      },
      {
        title: '9. דין וסמכות שיפוט',
        body: 'תנאי שימוש אלה כפופים לדיני מדינת ישראל. כל מחלוקת תובא בפני בתי המשפט המוסמכים במחוז תל אביב-יפו.',
      },
    ],
    contactTitle: 'יצירת קשר',
    contactBody: 'לשאלות בנוגע לתנאי השימוש:',
  },
  en: {
    dir: 'ltr' as const,
    back: '← Back to Home',
    badge: 'Last updated',
    title: 'Terms of Use',
    subtitle: 'Clean+ — Professional Cleaning Services',
    privacyLink: 'Privacy Policy',
    sections: [
      {
        title: '1. Acceptance of Terms',
        body: `Use of the website cleanplus.co.il constitutes full acceptance of these Terms of Use. If you do not agree, please refrain from using the site. These terms apply in addition to the Company's Privacy Policy.`,
      },
      {
        title: '2. Definitions',
        defs: [
          ['"The Company"', 'Caminos Productions Ltd, operating under the commercial brand Clean+'],
          ['"The User"', 'Any person or entity using the website'],
          ['"The Service"', 'Professional cleaning services provided by the Company'],
          ['"The Enquiry"', 'The contact form submitted through the website'],
        ],
      },
      {
        title: '3. Purpose of the Website',
        body: 'The website serves as a means to obtain information about cleaning services and submit a quote request. No financial transactions are conducted on the site.',
      },
      {
        title: '4. Submitting an Enquiry',
        intro: 'By submitting the contact form, the user confirms that:',
        bullets: [
          'The details provided are accurate and correct',
          'They are over 18, or acting with parental/guardian consent',
          'They consent to receiving a callback and/or WhatsApp message from a company representative',
          'They agree to the site\'s Privacy Policy',
        ],
      },
      {
        title: '5. Service Terms',
        subs: [
          ['5.1 Quotes', 'A quote provided by the Company is valid for 30 days from the date of issue, unless stated otherwise.'],
          ['5.2 Cancellation', 'Services may be cancelled free of charge up to 24 hours before the scheduled time. Cancellation with less than 24 hours notice may incur a cancellation fee of 30% of the service price.'],
          ['5.3 Satisfaction Guarantee', 'The Company undertakes to return and correct any issues reported within 48 hours of service completion, at no additional charge. If dissatisfaction is justified, a full refund will be issued.'],
          ['5.4 Insurance', 'The Company holds professional liability and third-party insurance. Property damage caused by the team must be reported within 24 hours.'],
        ],
      },
      {
        title: '6. Limitation of Liability',
        intro: 'The Company shall not be liable for damages resulting from:',
        bullets: [
          'Incorrect information provided by the user in the contact form',
          'Service interruptions due to maintenance or force majeure',
          'Misuse of contact details provided',
          'Damage to undeclared valuables',
        ],
      },
      {
        title: '7. Intellectual Property',
        body: 'All website content — including texts, design, logo, images and code — is protected by copyright and belongs to the Company. Copying, republishing or using content without explicit written permission is prohibited.',
      },
      {
        title: '8. Changes to Terms',
        body: 'The Company may modify these terms at any time. Material changes will be published on the site. Continued use after publication of changes constitutes acceptance of the updated version.',
      },
      {
        title: '9. Governing Law & Jurisdiction',
        body: 'These Terms of Use are governed by the laws of the State of Israel. Any dispute shall be brought before the competent courts of the Tel Aviv-Jaffa district.',
      },
    ],
    contactTitle: 'Contact Us',
    contactBody: 'For questions about these Terms of Use:',
  },
  fr: {
    dir: 'ltr' as const,
    back: '← Retour à l\'accueil',
    badge: 'Dernière mise à jour',
    title: 'Conditions d\'utilisation',
    subtitle: 'Clean+ — Services de nettoyage professionnels',
    privacyLink: 'Politique de confidentialité',
    sections: [
      {
        title: '1. Acceptation des conditions',
        body: `L'utilisation du site cleanplus.co.il constitue une acceptation pleine et entière des présentes conditions. Si vous n'êtes pas d'accord, veuillez ne pas utiliser le site. Ces conditions s'appliquent en complément de la Politique de confidentialité de la Société.`,
      },
      {
        title: '2. Définitions',
        defs: [
          ['"La Société"', 'Caminos Productions Ltd, opérant sous la marque commerciale Clean+'],
          ['"L\'Utilisateur"', 'Toute personne ou entité utilisant le site'],
          ['"Le Service"', 'Services de nettoyage professionnels fournis par la Société'],
          ['"La Demande"', 'Le formulaire de contact soumis via le site'],
        ],
      },
      {
        title: '3. Objet du site',
        body: 'Le site sert à obtenir des informations sur les services de nettoyage et soumettre une demande de devis. Aucune transaction financière n\'est effectuée sur le site.',
      },
      {
        title: '4. Soumission d\'une demande',
        intro: 'En soumettant le formulaire, l\'utilisateur confirme que :',
        bullets: [
          'Les informations fournies sont exactes',
          'Il est majeur (18 ans+) ou agit avec le consentement d\'un parent/tuteur',
          'Il consent à être recontacté par téléphone et/ou WhatsApp par un représentant',
          'Il accepte la Politique de confidentialité du site',
        ],
      },
      {
        title: '5. Conditions de service',
        subs: [
          ['5.1 Devis', 'Un devis fourni par la Société est valable 30 jours à compter de la date d\'émission, sauf indication contraire.'],
          ['5.2 Annulation', 'Les services peuvent être annulés gratuitement jusqu\'à 24 heures avant l\'heure prévue. Une annulation avec moins de 24 heures de préavis peut entraîner des frais d\'annulation de 30% du prix du service.'],
          ['5.3 Garantie satisfaction', 'La Société s\'engage à revenir corriger tout problème signalé dans les 48 heures suivant la fin du service, sans frais supplémentaires. En cas d\'insatisfaction justifiée, un remboursement intégral sera effectué.'],
          ['5.4 Assurance', 'La Société détient une assurance responsabilité professionnelle et civile. Les dommages matériels causés par l\'équipe doivent être signalés dans les 24 heures.'],
        ],
      },
      {
        title: '6. Limitation de responsabilité',
        intro: 'La Société ne pourra être tenue responsable des dommages résultant de :',
        bullets: [
          'Informations incorrectes fournies dans le formulaire',
          'Interruptions du service dues à la maintenance ou à un cas de force majeure',
          'Mauvaise utilisation des coordonnées fournies',
          'Dommages à des objets de valeur non déclarés',
        ],
      },
      {
        title: '7. Propriété intellectuelle',
        body: 'Tout le contenu du site — textes, design, logo, images et code — est protégé par le droit d\'auteur et appartient à la Société. Toute reproduction, republication ou utilisation sans autorisation écrite expresse est interdite.',
      },
      {
        title: '8. Modifications des conditions',
        body: 'La Société peut modifier ces conditions à tout moment. Les modifications importantes seront publiées sur le site. La poursuite de l\'utilisation vaut acceptation de la version mise à jour.',
      },
      {
        title: '9. Droit applicable et juridiction',
        body: 'Les présentes conditions sont régies par le droit israélien. Tout litige sera porté devant les tribunaux compétents du district de Tel Aviv-Jaffa.',
      },
    ],
    contactTitle: 'Nous contacter',
    contactBody: 'Pour toute question sur ces conditions :',
  },
  ru: {
    dir: 'ltr' as const,
    back: '← На главную',
    badge: 'Последнее обновление',
    title: 'Условия использования',
    subtitle: 'Clean+ — Профессиональные услуги уборки',
    privacyLink: 'Политика конфиденциальности',
    sections: [
      {
        title: '1. Принятие условий',
        body: `Использование сайта cleanplus.co.il означает полное принятие настоящих Условий использования. Если вы не согласны, пожалуйста, воздержитесь от использования сайта. Настоящие условия применяются в дополнение к Политике конфиденциальности Компании.`,
      },
      {
        title: '2. Определения',
        defs: [
          ['«Компания»', 'Caminos Productions Ltd, работающая под торговой маркой Clean+'],
          ['«Пользователь»', 'Любое лицо или организация, использующие сайт'],
          ['«Услуга»', 'Профессиональные услуги уборки, предоставляемые Компанией'],
          ['«Заявка»', 'Форма обратной связи, отправленная через сайт'],
        ],
      },
      {
        title: '3. Назначение сайта',
        body: 'Сайт служит для получения информации об услугах уборки и отправки запроса на коммерческое предложение. Финансовые транзакции на сайте не проводятся.',
      },
      {
        title: '4. Отправка заявки',
        intro: 'Отправляя форму, пользователь подтверждает, что:',
        bullets: [
          'Предоставленные данные точны и верны',
          'Он старше 18 лет или действует с согласия родителя/опекуна',
          'Он соглашается на обратный звонок и/или сообщение WhatsApp от представителя',
          'Он принимает Политику конфиденциальности сайта',
        ],
      },
      {
        title: '5. Условия услуг',
        subs: [
          ['5.1 Коммерческие предложения', 'Предложение действительно 30 дней с даты выдачи, если не указано иное.'],
          ['5.2 Отмена', 'Услугу можно отменить бесплатно за 24 часа до назначенного времени. Отмена менее чем за 24 часа может повлечь штраф в размере 30% стоимости.'],
          ['5.3 Гарантия удовлетворённости', 'Компания обязуется вернуться и устранить любые недостатки, сообщённые в течение 48 часов после выполнения, без доп. оплаты. При обоснованной неудовлетворённости — полный возврат средств.'],
          ['5.4 Страхование', 'Компания имеет страхование профессиональной ответственности и ответственности перед третьими лицами. Ущерб имуществу, причинённый командой, необходимо сообщить в течение 24 часов.'],
        ],
      },
      {
        title: '6. Ограничение ответственности',
        intro: 'Компания не несёт ответственности за ущерб, вызванный:',
        bullets: [
          'Неверными данными, предоставленными в форме',
          'Перебоями в работе сайта из-за техобслуживания или форс-мажора',
          'Неправомерным использованием предоставленных контактных данных',
          'Повреждением незадекларированных ценностей',
        ],
      },
      {
        title: '7. Интеллектуальная собственность',
        body: 'Весь контент сайта — тексты, дизайн, логотип, изображения и код — защищён авторским правом и принадлежит Компании. Копирование, повторная публикация или использование без письменного разрешения запрещены.',
      },
      {
        title: '8. Изменения условий',
        body: 'Компания вправе изменять настоящие условия в любое время. Существенные изменения будут опубликованы на сайте. Продолжение использования означает принятие обновлённой версии.',
      },
      {
        title: '9. Применимое право и юрисдикция',
        body: 'Настоящие условия регулируются законодательством Израиля. Любой спор будет рассматриваться в компетентных судах округа Тель-Авив-Яффо.',
      },
    ],
    contactTitle: 'Связаться с нами',
    contactBody: 'По вопросам об условиях использования:',
  },
};

type Locale = keyof typeof CONTENT;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const c = CONTENT[(params.locale as Locale)] ?? CONTENT.he;
  return { title: `${c.title} | Clean+`, description: c.subtitle };
}

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const c = CONTENT[(params.locale as Locale)] ?? CONTENT.he;
  const today = new Date().toLocaleDateString(
    params.locale === 'he' ? 'he-IL' : params.locale === 'ru' ? 'ru-RU' : 'fr-FR',
    { day: '2-digit', month: '2-digit', year: 'numeric' }
  );

  return (
    <div className="min-h-screen bg-[#faf8f3]" dir={c.dir}>
      {/* Header */}
      <div className="bg-[#0a1628] pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            {c.back}
          </Link>
          <div className="inline-block bg-[#c9a84c]/15 border border-[#c9a84c]/30 text-[#c9a84c] text-xs px-3 py-1 rounded-full mb-4">
            {c.badge}: {today}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{c.title}</h1>
          <p className="text-white/45 text-base">{c.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 space-y-10 text-sm leading-relaxed text-gray-700">

          {c.sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-bold text-[#0a1628] mb-3">{s.title}</h2>

              {'body' in s && s.body && (
                <p>
                  {s.body}
                  {s.title.includes('1.') || s.title.includes('Acceptance') || s.title.includes('Généralités') || s.title.includes('Принятие') ? (
                    <> <Link href="/privacy" className="text-[#c9a84c] hover:underline">{c.privacyLink}</Link>.</>
                  ) : null}
                </p>
              )}

              {'intro' in s && s.intro && <p className="mb-3">{s.intro}</p>}

              {'defs' in s && s.defs && (
                <div className="space-y-2">
                  {(s.defs as [string, string][]).map(([term, def]) => (
                    <div key={term} className="flex gap-3 py-2 border-b border-gray-50">
                      <span className="font-bold text-[#0a1628] w-36 shrink-0">{term}</span>
                      <span className="text-gray-600">{def}</span>
                    </div>
                  ))}
                </div>
              )}

              {'bullets' in s && s.bullets && (
                <ul className="space-y-2 list-none">
                  {(s.bullets as string[]).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {'subs' in s && s.subs && (
                <div className="space-y-4">
                  {(s.subs as [string, string][]).map(([sub, text]) => (
                    <div key={sub}>
                      <h3 className="font-semibold text-[#0a1628] mb-1">{sub}</h3>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Contact */}
          <section className="bg-[#0a1628] rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-2">{c.contactTitle}</h2>
            <p className="text-white/60 text-sm mb-4">{c.contactBody}</p>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70">✉️ <a href="mailto:info@cleanplus.co.il" className="hover:text-[#c9a84c] transition-colors">info@cleanplus.co.il</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

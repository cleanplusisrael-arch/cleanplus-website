import Link from 'next/link';
import type { Metadata } from 'next';

const COMPANY = {
  he: 'קמינוס הפקות בע״מ',
  en: 'Caminos Productions Ltd',
  fr: 'Caminos Productions Ltd',
  ru: 'Caminos Productions Ltd',
};

const CONTENT = {
  he: {
    dir: 'rtl' as const,
    back: '← חזרה לדף הבית',
    badge: 'עדכון אחרון',
    title: 'מדיניות פרטיות',
    subtitle: 'Clean+ — שירותי ניקיון מקצועיים',
    sections: [
      {
        title: '1. כללי',
        body: `קמינוס הפקות בע״מ, הפועלת תחת המותג המסחרי Clean+ (להלן: "החברה"), מכבדת את פרטיות המשתמשים באתר cleanplus.co.il. מדיניות זו מסבירה אילו נתונים אנו אוספים, כיצד אנו משתמשים בהם, ומהן זכויותיכם. השימוש באתר ו/או מילוי טופס הפנייה מהווה הסכמה למדיניות זו. מדיניות זו עומדת בדרישות חוק הגנת הפרטיות, התשמ"א-1981 ותקנות GDPR ככל שרלוונטי.`,
      },
      {
        title: '2. המידע שאנו אוספים',
        intro: 'אנו אוספים אך ורק את המידע שאתם מספקים לנו מרצון:',
        list: [
          ['שם מלא', 'לצורך זיהוי ופנייה מכובדת'],
          ['מספר טלפון', 'לצורך חזרה אליכם עם הצעת מחיר'],
          ['סוג השירות המבוקש', 'לצורך התאמת ההצעה'],
          ['הערות חופשיות', 'מידע נוסף שבחרתם לשתף'],
          ['שפת ממשק', 'לצורך שירות בשפתכם'],
        ],
        note: 'אנו אינם אוספים נתוני כרטיס אשראי, מספרי תעודת זהות, מידע רפואי, או כל מידע רגיש אחר.',
      },
      {
        title: '3. מטרות השימוש במידע',
        intro: 'המידע ישמש אך ורק למטרות הבאות:',
        bullets: [
          'יצירת קשר חוזרת לצורך מתן הצעת מחיר',
          'תיאום שירות ניקיון',
          'שיפור השירות ועמידה בציפיות הלקוח',
          'שמירת רשומות עסקיות כנדרש על פי חוק',
        ],
        note: 'אנו לא נעביר, לא נמכור ולא נשתף את המידע שלכם עם צדדים שלישיים, למעט נותני שירות חיוניים הקשורים ישירות לביצוע השירות.',
      },
      {
        title: '4. אחסון ואבטחת המידע',
        body: 'המידע מאוחסן על שרתי Google Firebase (Firestore) בתשתיות מוצפנות בתקן AES-256. שרתי Firebase עומדים בדרישות GDPR.',
        bullets: [
          'גישה למידע מוגבלת לצוות המורשה בלבד',
          'תקשורת מוצפנת (HTTPS/TLS) בכל עת',
          'ביקורות אבטחה שוטפות',
        ],
      },
      {
        title: '5. שמירת מידע',
        body: 'נתוני לידים ופניות נשמרים למשך שנתיים מיום הפנייה, או עד למחיקה לפי בקשתכם. נתוני לקוחות פעילים נשמרים לאורך תקופת ההתקשרות ו-7 שנים לאחריה לצורכי חשבונאות ומס.',
      },
      {
        title: '6. זכויותיכם',
        intro: 'בהתאם לחוק הגנת הפרטיות הישראלי ול-GDPR:',
        rights: [
          ['📋', 'זכות עיון', 'לדעת אילו נתונים אחסנו עליכם'],
          ['✏️', 'זכות תיקון', 'לתקן נתונים שגויים'],
          ['🗑️', 'זכות מחיקה', '"הזכות להישכח" — מחיקת כל הנתונים'],
          ['🚫', 'זכות התנגדות', 'להתנגד לעיבוד לצורכי שיווק'],
          ['📦', 'זכות ניידות', 'לקבל נתונים בפורמט מובנה'],
          ['⏸️', 'זכות הגבלה', 'להגביל עיבוד המידע'],
        ],
        contact: 'לממש זכויותיכם, פנו אלינו: privacy@cleanplus.co.il — נשיב תוך 30 יום.',
      },
      {
        title: '7. עוגיות (Cookies)',
        body: 'האתר משתמש בעוגיות טכניות בלבד — הנדרשות לפעולת האתר (שמירת שפה מועדפת). אין שימוש בעוגיות פרסומיות.',
      },
      {
        title: '8. שינויים במדיניות',
        body: 'אנו שומרים את הזכות לעדכן מדיניות זו. שינויים מהותיים יפורסמו באתר עם תאריך עדכון חדש. המשך השימוש באתר מהווה הסכמה לנוסח המעודכן.',
      },
    ],
    contactTitle: '9. יצירת קשר בעניין פרטיות',
    contactBody: 'לכל שאלה, בקשה או תלונה בנוגע לפרטיות:',
    company: 'קמינוס הפקות בע״מ (Clean+)',
  },
  en: {
    dir: 'ltr' as const,
    back: '← Back to Home',
    badge: 'Last updated',
    title: 'Privacy Policy',
    subtitle: 'Clean+ — Professional Cleaning Services',
    sections: [
      {
        title: '1. General',
        body: `Caminos Productions Ltd, operating under the commercial brand Clean+ (hereinafter: "the Company"), respects the privacy of users on cleanplus.co.il. This policy explains what personal data we collect, how we use it, and your rights. Use of the site and/or submission of the contact form constitutes agreement to this policy. This policy complies with the Israeli Privacy Protection Law 1981 and GDPR where applicable.`,
      },
      {
        title: '2. Data We Collect',
        intro: 'We collect only the information you voluntarily provide:',
        list: [
          ['Full name', 'For identification and respectful communication'],
          ['Phone number', 'To call back with a quote'],
          ['Requested service type', 'To tailor the quote to your needs'],
          ['Free-form notes', 'Any additional information you choose to share'],
          ['Interface language', 'To serve you in your language'],
        ],
        note: 'We do NOT collect credit card data, ID numbers, medical information, or any other sensitive data.',
      },
      {
        title: '3. How We Use Your Data',
        intro: 'Your personal data will be used solely for:',
        bullets: [
          'Following up to provide a quote',
          'Scheduling a cleaning service',
          'Improving service and meeting client expectations',
          'Maintaining business records as required by law',
        ],
        note: 'We will not transfer, sell or share your data with third parties, except essential service providers directly involved in delivering the service.',
      },
      {
        title: '4. Storage & Security',
        body: 'Data is stored on Google Firebase (Firestore) servers with AES-256 encryption. Firebase infrastructure meets GDPR requirements.',
        bullets: [
          'Access restricted to authorised staff only',
          'Encrypted communication (HTTPS/TLS) at all times',
          'Regular security audits',
        ],
      },
      {
        title: '5. Data Retention',
        body: 'Lead and enquiry data is kept for two years from the date of enquiry, or until deletion upon your request. Active client data is kept for the duration of the relationship and 7 years thereafter for accounting and tax purposes.',
      },
      {
        title: '6. Your Rights',
        intro: 'Under Israeli Privacy Law and GDPR you have the right to:',
        rights: [
          ['📋', 'Access', 'Know what data we hold about you'],
          ['✏️', 'Rectification', 'Correct inaccurate or outdated data'],
          ['🗑️', 'Erasure', '"Right to be forgotten" — delete all your data'],
          ['🚫', 'Objection', 'Object to processing for marketing purposes'],
          ['📦', 'Portability', 'Receive your data in a structured format'],
          ['⏸️', 'Restriction', 'Restrict processing in certain circumstances'],
        ],
        contact: 'To exercise your rights, contact us at: privacy@cleanplus.co.il — we will respond within 30 days.',
      },
      {
        title: '7. Cookies',
        body: 'The site uses only technical cookies required for operation (e.g. storing language preference). No advertising or tracking cookies are used.',
      },
      {
        title: '8. Changes to This Policy',
        body: 'We reserve the right to update this policy. Material changes will be published on the site with a new update date. Continued use of the site constitutes acceptance of the updated version.',
      },
    ],
    contactTitle: '9. Privacy Contact',
    contactBody: 'For any questions, requests or complaints regarding privacy:',
    company: 'Caminos Productions Ltd (Clean+)',
  },
  fr: {
    dir: 'ltr' as const,
    back: '← Retour à l\'accueil',
    badge: 'Dernière mise à jour',
    title: 'Politique de confidentialité',
    subtitle: 'Clean+ — Services de nettoyage professionnels',
    sections: [
      {
        title: '1. Généralités',
        body: `Caminos Productions Ltd, opérant sous la marque commerciale Clean+ (ci-après : "la Société"), respecte la vie privée des utilisateurs du site cleanplus.co.il. Cette politique explique quelles données personnelles nous collectons, comment nous les utilisons, et quels sont vos droits. L'utilisation du site et/ou la soumission du formulaire de contact constitue une acceptation de cette politique. Elle est conforme à la loi israélienne sur la protection de la vie privée (1981) et au RGPD.`,
      },
      {
        title: '2. Données collectées',
        intro: 'Nous collectons uniquement les informations que vous nous fournissez volontairement :',
        list: [
          ['Nom complet', 'Pour l\'identification et une communication respectueuse'],
          ['Numéro de téléphone', 'Pour vous rappeler avec un devis'],
          ['Type de service demandé', 'Pour adapter le devis à vos besoins'],
          ['Notes libres', 'Toute information supplémentaire que vous choisissez de partager'],
          ['Langue d\'interface', 'Pour vous servir dans votre langue'],
        ],
        note: 'Nous ne collectons PAS de données de carte bancaire, numéros d\'identité, informations médicales ou toute autre donnée sensible.',
      },
      {
        title: '3. Utilisation des données',
        intro: 'Vos données personnelles seront utilisées uniquement pour :',
        bullets: [
          'Vous recontacter pour fournir un devis',
          'Planifier un service de nettoyage',
          'Améliorer le service et répondre aux attentes',
          'Tenir des registres commerciaux conformément à la loi',
        ],
        note: 'Nous ne transférerons, ne vendrons ni ne partagerons vos données avec des tiers, sauf les prestataires essentiels directement impliqués dans la prestation du service.',
      },
      {
        title: '4. Stockage et sécurité',
        body: 'Les données sont stockées sur les serveurs Google Firebase (Firestore) avec chiffrement AES-256. L\'infrastructure Firebase est conforme au RGPD.',
        bullets: [
          'Accès restreint au personnel autorisé uniquement',
          'Communication chiffrée (HTTPS/TLS) en permanence',
          'Audits de sécurité réguliers',
        ],
      },
      {
        title: '5. Conservation des données',
        body: 'Les données de prospects sont conservées 2 ans à compter de la demande, ou jusqu\'à suppression sur votre demande. Les données des clients actifs sont conservées pendant la durée de la relation et 7 ans après, à des fins comptables et fiscales.',
      },
      {
        title: '6. Vos droits',
        intro: 'En vertu du droit israélien et du RGPD, vous avez le droit de :',
        rights: [
          ['📋', 'Accès', 'Savoir quelles données nous détenons sur vous'],
          ['✏️', 'Rectification', 'Corriger des données inexactes'],
          ['🗑️', 'Effacement', '"Droit à l\'oubli" — suppression de toutes vos données'],
          ['🚫', 'Opposition', 'Vous opposer au traitement à des fins marketing'],
          ['📦', 'Portabilité', 'Recevoir vos données dans un format structuré'],
          ['⏸️', 'Limitation', 'Limiter le traitement dans certaines circonstances'],
        ],
        contact: 'Pour exercer vos droits, contactez-nous : privacy@cleanplus.co.il — réponse sous 30 jours.',
      },
      {
        title: '7. Cookies',
        body: 'Le site utilise uniquement des cookies techniques nécessaires au fonctionnement (ex. mémorisation de la langue). Aucun cookie publicitaire ou de suivi n\'est utilisé.',
      },
      {
        title: '8. Modifications de la politique',
        body: 'Nous nous réservons le droit de mettre à jour cette politique. Les modifications importantes seront publiées sur le site avec une nouvelle date. La poursuite de l\'utilisation du site vaut acceptation de la version mise à jour.',
      },
    ],
    contactTitle: '9. Contact vie privée',
    contactBody: 'Pour toute question, demande ou réclamation concernant la confidentialité :',
    company: 'Caminos Productions Ltd (Clean+)',
  },
  ru: {
    dir: 'ltr' as const,
    back: '← На главную',
    badge: 'Последнее обновление',
    title: 'Политика конфиденциальности',
    subtitle: 'Clean+ — Профессиональные услуги уборки',
    sections: [
      {
        title: '1. Общие положения',
        body: `Caminos Productions Ltd, работающая под торговой маркой Clean+ (далее: «Компания»), уважает конфиденциальность пользователей сайта cleanplus.co.il. Настоящая политика объясняет, какие персональные данные мы собираем, как используем и каковы ваши права. Использование сайта и/или заполнение формы обратной связи означает согласие с настоящей политикой. Политика соответствует Израильскому закону о защите конфиденциальности 1981 года и GDPR.`,
      },
      {
        title: '2. Собираемые данные',
        intro: 'Мы собираем только информацию, которую вы предоставляете добровольно:',
        list: [
          ['Полное имя', 'Для идентификации и корректного общения'],
          ['Номер телефона', 'Для обратного звонка с коммерческим предложением'],
          ['Тип запрашиваемой услуги', 'Для адаптации предложения под ваши нужды'],
          ['Свободные заметки', 'Дополнительная информация по вашему усмотрению'],
          ['Язык интерфейса', 'Для обслуживания на вашем языке'],
        ],
        note: 'Мы НЕ собираем данные банковских карт, номера удостоверений личности, медицинскую информацию или иные конфиденциальные данные.',
      },
      {
        title: '3. Использование данных',
        intro: 'Ваши персональные данные используются исключительно для:',
        bullets: [
          'Обратной связи с предоставлением коммерческого предложения',
          'Планирования услуги уборки',
          'Улучшения сервиса и соответствия ожиданиям клиентов',
          'Ведения деловых записей в соответствии с законом',
        ],
        note: 'Мы не передаём, не продаём и не передаём ваши данные третьим лицам, за исключением поставщиков услуг, непосредственно участвующих в оказании услуги.',
      },
      {
        title: '4. Хранение и безопасность',
        body: 'Данные хранятся на серверах Google Firebase (Firestore) с шифрованием AES-256. Инфраструктура Firebase соответствует требованиям GDPR.',
        bullets: [
          'Доступ ограничен только авторизованным персоналом',
          'Зашифрованная связь (HTTPS/TLS) постоянно',
          'Регулярные проверки безопасности',
        ],
      },
      {
        title: '5. Сроки хранения',
        body: 'Данные лидов и заявок хранятся 2 года с даты обращения или до удаления по вашему запросу. Данные активных клиентов хранятся в течение срока сотрудничества и 7 лет после него в бухгалтерских и налоговых целях.',
      },
      {
        title: '6. Ваши права',
        intro: 'В соответствии с израильским законодательством и GDPR вы вправе:',
        rights: [
          ['📋', 'Доступ', 'Узнать, какие данные мы о вас храним'],
          ['✏️', 'Исправление', 'Исправить неточные или устаревшие данные'],
          ['🗑️', 'Удаление', '«Право на забвение» — удаление всех данных'],
          ['🚫', 'Возражение', 'Возражать против обработки в маркетинговых целях'],
          ['📦', 'Переносимость', 'Получить данные в структурированном формате'],
          ['⏸️', 'Ограничение', 'Ограничить обработку в определённых обстоятельствах'],
        ],
        contact: 'Для реализации прав обратитесь: privacy@cleanplus.co.il — ответим в течение 30 дней.',
      },
      {
        title: '7. Файлы cookie',
        body: 'Сайт использует только технические файлы cookie, необходимые для работы (например, сохранение языка). Рекламные или отслеживающие cookie не используются.',
      },
      {
        title: '8. Изменения политики',
        body: 'Мы оставляем за собой право обновлять настоящую политику. Существенные изменения будут опубликованы на сайте с новой датой. Продолжение использования сайта означает принятие обновлённой версии.',
      },
    ],
    contactTitle: '9. Контакт по вопросам конфиденциальности',
    contactBody: 'По любым вопросам, запросам или жалобам, касающимся конфиденциальности:',
    company: 'Caminos Productions Ltd (Clean+)',
  },
};

type Locale = keyof typeof CONTENT;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const c = CONTENT[(params.locale as Locale) ?? 'he'] ?? CONTENT.he;
  return { title: `${c.title} | Clean+`, description: c.subtitle };
}

export default async function PrivacyPage({ params }: { params: { locale: string } }) {
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

              {'body' in s && s.body && <p>{s.body}</p>}

              {'intro' in s && s.intro && <p className="mb-3">{s.intro}</p>}

              {'list' in s && s.list && (
                <ul className="space-y-2 list-none mb-3">
                  {(s.list as [string, string][]).map(([item, reason]) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                      <span><strong>{item}</strong> — {reason}</span>
                    </li>
                  ))}
                </ul>
              )}

              {'bullets' in s && s.bullets && (
                <ul className="space-y-2 list-none mb-3">
                  {(s.bullets as string[]).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#c9a84c] mt-0.5 shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {'rights' in s && s.rights && (
                <>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    {(s.rights as [string, string, string][]).map(([icon, title, desc]) => (
                      <div key={title} className="bg-[#faf8f3] rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{icon}</span>
                          <span className="font-semibold text-[#0a1628] text-xs">{title}</span>
                        </div>
                        <p className="text-xs text-gray-500">{desc}</p>
                      </div>
                    ))}
                  </div>
                  {'contact' in s && s.contact && <p className="mt-4">{s.contact}</p>}
                </>
              )}

              {'note' in s && s.note && (
                <p className="mt-3 text-gray-500">{s.note}</p>
              )}
            </section>
          ))}

          {/* Contact section */}
          <section className="bg-[#0a1628] rounded-xl p-6">
            <h2 className="text-base font-bold text-white mb-3">{c.contactTitle}</h2>
            <p className="text-white/60 text-sm mb-4">{c.contactBody}</p>
            <ul className="space-y-2 text-sm">
              <li className="text-white/70">🏢 <strong className="text-white/90">{c.company}</strong></li>
              <li className="text-white/70">✉️ <a href="mailto:privacy@cleanplus.co.il" className="hover:text-[#c9a84c] transition-colors">privacy@cleanplus.co.il</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

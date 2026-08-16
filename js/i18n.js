const SITE = {
  url: 'https://pchportfolio.netlify.app/',
  ogImage: 'https://pchportfolio.netlify.app/img/og-cover.svg',
};

const I18N = {
  defaultLang: 'en',
  currentLang: 'en',
  storageKey: 'portfolio-lang',

  strings: {
    es: {
      'meta.title': 'Kelvin Puche - Desarrollador Web',
      'meta.description': 'Portfolio de Kelvin Puche, desarrollador full-stack. Spring Boot, React.js, Kubernetes, SQL, y más.',
      'nav.home': 'inicio',
      'nav.certificates': 'certificados',
      'nav.certificatesShort': 'certif.',
      'nav.projects': 'proyectos',
      'nav.projectsShort': 'proyectos',
      'nav.skills': 'habilidades',
      'nav.skillsShort': 'stack',
      'nav.contact': 'contacto',
      'hero.availability': 'disponible',
      'hero.role': 'desarrollador full-stack',
      'hero.cta.projects': 'Ver proyectos',
      'hero.cta.contact': 'Contacto',
      'hero.masthead.issue': 'VOL. 01 · 2026 · PORTFOLIO DEV',
      'hero.masthead.tag': 'KELVIN PUCHE · DESARROLLO WEB',
      'hero.features': 'Stack',
      'hero.featuresText': 'vert.x · springboot · react.js · docker · k8s · temporal.io · vercel · supabase · sql',
      'hero.spec.status': 'estado',
      'hero.description': 'Perfil',
      'hero.aboutHeading': '— Acerca de Kelvin Puche —',
      'hero.aboutText': 'Desarrollador full-stack. Construyo APIs, microservicios y SPAs con, Spring Boot, React SQL y cloud.',
      'about.title': 'Certificación',
      'about.subtitle': 'Formación destacada',
      'about.moreCerts': 'También tengo certificados en Cisco Python Essentials I + II y más.',
      'about.viewAll': 'Ver todas',
      'cert.oracle.title': 'OCI AI Foundations',
      'cert.oracle.summary': 'Fundamentos de IA moderna (ML, DL, LLMs) y herramientas OCI.',
      'cert.kubernetes.title': 'Kubernetes',
      'cert.kubernetes.summary': 'Orquestación de contenedores, deployments, services e ingress.',
      'cert.temporal.title': 'Temporal + Spring',
      'cert.temporal.summary': 'Workflows durables con Temporal y Spring Boot.',
      'cert.english.title': 'Inglés B2',
      'cert.english.summary': 'Upper Intermediate verificado por EF SET.',
      'cert.java.title': 'Java desde Cero',
      'cert.java.summary': 'Mi primer lenguaje de programación. Muy completo y útil para todo tipo de tareas.',
      'cert.analytics.title': 'Data Analytics',
      'cert.analytics.summary': 'Certificado en Data Analytics, con herramientas como SQL, Excel y Tableau.',
      'about.grateful': 'También quisiera destacar y agradecer los cursos de Pildorasinformaticas, SergieCode, MitoCode, Fazt, Jey Code y entre otros por ofrecer sus servicios y brindar aprendizaje de manera gratuita.',
      'projects.title': 'Proyectos',
      'projects.subtitle': 'Selección reciente',
      'projects.githubHint': 'Hay más en mi perfil de GitHub.',
      'projects.githubLink': 'Ver perfil',
      'projects.moreTitle': 'Otros proyectos',
      'projects.badge.live': 'En vivo',
      'projects.badge.repo': 'Repo',
      'project.vitre.summary': 'Red social con posts, comentarios, chat en tiempo real y perfiles. React, Supabase y Vercel.',
      'project.auges.summary': 'Suite POS en la nube con panel admin, landing de marca y módulo para programa local.',
      'project.ktm.summary': 'Task manager full-stack con JWT, CRUD, temas claro/oscuro, atajos de teclado y PWA.',
      'project.editor.summary': 'Editor de texto de escritorio en Java con JSwing.',
      'project.hangman.summary': 'Juego del ahorcado en consola. Práctica de Java orientada a objetos.',
      'skills.title': 'Habilidades',
      'skills.subtitle': 'Tecnologías que manejo',
      'skills.aboutTitle': 'Sobre las herramientas',
      'skills.aboutText': 'Construyo y despliego apps full-stack con Spring Boot, React, Docker y Kubernetes. También trabajo con Python, Temporal, Supabase, Vercel y más.',
      'skills.category.databases': 'Bases de Datos',
      'img.fallback': 'imagen no disponible',
      'lang.switch': 'Idioma',
      'footer.statement': 'Sigo construyendo — un commit a la vez.',
      'footer.copyright': '© 2026 Kelvin Puche'
    },
    en: {
      'meta.title': 'Kelvin Puche - Web Developer',
      'meta.description': 'Kelvin Puche portfolio - full-stack developer. Spring Boot, React.js, SQL, Cloud and more.',
      'nav.home': 'home',
      'nav.certificates': 'certificates',
      'nav.certificatesShort': 'certs',
      'nav.projects': 'projects',
      'nav.projectsShort': 'work',
      'nav.skills': 'skills',
      'nav.skillsShort': 'stack',
      'nav.contact': 'contact',
      'hero.availability': 'available',
      'hero.role': 'full-stack developer',
      'hero.cta.projects': 'View projects',
      'hero.cta.contact': 'Contact',
      'hero.masthead.issue': 'VOL. 01 · 2026 · DEV PORTFOLIO',
      'hero.masthead.tag': 'KELVIN PUCHE · WEB DEV',
      'hero.features': 'Stack',
      'hero.featuresText': 'vert.x · springboot · react.js · docker · k8s · temporal.io · vercel · supabase · sql',
      'hero.spec.status': 'status',
      'hero.description': 'Profile',
      'hero.aboutHeading': '— About Kelvin Puche —',
      'hero.aboutText': 'Full-stack developer building REST APIs, microservices, and SPAs with, Spring Boot, React, SQL and cloud.',
      'about.title': 'Certification',
      'about.subtitle': 'Featured credentials',
      'about.moreCerts': 'I also hold credentials in Cisco: Python Essentials I + II and more.',
      'about.viewAll': 'View all',
      'cert.oracle.title': 'OCI AI Foundations',
      'cert.oracle.summary': 'Modern AI fundamentals (ML, DL, LLMs) and OCI tooling.',
      'cert.kubernetes.title': 'Kubernetes',
      'cert.kubernetes.summary': 'Container orchestration, deployments, services, and ingress.',
      'cert.temporal.title': 'Temporal + Spring',
      'cert.temporal.summary': 'Durable workflows with Temporal and Spring Boot.',
      'cert.english.title': 'English B2',
      'cert.english.summary': 'Upper Intermediate verified by EF SET.',
      'cert.java.title': 'Java From Scratch',
      'cert.java.summary': 'My first programming language. Very complete and useful for all kinds of tasks.',
      'cert.analytics.title': 'Data Analytics',
      'cert.analytics.summary': 'Certified in Data Analytics with tools such as SQL, Excel, and Tableau.',
      'about.grateful': 'I\'d also like to highlight and thank Pildorasinformaticas, SergieCode, MitoCode, Fazt, Jey Code, and others for offering their services and providing free learning resources.',
      'projects.title': 'Projects',
      'projects.subtitle': 'Selected work',
      'projects.githubHint': 'More repos on my GitHub profile.',
      'projects.githubLink': 'View profile',
      'projects.moreTitle': 'Other projects',
      'projects.badge.live': 'Live',
      'projects.badge.repo': 'Repo',
      'project.vitre.summary': 'Social platform with posts, comments, realtime chat, and profiles. React, Supabase, and Vercel.',
      'project.auges.summary': 'Cloud POS suite with admin panel, brand landing page, and local program module.',
      'project.ktm.summary': 'Full-stack task manager with JWT auth, CRUD, light/dark themes, keyboard shortcuts, and PWA.',
      'project.editor.summary': 'Desktop text editor in Java with JSwing.',
      'project.hangman.summary': 'Console hangman game. Java OOP practice project.',
      'skills.title': 'Skills',
      'skills.subtitle': 'Technologies I work with',
      'skills.aboutTitle': 'About the tools',
      'skills.aboutText': 'I build and deploy full-stack apps with Spring Boot, React.js, Docker, and Kubernetes. I also work with Python, Temporal, Supabase, Vercel and more.',
      'skills.category.databases': 'Databases',
      'img.fallback': 'image unavailable',
      'lang.switch': 'Language',
      'footer.statement': 'Still building — one commit at a time.',
      'footer.copyright': '© 2026 Kelvin Puche'
    }
  },

  t(key) {
    const lang = this.strings[this.currentLang] || this.strings[this.defaultLang];
    return lang[key] ?? this.strings[this.defaultLang][key] ?? key;
  },

  detectLang() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'es' || stored === 'en') return stored;
    return this.defaultLang;
  },

  setLang(lang) {
    if (lang !== 'es' && lang !== 'en') return;
    this.currentLang = lang;
    localStorage.setItem(this.storageKey, lang);
    this.apply();
  },

  apply() {
    document.documentElement.lang = this.currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    document.title = this.t('meta.title');

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', this.t('meta.description'));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', this.t('meta.title'));

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', this.t('meta.description'));

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', this.t('meta.title'));

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', this.t('meta.description'));

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', SITE.url);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', SITE.url);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', SITE.ogImage);

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', SITE.ogImage);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', this.currentLang === 'es' ? 'es_ES' : 'en_US');

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === this.currentLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (typeof renderSkills === 'function') renderSkills();
  },

  init() {
    this.currentLang = this.detectLang();
    this.apply();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setLang(btn.dataset.lang));
    });
  }
};

document.addEventListener('DOMContentLoaded', () => I18N.init());

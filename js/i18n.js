const I18N = {
  defaultLang: 'en',
  currentLang: 'en',
  storageKey: 'portfolio-lang',

  strings: {
    es: {
      'meta.title': 'Kelvin Puche — Desarrollador Web',
      'meta.description': 'Portfolio de Kelvin Puche, desarrollador web. Java, Spring Boot, React, JavaScript, Python y más.',
      'nav.home': 'inicio',
      'nav.certificates': 'certificados',
      'nav.certificatesShort': 'certif.',
      'nav.projects': 'proyectos',
      'nav.projectsShort': 'proyectos',
      'nav.skills': 'habilidades',
      'nav.skillsShort': 'stack',
      'nav.contact': 'contacto',
      'hero.availability': 'disponible',
      'hero.role': 'desarrollador web',
      'hero.masthead.issue': 'VOL. 01 · 2026 · PORTFOLIO DEV',
      'hero.masthead.tag': 'KELVIN PUCHE · DESARROLLO WEB',
      'hero.features': 'FEATURES',
      'hero.featuresText': 'vert.x · springboot · react.js · docker · k8s · temporal.io · vercel · supabase · sql',
      'hero.spec.stack': 'stack',
      'hero.spec.stackVal': 'APIs REST · SPAs · microservices · cloud',
      'hero.spec.status': 'estado',
      'hero.spec.contact': 'contacto',
      'hero.description': 'DESCRIPTION',
      'hero.aboutHeading': '— Acerca de Kelvin Puche —',
      'hero.aboutText': 'Kelvin es un desarrollador jr que siempre aporta una actitud positiva y multidisciplinaria a cada equipo de trabajo.',
      'about.title': 'certificación',
      'about.subtitle': 'Mi crecimiento academico:',
      'about.clickHint': '[Click card: para abrir el enlace con el acceso público a mi certificado]',
      'cert.java.tut': 'Certificado en Java desde Cero en la academia EDTeam',
      'cert.java.desc': 'Mi primer lenguaje de programación. Muy completo y útil para todo tipo de tareas.',
      'cert.python.desc': 'Opino que es un lenguaje muy completo y estoy orgulloso de haberlo aprendido.',
      'cert.oracle.desc': 'Gracias a Oracle, ahora poseo un profundo conocimiento teórico de los fundamentos de la IA moderna (ML, DL, LLMs) y experiencia práctica con las herramientas de IA de Oracle Cloud Infrastructure (OCI).',
      'cert.analytics.desc': 'Certificado en Data Analytics, con herramientas como SQL, Excel y Tableau.',
      'cert.english.tip': 'EF SET: Inglés B2',
      'cert.english.desc': 'Certificación de inglés nivel B2 (Upper Intermediate) verificada por EF SET.',
      'cert.kubernetes.tip': 'Udemy: Kubernetes',
      'cert.kubernetes.desc': 'Certificación de Kubernetes en Udemy. Orquestación de contenedores, deployments, services, ingress y más.',
      'cert.temporal.tip': 'Udemy: Temporal',
      'cert.temporal.desc': 'Certificación de arquitectura de microservicios con Temporal y Spring en Udemy. Orquestación de workflows durables, workers, activities y más.',
      'about.grateful': 'También quisiera destacar y agradecer los cursos de Pildorasinformaticas, SergieCode, MitoCode, Fazt, Jey Code y entre otros por ofrecer sus servicios y brindar aprendizaje de manera gratuita.',
      'projects.title': 'Proyectos',
      'projects.githubHint': 'Puedes encontrar más en mi perfil de GitHub.',
      'projects.clickHint': '[Click card: para abrir el repositorio Github con el código fuente]',
      'project.vitre.tut': 'Red Social al estilo Reddit con chat, notificaciones, perfiles, publicaciones, comentarios y más.',
      'project.vitre.desc': 'Proyecto de red social al estilo Reddit, tornando más a mi estilo.',
      'project.auges.tut': 'Mi POS administrativo en la nube Auges y su página de presentación de la marca (personal)',
      'project.auges.desc': 'Sistemas POS administrativos.',
      'project.ktm.tut': 'Gestor de tareas full-stack con diseño Neo-Tokyo. Autenticación JWT, CRUD completo, tema oscuro/claro, atajos de teclado y soporte PWA.',
      'project.ktm.desc': 'Primer proyecto combinando Spring Boot y React.',
      'project.editor.tut': 'Aplicación de escritorio creada en Java con la biblioteca JSwing.',
      'project.editor.desc': 'Un editor de texto en el que estuve jugando un poco con la biblioteca JSwing.',
      'project.hangman.tut': 'Un minijuego divertido en consola :).',
      'project.hangman.desc': 'Muy divertido, me moria de risa mientras lo jugaba.',
      'skills.title': 'Habilidades',
      'skills.subtitle': 'Tecnologías que manejo',
      'skills.aboutTitle': 'Sobre las herramientas',
      'skills.aboutText': 'He trabajado en: lenguajes como Java, JavaScript y Python; frameworks backend como SpringBoot, Vert.x, Next.js y Django; tecnologías frontend como HTML, CSS, Tailwind, React y Next.js; bases de datos como PostgreSQL junto a herramientas de gestión como supabase y pgadmin; y utilidades para control de versiones y despliegue como Git, GitHub, Docker y Kubernetes. También incluyo herramientas y entornos para ciencia de datos que empleo en proyectos de análisis y modelos de IA. Estos iconos representan el ecosistema con el que construyo, pruebo y despliego aplicaciones. También tengo conocimientos en herramientas de análisis de datos como SQL, Excel y Tableau.',
      'skills.category.databases': 'Bases de Datos',
      'img.fallback': 'imagen no disponible',
      'lang.switch': 'Idioma',
      'footer.statement': 'Sigo construyendo — un commit a la vez.',
      'footer.copyright': '© 2026 Kelvin Puche'
    },
    en: {
      'meta.title': 'Kelvin Puche — Web Developer',
      'meta.description': 'Kelvin Puche\'s portfolio — web developer. Java, Spring Boot, React, JavaScript, Python, and more.',
      'nav.home': 'home',
      'nav.certificates': 'certificates',
      'nav.certificatesShort': 'certs',
      'nav.projects': 'projects',
      'nav.projectsShort': 'work',
      'nav.skills': 'skills',
      'nav.skillsShort': 'stack',
      'nav.contact': 'contact',
      'hero.availability': 'available',
      'hero.role': 'web developer',
      'hero.masthead.issue': 'VOL. 01 · 2026 · DEV PORTFOLIO',
      'hero.masthead.tag': 'KELVIN PUCHE · WEB DEV',
      'hero.features': 'FEATURES',
      'hero.featuresText': 'vert.x · springboot · react.js · docker · k8s · temporal.io · vercel · supabase · sql',
      'hero.spec.stack': 'stack',
      'hero.spec.stackVal': 'REST APIs · SPAs · microservices · cloud',
      'hero.spec.status': 'status',
      'hero.spec.contact': 'contact',
      'hero.description': 'DESCRIPTION',
      'hero.aboutHeading': '— About Kelvin Puche —',
      'hero.aboutText': 'Kelvin is a junior developer who always brings a positive, multidisciplinary attitude to every team.',
      'about.title': 'certification',
      'about.subtitle': 'My academic growth:',
      'about.clickHint': '[Click card: to open the public link to my certificate]',
      'cert.java.tut': 'Java From Scratch certificate from EDTeam Academy',
      'cert.java.desc': 'My first programming language. Very complete and useful for all kinds of tasks.',
      'cert.python.desc': 'I think it\'s a very complete language and I\'m proud to have learned it.',
      'cert.oracle.desc': 'Thanks to Oracle, I now have deep theoretical knowledge of modern AI fundamentals (ML, DL, LLMs) and hands-on experience with Oracle Cloud Infrastructure (OCI) AI tools.',
      'cert.analytics.desc': 'Certified in Data Analytics with tools such as SQL, Excel, and Tableau.',
      'cert.english.tip': 'EF SET: English B2',
      'cert.english.desc': 'B2 (Upper Intermediate) English certification verified by EF SET.',
      'cert.kubernetes.tip': 'Udemy: Kubernetes',
      'cert.kubernetes.desc': 'Kubernetes certification from Udemy. Container orchestration, deployments, services, ingress, and more.',
      'cert.temporal.tip': 'Udemy: Temporal',
      'cert.temporal.desc': 'Microservices architecture certification with Temporal and Spring from Udemy. Durable workflow orchestration, workers, activities, and more.',
      'about.grateful': 'I\'d also like to highlight and thank Pildorasinformaticas, SergieCode, MitoCode, Fazt, Jey Code, and others for offering their services and providing free learning resources.',
      'projects.title': 'Projects',
      'projects.githubHint': 'You can find more on my GitHub profile.',
      'projects.clickHint': '[Click card: to open the GitHub repository with the source code]',
      'project.vitre.tut': 'Reddit-style social network with chat, notifications, profiles, posts, comments, and more.',
      'project.vitre.desc': 'A Reddit-style social network project, shaped to my own style.',
      'project.auges.tut': 'My cloud-based admin POS Auges and its personal brand landing page',
      'project.auges.desc': 'Administrative POS systems.',
      'project.ktm.tut': 'Full-stack task manager with a Neo-Tokyo design. JWT authentication, full CRUD, dark/light theme, keyboard shortcuts, and PWA support.',
      'project.ktm.desc': 'First project combining Spring Boot and React.',
      'project.editor.tut': 'Desktop application built in Java with the JSwing library.',
      'project.editor.desc': 'A text editor where I experimented a bit with the JSwing library.',
      'project.hangman.tut': 'A fun console minigame :).',
      'project.hangman.desc': 'Very fun — I couldn\'t stop laughing while playing it.',
      'skills.title': 'Skills',
      'skills.subtitle': 'Technologies I work with',
      'skills.aboutTitle': 'About the tools',
      'skills.aboutText': 'I\'ve worked with languages such as Java, JavaScript, and Python; backend frameworks like SpringBoot, Next.Js and Django; frontend technologies including HTML, CSS, Tailwind, React and Next.Js; relational databases like PostgreSQL along with management tools such as DBeaver, Supabase, and pgAdmin; and version control and deployment utilities like Docker, Kubernetes, Git, GitHub. I also use data science tools and environments for analysis and AI model projects. These icons represent the ecosystem I use to build, test, and deploy applications. I also have experience with data analysis tools such as SQL, Excel, and Tableau.',
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

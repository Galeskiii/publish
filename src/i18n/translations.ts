export const translations = {
  pt: {
    hero: {
    },
    common: {
      back: "← VOLTAR",
      close: "✕ FECHAR",
      swipeHint: "arraste para ver mais",
      scroll: "SCROLL ↓↓↓",
      emailCopied: "E-mail copiado!",
    },
    about: {
      label: "SOBRE_MIM",
      section: "SEC.03 // ÁREAS DE ATUAÇÃO",
      text: "Desde a infância, o contato constante com a arte me conduziu à investigação da estética, \ndesdobrando-se, com o tempo, em uma prática estruturada por forma, contraste, ritmo, legibilidade e intenção.",
      desc: "Ideias que ganham forma através de uma execução técnica e intencional.",
      services: [
        { title: "Design Gráfico", icon: "◎", desc: "Desenvolvimento de materiais impressos e digitais com foco em estrutura, legibilidade e função." },
        { title: "Social Media", icon: "◇", desc: "Criação de sistemas visuais para redes, organizando conteúdo por hierarquia, ritmo e consistência." },
        { title: "Branding", icon: "✦", desc: "Construção de identidades visuais com base conceitual e aplicação consistente." },
        { title: "UX/UI Design", icon: "□", desc: "Organização de interfaces e fluxos digitais com foco em experiência, navegação e clareza." },
      ],
    },
    projects: {
      label: "SEC.02 // PORTFÓLIO",
      titleLine1: "MEUS",
      titleLine2: "PROJETOS",
      desc: "Projetos com realização integral, coordenação criativa ou técnica.",
      viewGallery: "ABRIR GALERIA",
      end: "END_OF_SELECTION",
      items: [
        { 
          title: "EVOLUE", 
          tag: "SOCIAL CONTENT", 
          desc: "Conteúdo digital para marca de suplementação esportiva, com colaboração e coordenação técnica, focado em consistência e retenção.",
          type: "Type: Mural 4-Fases",
          focus: "Focus: Harmonia Dinâmica"
        },
        { 
          title: "SAUVEL", 
          tag: "BRANDING & DESIGN", 
          desc: "Identidade promocional e campanhas para o setor farmacêutico, orientadas por clareza, posicionamento e exploração da identidade.",
          type: "Hierarchy: Stack Diagonal",
          focus: "Depth: Simulação de DOF"
        },
      ],
    },
    contact: {
      label: "SEC.04 // CONTATO",
      heading: "Contato",
      titleLine1: "INICIAR NOVO",
      titleLine2: "PROJETO",
      desc: "Existe um problema visual a ser resolvido.\nEnvie o escopo, estruturo a solução a partir disso.",
      cta: "ENTRAR EM CONTATO",
    },
    footer: {
      rights: "© Galeski. Todos os direitos reservados.",
    },
  },
  en: {
    hero: {
      subtitle: "Multidisciplinary Designer",
      desc: "Since childhood, constant contact with art has led me to investigate aesthetics.\nOver time, this focus evolved into practice, structured through form, contrast, rhythm, and legibility.",
    },
    common: {
      back: "← BACK",
      close: "✕ CLOSE",
      swipeHint: "swipe to see more",
      scroll: "SCROLL ↓↓↓",
      emailCopied: "Email copied!",
    },
    about: {
      label: "ABOUT_ME",
      section: "SEC.03 // CORE EXPERTISE",
      text: "Since childhood, constant contact with art has led me to investigate aesthetics, unfolding over time into a practice structured by form, contrast, rhythm, legibility, and intention.",
      desc: "Ideas taking shape through precise, intentional execution.",
      services: [
        { title: "Graphic Design", icon: "◎", desc: "Development of print and digital materials focused on structure, legibility, and function." },
        { title: "Social Media", icon: "◇", desc: "Creation of visual systems for networks, organizing content through hierarchy, rhythm, and consistency." },
        { title: "Branding", icon: "✦", desc: "Construction of visual identities with a conceptual basis and consistent application." },
        { title: "UX/UI Design", icon: "□", desc: "Organization of digital interfaces and flows focused on experience, navigation, and clarity." },
      ],
    },
    projects: {
      label: "SEC.02 // PORTFOLIO",
      titleLine1: "MY",
      titleLine2: "PROJECTS",
      desc: "Projects involving full production, creative coordination or technical.",
      viewGallery: "OPEN GALLERY",
      end: "END_OF_SELECTION",
      items: [
        { 
          title: "EVOLUE", 
          tag: "SOCIAL CONTENT", 
          desc: "Digital content for a sports supplementation brand, featuring collaboration and technical coordination, focused on consistency and retention.",
          type: "Type: 4-Phase Mural",
          focus: "Focus: Dynamic Harmony"
        },
        { 
          title: "SAUVEL", 
          tag: "BRANDING & DESIGN", 
          desc: "Promotional identity and campaigns for the pharmaceutical sector, guided by clarity, positioning, and identity exploration.",
          type: "Hierarchy: Diagonal Stack",
          focus: "Depth: DOF Simulated"
        },
      ],
    },
    contact: {
      label: "SEC.04 // CONTACT",
      heading: "Contact",
      titleLine1: "START A NEW",
      titleLine2: "PROJECT",
      desc: "There is a visual problem to be solved.\nSend the scope, and I will structure the solution accordingly.",
      cta: "GET IN TOUCH",
    },
    footer: {
      rights: "© Galeski. All rights reserved.",
    },
  },
} as const;

export type Language = keyof typeof translations;

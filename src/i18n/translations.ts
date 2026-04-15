export const translations = {
  pt: {
    hero: {
      subtitle: "Designer Multidisciplinar",
      desc: "Desde a infância, o contato constante com a arte conduziu à investigação da estética, \ndesdobrando-se, com o tempo, em uma prática estruturada por forma, contraste, ritmo e legibilidade.",
    },
    about: {
      label: "Background",
      section: "SEC.03 // ÁREAS DE ATUAÇÃO",
      text: "Desde a infância, o contato constante com a arte conduziu à investigação da estética, \ndesdobrando-se, com o tempo, em uma prática estruturada por forma, contraste, ritmo e legibilidade.",
      desc: "Ideias que ganham forma através de uma execução técnica e intencional.",
      services: [
        { title: "Design Gráfico", icon: "◎", desc: "Desenvolvo materiais impressos e digitais orientados por estrutura, legibilidade e função." },
        { title: "Social Media", icon: "◇", desc: "Estruturo sistemas visuais para redes, organizando conteúdo por hierarquia, ritmo e repetição." },
        { title: "Branding", icon: "✦", desc: "Construo identidades visuais com base conceitual e aplicação consistente." },
        { title: "UX/UI Design", icon: "□", desc: "Organizo fluxos e interfaces digitais com base em experiência do usuário, navegação e consistência visual." },
      ],
    },
    projects: {
      label: "SEC.02 // PORTFÓLIO",
      titleLine1: "MEUS",
      titleLine2: "PROJETOS",
      desc: "Projetos com coordenação criativa, técnica ou realização integral dos projetos.",
      end: "END_OF_SELECTION",
      items: [
        { title: "EVOLUE", tag: "SOCIAL MEDIA", desc: "Direção de arte e conteúdo digital para marca de suplementação esportiva, com foco em consistência visual e retenção." },
        { title: "SAUVEL", tag: "BRANDING & CAMPANHAS", desc: "Desenvolvimento de identidade promocional e materiais de campanha para o setor farmacêutico, alinhando clareza e posicionamento." },
      ],
    },
    contact: {
      label: "SEC.04 // WORK",
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
    about: {
      label: "Background",
      section: "SEC.03 // CORE EXPERTISE",
      text: "Since childhood, constant contact with art has led me to investigate aesthetics.\nOver time, this focus evolved into practice, structured through form, contrast, rhythm, and legibility.",
      desc: "Ideas taking shape through precise, intentional execution.",
      services: [
        { title: "Graphic Design", icon: "◎", desc: "I develop print and digital materials guided by structure, legibility, and function." },
        { title: "Social Media", icon: "◇", desc: "I structure visual systems for networks, organizing content through hierarchy, rhythm, and repetition." },
        { title: "Branding", icon: "✦", desc: "I build visual identities with a conceptual base and consistent application." },
        { title: "UX/UI Design", icon: "□", desc: "I organize digital flows and interfaces based on user experience, navigation, and visual consistency." },
      ],
    },
    projects: {
      label: "SEC.02 // PORTFOLIO",
      titleLine1: "MY",
      titleLine2: "PROJECTS",
      desc: "Projects involving creative coordination, technical execution, or full production.",
      end: "END_OF_SELECTION",
      items: [
        { title: "EVOLUE", tag: "SOCIAL MEDIA", desc: "Art direction and digital content for a sports supplementation brand, focused on visual consistency and retention." },
        { title: "SAUVEL", tag: "BRANDING & CAMPAIGNS", desc: "Development of promotional identity and campaign materials for the pharmaceutical sector, aligning clarity and positioning." },
      ],
    },
    contact: {
      label: "SEC.04 // WORK",
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

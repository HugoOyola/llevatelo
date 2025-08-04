// Sistema de espaciado basado en una escala de 4px
export const spacing = {
  // Espaciado base
  xs: 4,     // 4px
  sm: 8,     // 8px
  md: 16,    // 16px
  lg: 24,    // 24px
  xl: 32,    // 32px
  '2xl': 48, // 48px
  '3xl': 64, // 64px
  '4xl': 96, // 96px
  '5xl': 128, // 128px

  // Espaciado específico para casos de uso
  none: 0,
  px: 1,

  // Espaciado para componentes específicos
  component: {
    // Padding interno de botones
    buttonPaddingVertical: 12,
    buttonPaddingHorizontal: 20,
    buttonSmallPaddingVertical: 8,
    buttonSmallPaddingHorizontal: 16,
    buttonLargePaddingVertical: 16,
    buttonLargePaddingHorizontal: 24,

    // Padding de cards
    cardPadding: 16,
    cardPaddingSmall: 12,
    cardPaddingLarge: 20,

    // Márgenes entre elementos
    sectionMargin: 24,
    itemMargin: 8,

    // Espaciado de contenedores
    screenPadding: 20,
    containerPadding: 16,

    // Espaciado de listas
    listItemSpacing: 12,
    listSectionSpacing: 20,

    // Espaciado de formularios
    inputSpacing: 16,
    formGroupSpacing: 20,
  },

  // Espaciado para layout responsivo
  responsive: {
    small: {
      screenPadding: 16,
      sectionSpacing: 20,
    },
    medium: {
      screenPadding: 20,
      sectionSpacing: 24,
    },
    large: {
      screenPadding: 24,
      sectionSpacing: 32,
    },
  },
};

// Radios de borde
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,

  // Radios específicos para componentes
  component: {
    button: 8,
    buttonSmall: 6,
    buttonLarge: 12,
    card: 12,
    input: 8,
    modal: 16,
    image: 8,
    avatar: 9999,
  },
};

// Tamaños estándar
export const sizes = {
  // Tamaños de iconos
  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
  },

  // Tamaños de avatares
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    '2xl': 80,
    '3xl': 96,
  },

  // Tamaños de botones
  button: {
    height: {
      small: 32,
      medium: 44,
      large: 52,
    },
    minWidth: {
      small: 64,
      medium: 80,
      large: 96,
    },
  },

  // Tamaños de inputs
  input: {
    height: {
      small: 36,
      medium: 44,
      large: 52,
    },
  },

  // Tamaños de contenedores
  container: {
    maxWidth: 400, // Para móviles
  },
};

// Sombras
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};
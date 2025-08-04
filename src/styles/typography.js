export const typography = {
  // Tamaños de fuente
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Familias de fuentes
  fonts: {
    heading: 'Raleway-SemiBold',
    body: 'Quicksand-Regular',
    system: 'System',
  },

  // Pesos de fuente (si usas diferentes variantes)
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Alturas de línea absolutas
  lineHeights: {
    tight: 16,
    normal: 20,
    relaxed: 24,
    loose: 28,
  },

  // Espaciado entre letras
  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
    widest: 1,
  },

  // Estilos predefinidos
  // Títulos
  styles: {
    h1: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: -0.5,
    },
    h2: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 30,
      lineHeight: 38,
      letterSpacing: -0.25,
    },
    h3: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    h4: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0,
    },
    h5: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 18,
      lineHeight: 26,
      letterSpacing: 0,
    },
    h6: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },

    // Cuerpo
    body: {
      fontFamily: 'Quicksand-Regular',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodySmall: {
      fontFamily: 'Quicksand-Regular',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
    },
    bodyLarge: {
      fontFamily: 'Quicksand-Regular',
      fontSize: 18,
      lineHeight: 28,
      letterSpacing: 0,
    },

    // Subtítulos y etiquetas
    subtitle: {
      fontFamily: 'Quicksand-Regular',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.25,
    },
    caption: {
      fontFamily: 'Quicksand-Regular',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
    },

    // Botones
    button: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 16,
      lineHeight: 22,
      letterSpacing: 0.5,
    },
    buttonSmall: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    buttonLarge: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0.5,
    },

    // Elementos especiales
    overline: {
      fontFamily: 'Raleway-SemiBold',
      fontSize: 10,
      lineHeight: 14,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
  },
};

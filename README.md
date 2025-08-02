# Llévatelo 🛒

Una aplicación móvil de e-commerce desarrollada con React Native y Expo, especializada en productos geek y tecnológicos.

## 📱 Descripción

Llévatelo es una aplicación de comercio electrónico que permite a los usuarios explorar, buscar y comprar productos tecnológicos, gadgets, consolas, comics, coleccionables y más. La app ofrece una experiencia de usuario intuitiva con navegación por categorías, búsqueda avanzada, carrito de compras y gestión de perfil.

## ✨ Características Principales

### 🏠 Pantalla Principal
- Banner de bienvenida personalizado
- Navegación por categorías con iconos
- Secciones de productos: Ofertas Especiales, Lo Más Nuevo, Productos Destacados
- Vista horizontal de productos con scroll

### 📂 Categorías
- 7 categorías principales: Gadgets, Consolas, Comics, Coleccionables, Hardware, Ropa & Accesorios, Eventos
- Vista en cuadrícula con diseño atractivo
- Filtrado de productos por categoría

### 🔍 Búsqueda
- Búsqueda en tiempo real
- Historial de búsquedas recientes
- Sugerencias de búsquedas populares
- Resultados en vista de cuadrícula

### 🛒 Carrito de Compras
- Gestión completa del carrito
- Resumen de pedido con métodos de entrega
- Múltiples opciones de pago
- Confirmación de pedido

### 👤 Perfil de Usuario
- Información personal del usuario
- Programa de fidelidad con puntos
- Gestión de pedidos y direcciones
- Configuraciones de la app

### 📱 Navegación
- Navigation tabs en la parte inferior
- Stack navigation para pantallas anidadas
- Header personalizado con navegación hacia atrás
- Acceso rápido al carrito desde el header

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma de desarrollo y despliegue
- **React Navigation** - Navegación entre pantallas
- **React Native Vector Icons** - Iconografía
- **Expo Font** - Fuentes personalizadas

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── cards/          # Tarjetas de productos y categorías
│   ├── common/         # Componentes comunes (Header, Banner, etc.)
│   └── forms/          # Formularios
├── data/               # Datos estáticos y mocks
│   ├── categories.json # Categorías de productos
│   ├── products.json   # Catálogo de productos
│   └── data.js         # Datos del carrito y configuraciones
├── navigation/         # Configuración de navegación
│   ├── TabNavigator.js # Navegación principal por tabs
│   ├── *StackNavigator.js # Stacks de navegación por sección
│   └── RootStackNavigator.js # Navegador raíz
├── screens/            # Pantallas de la aplicación
│   ├── main/          # Pantallas principales
│   ├── search/        # Pantallas de búsqueda
│   ├── categories/    # Pantallas de categorías
│   ├── profile/       # Pantallas de perfil
│   ├── cart/          # Pantallas del carrito
│   └── favorites/     # Pantallas de favoritos
├── styles/            # Estilos globales
│   └── colors.js      # Paleta de colores
└── utils/             # Utilidades y helpers
    ├── categorias.js  # Funciones para categorías
    ├── precio.js      # Formateo de precios
    ├── stock.js       # Gestión de stock
    └── normalizarProductos.js # Normalización de datos
```

## 🎨 Paleta de Colores

```javascript
// Colores principales
primary: '#FF6B35'        // Naranja vibrante
primaryDark: '#E55A2B'    // Naranja oscuro
primaryLight: '#FF8A5B'   // Naranja claro

// Colores secundarios
secondary: '#2D3748'      // Azul grisáceo oscuro
accent: '#38B2AC'         // Verde azulado

// Estados
success: '#48BB78'        // Verde éxito
warning: '#ED8936'        // Amarillo advertencia
error: '#F56565'          // Rojo error
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil con Expo Go o emulador

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/llevatelo.git
cd llevatelo
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Iniciar el proyecto**
```bash
npm start
# o
yarn start
# o
expo start
```

4. **Ejecutar en dispositivo**
- Escanea el código QR con Expo Go (Android/iOS)
- O ejecuta en emulador con `expo start --android` o `expo start --ios`

## 📦 Dependencias Principales

```json
{
  "@react-navigation/bottom-tabs": "^7.4.4",
  "@react-navigation/native": "^7.1.16",
  "@react-navigation/native-stack": "^7.3.23",
  "expo": "~53.0.20",
  "expo-font": "~13.3.2",
  "react": "19.0.0",
  "react-native": "0.79.5",
  "react-native-vector-icons": "^10.3.0"
}
```

## 🗂️ Funcionalidades por Pantalla

### HomeScreen
- [`src/screens/main/HomeScreen.js`](src/screens/main/HomeScreen.js)
- Banner de bienvenida
- Navegación por categorías
- Secciones de productos filtrados

### SearchScreen
- [`src/screens/search/SearchScreen.js`](src/screens/search/SearchScreen.js)
- Búsqueda en tiempo real
- Historial y sugerencias

### ProductDetailScreen
- [`src/screens/main/ProductDetailScreen.js`](src/screens/main/ProductDetailScreen.js)
- Información detallada del producto
- Selector de cantidad
- Botón de agregar al carrito

### CartScreen
- [`src/screens/cart/CartScreen.js`](src/screens/cart/CartScreen.js)
- Gestión del carrito
- Resumen de compra
- Flujo de checkout

### ProfileScreen
- [`src/screens/profile/ProfileScreen.js`](src/screens/profile/ProfileScreen.js)
- Información del usuario
- Programa de fidelidad
- Configuraciones

## 🔧 Utilidades

### Gestión de Precios
- [`formatearPrecio`](src/utils/precio.js) - Formateo de precios en soles peruanos
- [`calcularPrecioFinal`](src/utils/precio.js) - Cálculo de precios con descuento

### Gestión de Stock
- [`esProductoDisponible`](src/utils/stock.js) - Verificación de disponibilidad

### Normalización de Datos
- [`normalizarProductos`](src/utils/normalizarProductos.js) - Procesamiento de datos de productos
- [`normalizarCategoria`](src/utils/categorias.js) - Formateo de nombres de categorías

## 📱 Navegación

La aplicación utiliza React Navigation v6 con:

- **Bottom Tab Navigator** - Navegación principal
- **Stack Navigators** - Para cada sección (Main, Categories, Search, Profile, Cart)
- **Root Stack Navigator** - Navegador principal que contiene tabs y modales

## 🎯 Próximas Funcionalidades

- [ ] Autenticación de usuarios
- [ ] Integración con API real
- [ ] Sistema de favoritos funcional
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Múltiples idiomas
- [ ] Integración con pasarelas de pago
- [ ] Sistema de reseñas y calificaciones

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ve el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- Expo team por la excelente plataforma de desarrollo
- React Navigation por la solución de navegación
- Comunidad de React Native por el soporte continuo

---

⭐ ¡No olvides dar una estrella al proyecto si te gustó!
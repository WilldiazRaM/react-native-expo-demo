# React Native Expo Demo

Una aplicación móvil desarrollada con **React Native** y **Expo**, como ejemplo inicial para explorar el desarrollo multiplataforma con JavaScript y componentes nativos.

## 🚀 Propósito

Esta app sirve como proyecto base para comenzar a desarrollar aplicaciones móviles usando **Expo**. Ideal para quienes están aprendiendo desarrollo móvil con React Native.

## 📦 Tecnologías utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- JavaScript (ES6+)

## 📁 Estructura del proyecto

```
.
hello-world/
├── .expo/
├── .gitignore
├── App.js
├── app.json
├── assets/
├── index.js
├── node_modules/
├── package-lock.json
├── package.json
├── readme.md
└── src/
    ├── screen/
    │   └── RegisterScreen.js
    └── utils/
        └── api.js

```

## ✅ Requisitos previos

- Node.js (https://nodejs.org)
- Expo CLI: `npm install -g expo-cli`
- Git instalado

## 🧰 Configuración del entorno y ejecución

Sigue estos pasos para clonar y ejecutar correctamente esta aplicación React Native con Expo:

### 1. Clonar el repositorio

```bash
git clone git@github.com:WilldiazRaM/react-native-expo-demo.git
cd react-native-expo-demo
```

### 2. Instalar Node.js

Asegúrate de tener **Node.js** instalado. Puedes descargarlo desde:

👉 https://nodejs.org

Para verificar que está instalado correctamente:

```bash
node -v
npm -v
```

### 3. Instalar Expo CLI

Expo CLI es una herramienta que facilita el desarrollo con React Native.

```bash
npm install -g expo-cli
```

Verifica que se instaló correctamente:

```bash
expo --version
```

### 4. Instalar dependencias del proyecto

Con el repositorio ya clonado, instala las dependencias del proyecto con:

```bash
npm install
```

Esto descargará todas las dependencias indicadas en el `package.json`.

### 5. Iniciar la app

Una vez instaladas las dependencias, puedes iniciar la app con:

```bash
npx expo start
```

Esto abrirá el **Metro Bundler** en tu navegador.

### 6. Visualizar la app

Tienes varias opciones para probar la aplicación:

- 📱 **Expo Go (Android/iOS):** Escanea el código QR desde la app [Expo Go](https://expo.dev/client).
- 🤖 **Emulador Android:** Si tienes un emulador configurado, puedes correr:

  ```bash
  npm run android
  ```

- 🍏 **Simulador iOS (solo macOS):**

  ```bash
  npm run ios
  ```

- 🌐 **Navegador Web:**

  ```bash
  npm run web
  ```

---

## 🔍 Dependencias principales

Estas son algunas de las librerías utilizadas:

- `axios`: Peticiones HTTP
- `react-native-paper`: Componentes UI modernos
- `@react-native-picker/picker`: Selectores nativos
- `react-native-vector-icons`: Iconos escalables
- `expo-status-bar`: Manejo de la barra de estado

---

✅ ¡Con esto ya deberías tener la app corriendo en tu entorno local!

4. **Escanea el QR** con la app **Expo Go** en tu celular para ver la app en acción.

## 🛠️ Scripts disponibles

- `npm start`: Inicia el servidor de desarrollo (abre Metro Bundler).
- `npm run android`: Ejecuta la app en un emulador Android (si está disponible).
- `npm run ios`: Ejecuta la app en simulador iOS (solo macOS).

## 📚 Cursos Recomendados de React Native

A continuación, una lista de cursos útiles para aprender y mejorar tus habilidades en React Native:

- [📱 React Native con Expo desde Cero (Udemy)](https://www.udemy.com/course/react-native-expo-desde-cero/)
  - Aprende a crear aplicaciones móviles multiplataforma con Expo y React Native.
  - Incluye temas como navegación, consumo de API y publicación en tiendas.

- [⚛️ The Complete React Native + Hooks Course [2024] (Udemy)](https://www.udemy.com/course/the-complete-react-native-and-redux-course/)
  - Curso avanzado que cubre React Native con Hooks y manejo de estado.
  - Ideal para quienes quieren construir apps complejas.

- [🚀 React Native Fundamentals (freeCodeCamp - YouTube)](https://www.youtube.com/watch?v=0-S5a0eXPoc)
  - Curso gratuito ideal para principiantes que quieran entender los fundamentos.
  - Cubre instalación, componentes, props, state, y navegación.

- [📦 Documentación Oficial de React Native](https://reactnative.dev/docs/getting-started)
  - La fuente más confiable para aprender sobre todos los aspectos de React Native.
  - Actualizada con cada versión estable del framework.

> 🔗 ¡Recuerda practicar lo aprendido creando tus propias aplicaciones!


## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.

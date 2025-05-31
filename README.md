React Native CRUD App - Investigación de Frameworks Móviles

Aplicación móvil desarrollada en React Native (Expo) como parte del proyecto de investigación del curso "Diseño y Programación de Plataformas Móviles - I Ciclo 2025".  
El objetivo es demostrar las capacidades de React Native mediante un CRUD completo, pruebas automáticas y configuración de integración continua con GitHub Actions.

---

Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- Node.js v18+
- Expo CLI
- Git
- Un emulador Android o un dispositivo físico con Expo Go
- Una cuenta de GitHub

---

Instalación del proyecto

1. Cloná el repositorio:

git clone https://github.com/tu-usuario/react-native-crud-app.git
cd react-native-crud-app

2. Instalá las dependencias:

npm install

(Si tenés conflictos de dependencias, ejecutá: npm install --legacy-peer-deps)

3. Configurá el entorno:

Crea un archivo llamado `.env` en la raíz del proyecto y pegá lo siguiente:

API_KEY=AIzaSyDlN77VExGgPTSkee3FuZaD3CST_xY3XS4  
AUTH_DOMAIN=crud-reatc-native.firebaseapp.com  
PROJECT_ID=crud-reatc-native  
STORAGE_BUCKET=crud-reatc-native.firebasestorage.app  
MESSAGING_SENDER_ID=671071466908  
APP_ID=1:671071466908:web:d696282ab3858c66c90459  
MEASUREMENT_ID=G-3KTZR3V7LF  

---

Ejecutar la aplicación localmente

npm run start

Luego escaneá el código QR con la app Expo Go en tu teléfono o presioná "a" para abrir en un emulador Android.

---

Pruebas Automáticas

Este proyecto incluye pruebas unitarias para las operaciones del CRUD usando Jest y Testing Library.

Para correrlas:

npm test

---

Integración Continua (CI) con GitHub Actions

Se incluye un flujo de trabajo en `.github/workflows/test.yml` que:

- Ejecuta `npm install`
- Corre `npm test` en cada push o pull request a la rama `master`

Esto asegura que todas las pruebas pasen antes de hacer merge.

---

Video Tutorial

Disponible en YouTube:  
https://youtu.be/LfBkcPihgTk

---

Integrantes del Grupo

- Darlen Javier Diaz Urbina  
- Gonzalo Dormos Rodríguez  
- Gerald Calderón Castillo
- Kevin Abel Venegas Bermúdez  

---

Rama principal

El repositorio utiliza la rama `master` como rama principal.

---

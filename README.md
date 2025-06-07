---

# Welcome to your Expo app 

This is an Expo project created with `create-expo-app`.

---

##  React Native CRUD App

This mobile app was developed in **React Native (Expo)** as part of the research project for the course **"Design and Programming of Mobile Platforms – First Semester 2025"**.

The goal is to demonstrate the capabilities of React Native through a full CRUD implementation, automated testing, and continuous integration using GitHub Actions.

---

##  Get Started

### Prerequisites

Before starting, make sure you have the following installed:

* Node.js v18+
* Expo CLI
* Git
* An Android emulator or a physical device with Expo Go
* A GitHub account

---

###  Project Installation

Clone the repository:

```bash
git clone https://github.com/Kevin7819/CrudReactNative.git

Or

git clone https://github.com/"YOURUSERNAME"/CrudReactNative.git

cd CrudReactNative
```

Install dependencies:

```bash
npm install
```

> If you experience dependency conflicts:

```bash
npm install --legacy-peer-deps
```

---

###  Configure Environment

Create a `.env` file in the root directory and add the following:

```env
API_KEY=AIzaSyDlN77VExGgPTSkee3FuZaD3CST_xY3XS4
AUTH_DOMAIN=crud-reatc-native.firebaseapp.com
PROJECT_ID=crud-reatc-native
STORAGE_BUCKET=crud-reatc-native.firebasestorage.app
MESSAGING_SENDER_ID=671071466908
APP_ID=1:671071466908:web:d696282ab3858c66c90459
MEASUREMENT_ID=G-3KTZR3V7LF
```

---

###  Run the App

Start the development server:

```bash
npm run start
```

Then:

* Scan the QR code using the **Expo Go** app on your device
* Or press `a` to open it in the **Android emulator**

Alternatively, run:

```bash
npx expo start
```

In the output, you’ll find options to open the app in:

* a **development build**
* **Android emulator**
* **iOS simulator**
* **Expo Go**, a limited sandbox for trying out app development with Expo

You can begin development by editing files inside the `app` directory.
This project uses **file-based routing**.

---

###  Get a Fresh Project

When you're ready, you can reset the project by running:

```bash
npm run reset-project
```

This will move the starter code to the `app-example` directory and create a blank `app` directory where you can start fresh.

---

##  Automated Testing

This project includes unit tests for the CRUD operations using **Jest** and **React Native Testing Library**.

To run the tests:

```bash
npm test
```

---

##  Continuous Integration (CI) with GitHub Actions

A GitHub Actions workflow is included at:

```
.github/workflows/test.yml
```

This CI flow:

* Runs `npm install`
* Runs `npm test` on every **push** or **pull request** to the `master` branch

This ensures all tests pass before merging.

---

##  Learn More

* [Expo Documentation](https://docs.expo.dev/): Learn the fundamentals or explore advanced topics
* [Learn Expo Tutorial](https://docs.expo.dev/learn/): Follow a step-by-step guide to build apps for Android, iOS, and the web

---

##  Join the Community

* [Expo on GitHub](https://github.com/expo/expo): View and contribute to the open-source platform
* [Expo Discord Community](https://discord.gg/expo): Chat with other Expo developers and ask questions

---

##  Video Tutorial

Watch the full tutorial on YouTube:
[https://youtu.be/LfBkcPihgTk](https://youtu.be/LfBkcPihgTk)

---

##  Team Members

* Darlen Javier Diaz Urbina
* Gonzalo Dormos Rodríguez
* Gerald Calderón Castillo
* Kevin Abel Venegas Bermúdez

---

##  Main Branch

The repository uses the `master` branch as the main branch.

---

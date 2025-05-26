import React, { useState } from "react";
import { View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import CreateScreen from "./src/screens/CreateScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = (screen, item = null) => {
    setSelectedItem(item);
    setCurrentScreen(screen);
  };

  return (
    <View style={{ flex: 1 }} testID="app-container">
      {currentScreen === "home" && (
        <HomeScreen 
          navigate={navigate}
          testID="home-screen" 
        />
      )}
      {currentScreen === "create" && (
        <CreateScreen 
          navigate={navigate}
          testID="create-screen"
        />
      )}
    </View>
  );
}
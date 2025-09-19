import { Stack } from "expo-router";
import { ThemeProvider } from "nativewind";
import { StatusBar } from "react-native";
import ThemeToggle from "../components/ThemeToggle";
import "../global.css";

export default function RootLayout() {
  return (
  <ThemeProvider>
      <StatusBar barStyle="light-content" />
  <Stack  screenOptions={{headerShown:true, headerRight: () => <ThemeToggle />, tabBarActiveTintColor: 'rgb(233 89 0)', tabBarInactiveTintColor: 'gray',  tabBarStyle: { paddingBottom:'20%', paddingTop:'10%',  backgroundColor: 'black' }, tabBarLabelStyle:{ fontSize: 14, fontWeight: 'bold'  }}}>
        
      
    </Stack>
      
     
    </ThemeProvider>

  )
}

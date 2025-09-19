// import { Stack } from "expo-router";
// import { ThemeProvider } from "nativewind";
// import { StatusBar } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import ThemeChange from "../components/themeToggle";
// import "../global.css";

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>

//   <ThemeProvider>
//       <StatusBar barStyle="light-content" />
//   
        
      
//     </Stack>
      
     
//     </ThemeProvider>
//     </SafeAreaProvider>

//   )
// }




import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeToggle from "../components/themeToggle";
import "../global.css";
export default function RootLayout() {
    return (
    <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        
          <Stack initialRouteName="Home"  screenOptions={{headerShown:true, headerRight: () => <ThemeToggle />, tabBarActiveTintColor: 'rgb(233 89 0)', tabBarInactiveTintColor: 'gray',  tabBarStyle: { paddingBottom:'20%', paddingTop:'10%',  backgroundColor: 'black' }, tabBarLabelStyle:{ fontSize: 14, fontWeight: 'bold'  }}} />
    </SafeAreaProvider>
  );
}



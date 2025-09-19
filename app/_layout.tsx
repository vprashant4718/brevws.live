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
import { useColorScheme } from "nativewind";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeToggle from "../components/themeToggle";
import "../global.css";
export default function RootLayout() {
  const { colorScheme } = useColorScheme();

    return (
    <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        
           <Stack 
        screenOptions={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff", // dark:bg-gray-800
          },
          headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
          headerTitleStyle: {
            color: colorScheme === "dark" ? "#ffffff" : "#000000",
          },
          headerRight: () => <ThemeToggle />,
        }}/>
    </SafeAreaProvider>
  );
}



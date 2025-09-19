import { Stack } from "expo-router";
import "../global.css";
export default function RootLayout() {
  return (
  
  <Stack  screenOptions={{headerShown:false, tabBarActiveTintColor: 'rgb(233 89 0)', tabBarInactiveTintColor: 'gray',  tabBarStyle: { paddingBottom:'20%', paddingTop:'1%', backgroundColor: 'black' }, tabBarLabelStyle:{ fontSize: 14, fontWeight: 'bold'  }}}>
        
      
    </Stack>

  )
}

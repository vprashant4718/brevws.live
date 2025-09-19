import { ThemeProvider } from "nativewind";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" />
      {/* Your navigation goes here */}
    </ThemeProvider>
  );
}

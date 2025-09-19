import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      <AntDesign
        name={colorScheme === "dark" ? "sun" : "moon"}
        size={22}
        color={colorScheme === "dark" ? "white" : "black"}
      />
    </TouchableOpacity>
  );
}

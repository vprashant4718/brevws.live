import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity } from "react-native";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      <Text className="text-black dark:text-white">
        {colorScheme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </Text>
    </TouchableOpacity>
  );
}

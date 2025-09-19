import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity } from "react-native";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      <Ant
        {colorScheme === "dark" ? "☀️ light" : "🌙 Dark"}
      </Text>
    </TouchableOpacity>
  );
}

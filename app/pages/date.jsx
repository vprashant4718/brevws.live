// import { useState } from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// export default function DueDatePicker() {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [dueDate, setDueDate] = useState(new Date());

//   const showDatePicker = () => setDatePickerVisibility(true);
//   const hideDatePicker = () => setDatePickerVisibility(false);

//   const handleConfirm = (date) => {
//     setDueDate(date);
//     hideDatePicker();
//   };

//   return (
//     <View className="p-4">
//       <Text className="text-lg mb-2">Due Date: {dueDate.toDateString()}</Text>

//       <TouchableOpacity
//         className="bg-purple-700 px-4 py-3 rounded-lg"
//         onPress={showDatePicker}
//       >
//         <Text className="text-white text-center">Select Due Date</Text>
//       </TouchableOpacity>

//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </View>
//   );
// }

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function InvoicePage() {
  const [step, setStep] = useState(1);

  // States for invoice fields
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerField, setPickerField] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // Step Navigation
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const [currency, setCurrency] = useState("USD ($)");
  const [items, setItems] = useState([
    { description: "", quantity: "1", price: "0", tax: "0", total: "0" },
  ]);
  const [notes, setNotes] = useState("");

  // Update Item
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    const qty = parseFloat(updated[index].quantity) || 0;
    const price = parseFloat(updated[index].price) || 0;
    const tax = parseFloat(updated[index].tax) || 0;
    const subtotal = qty * price;
    const total = subtotal + (subtotal * tax) / 100;
    updated[index].total = total.toFixed(2);

    setItems(updated);
  };

  // Add/Delete Item
  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: "1", price: "0", tax: "0", total: "0" },
    ]);
  };

  const deleteItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // Preview + Download (stub functions)
  const previewInvoice = () => {
    console.log("Preview Invoice:", { currency, items, notes });
  };

  const downloadPDF = () => {
    console.log("Download as PDF:", { currency, items, notes });
  };

  return (
    <ScrollView
      className="flex-1 bg-white w-full dark:bg-black"
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header Section */}
      { step === 1 || step === 2 || step === 6 &&<View className="flex-row items-center mb-20 mt-32 bg-white rounded-xl p-4 shadow">
        <Icon
          name="file-document-outline"
          size={30}
          color="#8a2be2"
          className="mr-3"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            Create Your Professional{" "}
            <Text className="text-purple-600">Invoice</Text> with our free{" "}
            <Text className="text-purple-600">Invoice Template</Text>
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            Transform your billing into a beautiful, professional experience
          </Text>
        </View>
      </View>}

      {/* STEP 1: Business Info */}
      {step === 1 && (
        <View>
          <Text className="text-lg text-center font-semibold mb-8 dark:text-white">
            From (Your Business)
          </Text>
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Business Name
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter business name"
            value={businessName}
            onChangeText={setBusinessName}
          />
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Business Email
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter business Email"
            value={businessEmail}
            onChangeText={setBusinessEmail}
          />

          <Text className="text-xl font-semibold mb-2 dark:text-white">
            Business Address
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter business address"
            value={businessAddress}
            onChangeText={setBusinessAddress}
            
          />
        </View>
      )}

      {/* STEP 2: Client Info */}
      {step === 2 && (
        <View>
          <Text className="text-xl text-center font-semibold mb-8 dark:text-white">
            Bill (To Client)
          </Text>
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Client Name
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter client name"
            value={clientName}
            onChangeText={setClientName}
          />

          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Client Email
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter client email"
            value={clientEmail}
            onChangeText={setClientEmail}
          />
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Client Address
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter client Address"
            value={clientAddress}
            onChangeText={setClientAddress}
          />
        </View>
      )}

      {/* STEP 3: Invoice Details */}
      {step === 3 && (
        <View>
          <Text className="text-xl text-center font-semibold mb-8 dark:text-white">
            Invoice Details
          </Text>
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Invoice Number
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter invoice number"
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
          />

          <TouchableOpacity
            onPress={() => {
              setPickerField("issue");
              setShowPicker(true);
            }}
            className="border p-3 rounded-lg mb-4 dark:border-gray-600"
          >
            <Text className="dark:text-white">
              Issue Date: {issueDate.toDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPickerField("due");
              setShowPicker(true);
            }}
            className="border p-3 rounded-lg mb-4 dark:border-gray-600"
          >
            <Text className="dark:text-white">
              Due Date: {dueDate.toDateString()}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={pickerField === "issue" ? issueDate : dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) {
                  pickerField === "issue"
                    ? setIssueDate(selectedDate)
                    : setDueDate(selectedDate);
                }
              }}
            />
          )}
        </View>
      )}

      {/* STEP 4: Items */}
      {step === 4 && (
        <View className="mb-20">
          {/* Currency */}
          <Text className="text-xl text-center font-semibold mb-8 dark:text-white">
            Items
          </Text> 
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Currency
          </Text>
          <View className="border rounded-lg mb-4 dark:border-gray-600">
            <Picker
              selectedValue={currency}
              onValueChange={(val) => setCurrency(val)}
              style={{ height: 50 }}
            >
              <Picker.Item label="INR (₹)" value="INR" />
              <Picker.Item label="USD ($)" value="USD" />
              <Picker.Item label="EUR (€)" value="EUR" />
              <Picker.Item label="GBP (£)" value="GBP" />
            </Picker>
          </View>

          {/* Add Item Button */}
          <TouchableOpacity
            onPress={addItem}
            className="border border-dashed border-purple-600 py-3 rounded-lg mb-4"
          >
            <Text className="text-purple-700 font-semibold text-center">
              + Add Item
            </Text>
          </TouchableOpacity>

          {/* Items List */}
          {items.map((item, index) => (
            <View
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4 shadow-sm"
            >
                <Text className='font-semibold text-sm mb-1'>Description:</Text>
              <TextInput
                className="border p-3 rounded-lg mb-3 dark:text-white dark:border-gray-600"
                placeholder="Description"
                value={item.description}
                onChangeText={(text) => updateItem(index, "description", text)}
              />

              {/* Quantity + Price */}
              <View className="flex-row justify-between">
                <View className="w-[48%]">
                    <Text className='font-semibold text-sm mb-1'>Quantity:</Text>
                  <TextInput
                    className="border p-3 rounded-lg mb-3 dark:text-white dark:border-gray-600"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChangeText={(text) => updateItem(index, "quantity", text)}
                    keyboardType="numeric"
                  />
                </View>
                <View className="w-[48%]">
                    <Text className='font-semibold text-sm mb-1'>Price:</Text>
                  <TextInput
                    className="border p-3 rounded-lg mb-3 dark:text-white dark:border-gray-600"
                    placeholder="Price"
                    value={item.price}
                    onChangeText={(text) => updateItem(index, "price", text)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Tax + Total */}
              <View className="flex-row justify-between items-center">
                <View className="w-[48%]">
                    <Text className='font-semibold text-sm mb-1'>Tax(%):</Text>
                  <TextInput
                    className="border p-3 rounded-lg mb-3 dark:text-white dark:border-gray-600"
                    placeholder="Tax %"
                    value={item.tax}
                    onChangeText={(text) => updateItem(index, "tax", text)}
                    keyboardType="numeric"
                  />
                </View>
                <View className="w-[48%] bg-purple-100 p-3 rounded-lg mb-3">
                  <Text className="text-purple-700 font-semibold">
                    Total: {currency} {item.total}
                  </Text>
                </View>
              </View>

              {/* Delete Item Button */}
              <TouchableOpacity
                onPress={() => deleteItem(index)}
                className="bg-red-500 py-3 rounded-lg"
              >
                <Text className="text-center text-white font-semibold">
                  Delete Item
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Notes */}
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Notes (Optional)
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Payment terms, thank you message, etc."
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          {/* Buttons */}
          <View className="flex-row justify-between mt-6">
            {/* <TouchableOpacity
              className="bg-gray-400 px-6 py-4 rounded-lg"
              onPress={prevStep}
            >
              <Text className="text-white font-semibold">Back</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              className="bg-blue-600 px-6 py-4 rounded-lg"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white font-semibold">Preview</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-purple-700 px-6 py-4 rounded-lg"
              onPress={downloadPDF}
            >
              <Text className="text-white font-semibold">Download PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Navigation Buttons */}
      <View className="flex-row justify-between mt-6">
        {step > 1 && (
          <TouchableOpacity
            className="bg-gray-400 px-6 py-3 rounded-lg"
            onPress={prevStep}
          >
            <Text className="text-white font-semibold">Back</Text>
          </TouchableOpacity>
        )}
        {step < 4 && (
          <TouchableOpacity
            className="bg-purple-700 px-6 py-3 rounded-lg ml-auto"
            onPress={nextStep}
          >
            <Text className="text-white font-semibold">Next</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text className="text-xl font-bold text-center  mt-6 dark:text-white">
        Step {step} of 4
      </Text>

      {/* Brevws Branding */}
      <View className="mt-12 items-center">
        <Image
          source={require("../../assets/images/brewvs.png")} // <- put logo here
          style={{ width: 120, height: 40, resizeMode: "contain" }}
        />
        <Text className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          Powered by Brevws
        </Text>
      </View>


      {/* modal  */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View className="flex-1 justify-center items-center bg-black/50">
    <View className="bg-white dark:bg-gray-900 w-[90%] max-h-[85%] p-6 rounded-2xl shadow-lg">
      <ScrollView>
        {/* Invoice Header */}
        <View className="flex-row justify-between items-start mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-800 dark:text-white">Invoice</Text>
            <Text className="text-xs truncate line-clamp-2 text-gray-500 dark:text-gray-400 mt-1">
              Generated by brewvs.live
            </Text>
            <Text className="text-xs truncate line-clamp-2 text-gray-500 dark:text-gray-400 mt-1">
              Professional Invoice Generator
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-sm text-gray-600 dark:text-gray-300">
              <Text className="font-semibold">Invoice #:</Text> {invoiceNumber || "INV-001"}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-300">
              <Text className="font-semibold">Date:</Text> {issueDate.toDateString()}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-300">
              <Text className="font-semibold">Due Date:</Text> {dueDate.toDateString()}
            </Text>
          </View>
        </View>

        {/* From & Bill To */}
        <View className="flex-row justify-between mb-6">
          <View className="w-[48%]">
            <Text className="font-semibold text-gray-700 dark:text-gray-200 mb-1">FROM</Text>
            <Text className="text-gray-800 dark:text-white font-semibold">
              {businessName || "Your Business Name"}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">{ businessEmail || "your@email.com"} </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">{businessAddress || "Your Business Address"}</Text>
          </View>
          <View className="w-[48%]">
            <Text className="font-semibold text-gray-700 dark:text-gray-200 mb-1">BILL TO</Text>
            <Text className="text-gray-800 dark:text-white font-semibold">
              {clientName || "Client Name"}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">{ clientEmail ||"client@email.com"} </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">{ clientAddress || "Client Address"}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View className="border rounded-lg overflow-hidden mb-4">
          {/* Table Header */}
          <View className="flex-row bg-gray-100 dark:bg-gray-800 p-2">
            <Text className="flex-1 font-semibold text-gray-700 dark:text-gray-200">DESCRIPTION</Text>
            <Text className="w-12 font-semibold text-gray-700 dark:text-gray-200 text-center">QTY</Text>
            <Text className="w-16 font-semibold text-gray-700 dark:text-gray-200 text-center">PRICE</Text>
            <Text className="w-16 font-semibold text-gray-700 dark:text-gray-200 text-center">TAX %</Text>
            <Text className="w-20 font-semibold text-gray-700 dark:text-gray-200 text-center">AMOUNT</Text>
          </View>

          {/* Table Rows */}
          {items.map((item, i) => (
            <View key={i} className="flex-row border-t border-gray-300 dark:border-gray-700 p-2">
              <Text className="flex-1 text-gray-700 dark:text-gray-300">{item.description || "Item"}</Text>
              <Text className="w-12 text-center text-gray-700 dark:text-gray-300">{item.quantity}</Text>
              <Text className="w-16 text-center text-gray-700 dark:text-gray-300">
                {currency} {item.price}
              </Text>
              <Text className="w-16 text-center text-gray-700 dark:text-gray-300">{item.tax}%</Text>
              <Text className="w-20 text-center text-gray-700 dark:text-gray-300">
                {currency} {item.total}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View className="items-end space-y-1">
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">Subtotal:</Text> {currency}{" "}
            {items.reduce((sum, it) => sum + parseFloat(it.price || 0) * parseFloat(it.quantity || 0), 0).toFixed(2)}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300">
            <Text className="font-semibold">Tax:</Text> {currency}{" "}
            {items.reduce(
              (sum, it) => sum + ((parseFloat(it.price || 0) * parseFloat(it.quantity || 0)) * (parseFloat(it.tax || 0) / 100)),
              0
            ).toFixed(2)}
          </Text>
          <View className="border-t border-gray-400 w-full my-1" />
          <Text className="text-lg font-bold text-gray-900 dark:text-white">
            Total: {currency}{" "}
            {items.reduce((sum, it) => sum + parseFloat(it.total || 0), 0).toFixed(2)}
          </Text>
        </View>
      </ScrollView>

      {/* Close Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        className="bg-red-500 mt-6 py-3 rounded-lg"
      >
        <Text className="text-center text-white font-semibold">Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </ScrollView>
  );
}

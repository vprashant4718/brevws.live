import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import * as Print from "expo-print";
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

  const downloadPDF = async() => {
    // console.log("Download as PDF:", { currency, items, notes });
      try {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: left; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background: #f0f0f0; }
            .totals { margin-top: 20px; text-align: right; }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <p><b>Invoice #:</b> ${invoiceNumber || "INV-001"}</p>
          <p><b>Date:</b> ${issueDate.toDateString()}</p>
          <p><b>Due Date:</b> ${dueDate.toDateString()}</p>

          <h3>From:</h3>
          <p>${businessName || "Your Business Name"}<br>
             ${businessEmail || "your@email.com"}<br>
             ${businessAddress || "Your Business Address"}</p>

          <h3>Bill To:</h3>
          <p>${clientName || "Client Name"}<br>
             ${clientEmail || "client@email.com"}<br>
             ${clientAddress || "Client Address"}</p>

          <table>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Tax %</th>
              <th>Amount</th>
            </tr>
            ${items
              .map(
                (it) => `
                <tr>
                  <td>${it.description}</td>
                  <td>${it.quantity}</td>
                  <td>${currency} ${it.price}</td>
                  <td>${it.tax}%</td>
                  <td>${currency} ${it.total}</td>
                </tr>`
              )
              .join("")}
          </table>

          <div class="totals">
            <p><b>Subtotal:</b> ${currency} ${items
              .reduce(
                (sum, it) =>
                  sum + parseFloat(it.price || 0) * parseFloat(it.quantity || 0),
                0
              )
              .toFixed(2)}</p>
            <p><b>Tax:</b> ${currency} ${items
              .reduce(
                (sum, it) =>
                  sum +
                  (parseFloat(it.price || 0) *
                    parseFloat(it.quantity || 0) *
                    (parseFloat(it.tax || 0) / 100)),
                0
              )
              .toFixed(2)}</p>
            <hr />
            <h2>Total: ${currency} ${items
              .reduce((sum, it) => sum + parseFloat(it.total || 0), 0)
              .toFixed(2)}</h2>
          </div>
        </body>
      </html>
    `;

   const { uri } = await Print.printToFileAsync({ html });

    const pdfName = `Invoice_${invoiceNumber || "INV-001"}.pdf`;
    const newPath = FileSystem.documentDirectory + pdfName;

    const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === "granted") {
    const asset = await MediaLibrary.createAssetAsync(newPath);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
    alert("PDF saved to Downloads!");
  } else {
    alert("Permission denied. Cannot save PDF.");
  }



    await FileSystem.copyAsync({ from: uri, to: newPath });

    // Open the file immediately (if device supports)
  //   if (await Sharing.isAvailableAsync()) {
  //     await Sharing.shareAsync(newPath);
  //   } else {
  //     alert(`PDF saved at: ${newPath}`);
  //   }
  } catch (error) {
    console.error("PDF save error:", error);
  }
};





  return (
    <View className="flex-1 bg-white pt-4 dark:bg-black">
    <ScrollView
      className="flex-1 bg-white w-full dark:bg-black"
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header Section */}
      { (step === 1 || step === 2 || step === 3) &&<View className="flex-row items-center mb-6 mt-6 bg-white rounded-xl p-4 shadow-md dark:bg-gray-800">
        <Icon
          name="file-document-outline"
          size={30}
          color="#8a2be2"
          className="mr-3"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white">
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
            placeholderTextColor={"#9CA3AF"}
            value={businessName}
            onChangeText={setBusinessName}
          />
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Business Email
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter business Email"
            placeholderTextColor={"#9CA3AF"}
            value={businessEmail}
            onChangeText={setBusinessEmail}
          />

          <Text className="text-xl font-semibold mb-2 dark:text-white">
            Business Address
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter business address"
            placeholderTextColor={"#9CA3AF"}
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
            placeholderTextColor={"#9CA3AF"}
            value={clientName}
            onChangeText={setClientName}
          />

          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Client Email
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter client email"
            placeholderTextColor={"#9CA3AF"}
            value={clientEmail}
            onChangeText={setClientEmail}
          />
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Client Address
          </Text>
          <TextInput
            className="border p-3 rounded-lg mb-4 dark:text-white dark:border-gray-600"
            placeholder="Enter client Address"
            placeholderTextColor={"#9CA3AF"}
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
            placeholderTextColor={"#9CA3AF"}
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
          />

        <Text className="text-lg font-semibold mb-2 dark:text-white">
            Choose Issue Date
          </Text>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => {
              setPickerField("issue");
              setShowPicker(true);
            }}
            className="border p-3 rounded-lg mb-4 dark:border-gray-600"
          >
            <Text className="dark:text-white">
              {issueDate.toDateString()}
            </Text>
          </TouchableOpacity>
            <Text className="text-lg font-semibold mb-2 dark:text-white">
            Choose Due Date
          </Text>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => {
              setPickerField("due");
              setShowPicker(true);
            }}
            className="border p-3 rounded-lg mb-4 dark:border-gray-600"
          >
            <Text className="dark:text-white">
              {dueDate.toDateString()}
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
        <View className="mb-10">
          {/* Currency */}
          <Text className="text-3xl text-center font-semibold mb-4 dark:text-white">
            Items
          </Text> 
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Currency
          </Text>
          <View className="border rounded-lg mb-4 dark:border-gray-600">
            <Picker
              selectedValue={currency}
              onValueChange={(val) => setCurrency(val)}
              style={{ height: 50, color: 'white'}} // Ensure text is visible in dark mode
            >
              <Picker.Item label="INR (₹)" value="INR" />
              <Picker.Item label="USD ($)" value="USD" />
              <Picker.Item label="EUR (€)" value="EUR" />
              <Picker.Item label="GBP (£)" value="GBP" />
            </Picker>
          </View>

          {/* Add Item Button */}
          <TouchableOpacity activeOpacity={0.7}
            onPress={addItem}
            className="border border-solid border-green-600 py-3 bg-green-600 rounded-lg mb-4"
          >
            <Text className="text-white font-semibold text-center">
              + Add Item
            </Text>
          </TouchableOpacity>

          {/* Items List */}
          {items.map((item, index) => (
            <View
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4 shadow-sm"
            >
                <Text className='font-semibold text-sm mb-2 dark:text-white'>Description:</Text>
              <TextInput
                className="border p-3 rounded-lg mb-3 dark:text-white dark:border-gray-600"
                placeholder="Description"
                placeholderTextColor={"#9CA3AF"}
                value={item.description}
                onChangeText={(text) => updateItem(index, "description", text)}
              />

              {/* Quantity + Price */}
              <View className="flex-row justify-between">
                <View className="w-[48%]">
                    <Text className='font-semibold text-sm mb-1 dark:text-white'>Quantity:</Text>
                  <TextInput
                    className="border p-3 rounded-lg mb-3 dark:text-white dark:border-gray-600"
                    placeholder="Quantity"
                    placeholderTextColor={"#9CA3AF"}
                    value={item.quantity}
                    onChangeText={(text) => updateItem(index, "quantity", text)}
                    keyboardType="numeric"
                  />
                </View>
                <View className="w-[48%]">
                    <Text className='font-semibold text-sm mb-1 dark:text-white'>Price:</Text>
                  <TextInput
                    className="border p-3 rounded-lg mb-3 dark:text-white dark:border-gray-600"
                    placeholder="Price"
                    placeholderTextColor={"#9CA3AF"}
                    value={item.price}
                    onChangeText={(text) => updateItem(index, "price", text)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Tax + Total */}
              <View className="flex-row justify-between items-center">
                <View className="w-[48%]">
                    <Text className='font-semibold text-sm mb-1 dark:text-white'>Tax(%):</Text>
                  <TextInput
                    className="border p-3 rounded-lg mb-3 dark:text-white dark:border-gray-600"
                    placeholder="Tax %"
                    placeholderTextColor={"#9CA3AF"}
                    value={item.tax}
                    onChangeText={(text) => updateItem(index, "tax", text)}
                    keyboardType="numeric"
                  />
                </View>
                <View className="w-[48%] bg-purple-100 p-3 mt-6 rounded-lg mb-3">
                  <Text className="text-purple-700 font-semibold">
                    Total: {currency} {item.total}
                  </Text>
                </View>
              </View>

              {/* Delete Item Button */}
              <TouchableOpacity activeOpacity={0.7}
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
            placeholderTextColor={"#9CA3AF"}
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          {/* Buttons */}
          <View className="flex-row justify-between mt-6">
            <TouchableOpacity activeOpacity={0.7}
              className="bg-gray-400 px-6 py-4 rounded-lg"
              onPress={prevStep}
            >
              <Text className="text-white font-semibold">Back</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}
              className="bg-blue-600 px-6 py-4 rounded-lg"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-white font-semibold items-center"><AntDesign name="eye" size={18} color="white" /> Preview</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}
              className="bg-purple-700 px-6 py-4 rounded-lg"
              onPress={downloadPDF}
            >
              <Text className="text-white font-semibold"><AntDesign name="download" size={18} color="white" /> Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Navigation Buttons */}
      <View className="flex-row justify-between ">
        {(step > 1  && step < 4) && (
          <TouchableOpacity activeOpacity={0.7}
            className="bg-gray-400 px-6 py-3 rounded-lg"
            onPress={prevStep}
          >
            <Text className="text-white font-semibold">Back</Text>
          </TouchableOpacity>
        ) }

        {step < 4 && (
          <TouchableOpacity activeOpacity={0.7}
            className="bg-purple-700 px-6 py-3 rounded-lg ml-auto"
            onPress={nextStep}
          >
            <Text className="text-white font-semibold">Next</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text className="text-xl font-bold text-center   dark:text-white">
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
      <TouchableOpacity  activeOpacity={0.7}
        onPress={() => setModalVisible(false)}
        className="bg-red-500 mt-6 py-3 rounded-lg"
      >
        <Text className="text-center text-white font-semibold">Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </ScrollView>
  </View>
  );
}

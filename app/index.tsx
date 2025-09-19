import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import logo from "../assets/images/brewvs.png";
export default function Index() { 

  return (
    <View
      className={ " flex-1 items-center justify-center px-6 dark:bg-black" } >
      {/* Theme Toggle */}
      {/* <View className="absolute top-12 right-6 p-4 border-gray-400 rounded-md">
        
        <AntDesign name={darkMode === true? "sun" : "moon"} size={24} color={ darkMode === true ? 'white' : "black"} onPress={() => setDarkMode(!darkMode)}/>
        
      </View> */}

      {/* Logo */}
      <View className="flex-1 items-center justify-center flex-col mt-48">
        <Image
          source={logo}
          className="w-60 h-60 rounded-2xl"
          resizeMode="contain"
        />

        {/* Company Name */}
        <Text
          className={`text-7xl font-bold mb-2 -mt-8 dark:text-white `}
        >
          Brevws
        </Text>

        {/* Tagline */}
        <Text
          className={`text-base mb-8 text-center dark:text-white`}
        >
          Create Professional Invoices in Minutes
        </Text>
      </View>

      {/* Button */}
      <View className="flex-1 items-center justify-center flex-col w-full mt-10 ">
        <TouchableOpacity
          className="bg-purple-700 px-6 py-4  rounded-lg shadow-lg w-[75vw]"
          onPress={() => router.push("/pages/invoice")}
          activeOpacity={0.7}
        >
          <Text className="text-2xl font-semibold text-center text-white">
            Create Invoice
          </Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text
          className={`absolute mt-24 text-xs dark:text-white`}
        >
          Free Invoice Generator – No signup needed
        </Text>
      </View>
    </View>
  );
}

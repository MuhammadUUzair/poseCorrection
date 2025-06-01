import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImageSlider } from "../components/ImageSlider";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BodyParts from "../components/BodyParts";




export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white flex space-y-5" edges={['top']}>
      <StatusBar style="dark" />
      <View className="flex-row justify-between items-center mx-5 mb-5">
        <View className="space-y-2 ">
          <Text
            style={{ fontSize: hp(4.5) }} 
            className="font-bold tracking-wider text-neutral-700"
          >
            READY TO
          </Text>
          <Text
            style={{ fontSize: hp(4.6) }} 
            className="font-bold tracking-wider text-rose-500"
          >
            WORKOUT
          </Text>
        </View>
        <View className="flex justify-center items-center space-y-2">
          <Image
            source={require('../assets/images/avatar.png')}
            style={{ height: hp(6), width: hp(6) }} 
            className="rounded-full"
          />
          <View
            className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-300 mt-2"
            style={{ height: hp(5.5), width: hp(5.5) }} 
          >
            <Ionicons name="notifications" size={hp(3)} color="grey" /> 
          </View>
        </View>
      </View>

        {/* image slider */}

      <View>
        <ImageSlider />
      </View>

      {/* body parts components */}
      <View className = "flex-1">
      <BodyParts/>
      </View>
    </SafeAreaView>
  );
}




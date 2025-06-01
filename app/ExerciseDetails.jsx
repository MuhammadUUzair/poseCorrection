import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntIcons from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-virtualized-view';


export default function ExerciseDetails() {

  const item = useLocalSearchParams();
  const router = useRouter();
  return (

    <View className="flex flex-1 bg-white">
  {/* Shadow Image Container */}
  <View
    className="rounded-b-[35px] bg-neutral-200 shadow-md"
    style={{
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 10,
    }}
  >
    <Image
      source={{ uri: item.gifUrl }}
      contentFit="cover"
      style={{
        width: wp(100),
        height: wp(100),
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
      }}
    />
    <TouchableOpacity
      onPress={() => router.back()}
      className="mx-2 absolute mt-10 right-0"
    >
      <AntIcons name="closecircle" size={hp(4)} color="#f43f5e" />
    </TouchableOpacity>
  </View>

  {/* Scrollable content */}
  <ScrollView className="mx-4 space-y-2 mt-3">
    <Text
      style={{ fontSize: hp(3.5) }}
      className="font-semibold text-neutral-800 tracking-wide"
    >
      {item.name}
    </Text>

    <Text
      style={{ fontSize: hp(2) }}
      className="text-neutral-700 tracking-wide mt-5"
    >
      Equipment{" "}
      <Text className="font-bold text-neutral-800">{item?.equipment}</Text>
    </Text>

    <Text
      style={{ fontSize: hp(2) }}
      className="text-neutral-700 tracking-wide mt-5"
    >
      Secondary Muscle{" "}
      <Text className="font-bold text-neutral-800">{item?.secondaryMuscles}</Text>
    </Text>

    <Text
      style={{ fontSize: hp(2) }}
      className="text-neutral-700 tracking-wide mt-5"
    >
      Target{" "}
      <Text className="font-bold text-neutral-800">{item?.target}</Text>
    </Text>

    <Text
      style={{ fontSize: hp(3) }}
      className="font-semibold text-neutral-800 tracking-wide"
    >
      Instructions
    </Text>

    {item.instructions.split(",").map((instruction, index) => (
      <Text
        key={index}
        style={{ fontSize: hp(1.7) }}
        className="text-neutral-800"
      >
        {index + 1}. {instruction.trim()}
      </Text>
    ))}
  </ScrollView>

  {/* Start Button at the bottom */}
  <TouchableOpacity
  onPress={()=> router.push('CameraScreen')}
    className="bg-rose-500 m-4 p-3 rounded-xl items-center justify-center"
    style={{ height: hp(6) }}
  >
    <Text className="text-white text-lg font-semibold tracking-wide">
      Start
    </Text>
  </TouchableOpacity>
</View>
  )

}


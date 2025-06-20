  import React from 'react';
  import { Text, View, Image, TouchableOpacity } from 'react-native';
  import { StatusBar } from 'expo-status-bar';
  import { LinearGradient } from 'expo-linear-gradient';
  import "../global.css";
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  import Animated, { FadeInDown } from 'react-native-reanimated';
  import { useRouter } from 'expo-router';

  export default function Index() {
    const router = useRouter();

    return (
      <View className="flex-1 flex justify-end">
        <StatusBar style="light" />
        <Image className="h-full w-full absolute" source={require('../assets/images/welcome.png')} />

        <LinearGradient
          colors={['transparent', '#18181b']}
          style={{ width: wp(100), height: hp(70) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          className="flex justify-end pd-12 space-y-8"
        >
          <Animated.View entering={FadeInDown.delay(200).springify()} className="flex items-center">
            <Text style={{ fontSize: hp(5) }} className="text-white font-bold tracking-wide">
              LiveFit AI
            </Text>
            <Text style={{ fontSize: hp(1.5) }} className="text-green-500 font-bold tracking-wide mb-1">
              Train live, Stay fit
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <TouchableOpacity
            
              onPress={() => router.push('home')} 
              className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mt-10 mb-10"
              style={{ height: hp(7), width: wp(80) }}
            >
              <Text style={{ fontSize: hp(3) }} className="text-white font bold tracking-widest">
                Get Started
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </View>
    );
  }

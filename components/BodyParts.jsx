
import React from "react";
import { View, Text, Image, Dimensions, FlatList, TouchableOpacity } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { exerciseName } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";


export default function BodyParts() {
    const router = useRouter();
    return (
        <View className="mt-4 mx-4">
            <Text style={{ fontSize: hp(3) }}
                className="font-semibold text-neutral-700">
                Exercise
            </Text>

            <FlatList
                data={exerciseName}
                numColumns={2}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                renderItem={({ item, index }) => <BodyPartCard router={router} index={index} item={item} />}
            />

                
        </View>


    )

}


const BodyPartCard = ({ item, router, index }) => {
    return (
        <View>
            <TouchableOpacity
            onPress={()=>router.push({pathname: '/exercises', params: item})}
                style={{ width: wp(46), height: wp(52) }}
                className="flex justify-end p-4 mb-4"
            >
                <Image
                    source={item.image}
                    resizeMode="cover"
                    style={{
                        width: wp(44),
                        height: wp(52),

                    }}
                    className="rounded-[35px] absolute"
                />

                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                        width: wp(44),
                        height: wp(15),
                        position: 'absolute',
                        bottom: 0,
                        borderBottomLeftRadius: 35, // ✅ Manually match the image's border radius
                        borderBottomRightRadius: 35,
                    }}
                />
                <Text
                style={{fontSize: hp(2.5), textAlign:"center"}}
                className = "text-white font-semibold  tracking-wide"
                >
                    {item?.name}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
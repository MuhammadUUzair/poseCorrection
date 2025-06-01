import { useRouter } from 'expo-router'
import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ExerciseList({ data }) {

    const router = useRouter();
    return (
        <View>


            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                renderItem={({ item, index }) => <ExerciseCard router={router} index={index} item={item} />}
            />
        </View>
    )

}

const ExerciseCard = ({ item, router, index }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => router.push({ pathname: '/ExerciseDetails', params: item })}
                // onPress={() => router.push('/ExerciseDetails')}

                className='flex py-3 space-y-2'>
                <View className="bg-neutral-200 shadow rounded-[25px] ">
                    <Image
                        source={{ uri: item.gifUrl }}
                        contentFit='cover'
                        style={{ width: wp(92), height: wp(100), borderRadius: 25 }}


                    />

                </View>

            </TouchableOpacity>
        </View>
    )
}
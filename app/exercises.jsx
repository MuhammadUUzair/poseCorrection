import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { demoExercises, exerciseName } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
// import { fetchExercisesByName } from "../API/exercisedb";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ExerciseList from "../components/exerciseList";

import { ScrollView } from "react-native-virtualized-view";

{/* export const items = ['burpee','pull up','cross lunge','lateral raise','squad','push up'] */ }

export default function Exercises() {


    const router = useRouter();
    const [exercises, setExercises] = useState([]);
    const item = useLocalSearchParams();
    console.log("got items", item)

    // useEffect(() => {
    //     {/* if(item) getExercises(item.name);
    //         getExercises("burpee"); // hardcoded for testing */}

    // }, [item]);


    useEffect(() => {
        if (item?.name) {
            const filteredExercises = demoExercises.filter((exercise) =>
                exercise.bodyPart.toLowerCase() === item.name.toLowerCase()
            );
            setExercises(filteredExercises);
        }
    }, [item.name]);
    const getExercises = async (exerciseName) => {
        let data = await fetchExercisesByName(exerciseName);

    }

    return (
        <ScrollView>
            <StatusBar style='light' />
            <Image
                source={item.image}
                style={{ width: wp(100), height: hp(45) }}
                className="rounded-b-[40px]"
            />
            <TouchableOpacity
                onPress={() => router.back()}
                className="bg-rose-500 mx-4 absolute flex justify-center items-center pr-1 rounded-full"
                style={{ height: hp(5.5), width: hp(5.5), marginTop: hp(7) }}>
                <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
            </TouchableOpacity>

            {/* exercises animation and relevant detail  */}

            <View className="mx-4 space-y-3 mt-4 ">
                <Text
                    style={{ fontSize: hp(3) }}
                    className="font-semibold text-neutral-700"
                >


                    {item.name} exercises
                </Text>
                <View
                    className='mb-10'>
                    <ExerciseList data={exercises} />
                </View>


                {/*Exercise Instructions   */}
                <ScrollView>

                </ScrollView>
            </View>
        </ScrollView>
    )
}
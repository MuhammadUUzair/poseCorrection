
import React, { useRef } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import "../global.css";
import ReanimatedCarousel from 'react-native-reanimated-carousel';
import { sliderImages } from "../constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Adjusted dimensions
const CAROUSEL_WIDTH = SCREEN_WIDTH * 0.98; // Reduced slide width to make room for the gap
const CAROUSEL_HEIGHT = SCREEN_HEIGHT * 0.29;
const IMAGE_WIDTH = CAROUSEL_WIDTH; // Image fills the slide width
const IMAGE_HEIGHT = CAROUSEL_HEIGHT;
const GAP_BETWEEN_SLIDES = SCREEN_WIDTH * 0.05; // 5% of screen width as the gap between slides
const CAROUSEL_ITEM_WIDTH = CAROUSEL_WIDTH + GAP_BETWEEN_SLIDES; // Total width per item (slide + gap)

export function ImageSlider() {
  const carouselRef = useRef(null);

  if (!sliderImages || sliderImages.length === 0) {
    return (
      <View style={{ width: SCREEN_WIDTH, height: CAROUSEL_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No images available</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: CAROUSEL_ITEM_WIDTH, height: CAROUSEL_HEIGHT, alignItems: 'center', justifyContent: 'center' }}
     >
        <Image
          source={item}
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            borderRadius: 25,
            resizeMode: 'cover',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 4,
          }}
          onError={(error) => console.log('Image Error:', error.nativeEvent)}
        />
      </View>
    );
  };

  return (
    <View style={{ width: SCREEN_WIDTH, height: CAROUSEL_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
      <ReanimatedCarousel
        ref={carouselRef}
        width={CAROUSEL_ITEM_WIDTH} // Total width per item (slide + gap)
        height={CAROUSEL_HEIGHT}
        data={sliderImages}
        loop
        autoPlay
        autoPlayInterval={4000}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
      />
    </View>
  );
}




import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import CardInfo from "./card_info_contract";

interface CarouselInfoProps {
    data: any;
  }
const Carousel: React.FC<CarouselInfoProps> = ({ data }) =>{
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const onScroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / slideSize);
    if (index !== activeIndex) {
      setActiveIndex(index);
      console.log(`Active Card ID: ${data[index].id}`);
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {data.map((item: { id: React.Key | null | undefined; }, index: any) => (
          <View style={styles.cardWrapper} key={item.id}>
            <CardInfo data={item} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {data.map((_: any, index: React.Key | null | undefined) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === activeIndex ? styles.activeIndicator : styles.inactiveIndicator
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  cardWrapper: {
    width: Dimensions.get("window").width, // Ensuring each card takes full screen width
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fafafa',
  },
  inactiveIndicator: {
    backgroundColor: '#90908F',
  },
});

export default Carousel;

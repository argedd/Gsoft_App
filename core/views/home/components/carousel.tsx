import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import CardInfo from "./card_info_contract";
import { useDispatch } from 'react-redux';
import { setContract, setDataContract } from "../../../utils/redux/actions/contractActions";
import { LoadingComponent } from "../../../components/components";

interface CarouselInfoProps {
    data: any;
  }

const Carousel: React.FC<CarouselInfoProps> = ({ data }) =>{
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);


  useEffect(() => {
    if (data.length > 0) {
      setActiveIndex(0);
      dispatch(setContract(data[0].id)); // Set the first contract when data changes
      dispatch(setDataContract(data[0])); // Set the first contract when data changes
    }
  }, [data, dispatch]);


  const onScroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {

    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / slideSize);
    if (index !== activeIndex) {
      setShowLoading(true);

      setActiveIndex(index);
      dispatch(setContract(data[index].id));
      dispatch(setDataContract(data[index])); // Set the first contract when data changes

      console.log(`Active Card ID: ${data[index].id}`);

    }
    const loadingInterval = setInterval(() => {
      setShowLoading(false);
      clearInterval(loadingInterval);
    }, 2000);


  };

  return (
    <View style={styles.carouselContainer}>
      {showLoading && <LoadingComponent isLoading={showLoading} />}

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

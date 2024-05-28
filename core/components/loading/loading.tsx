import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, StyleSheet, View, Modal, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props{
    isLoading:boolean,
}

const LoadingComponent = ({ isLoading }:Props) => {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    setIsVisible(isLoading);
  }, [isLoading]);

  

  return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FastImage
            source={require('../../assets/loader/preloader.gif')}
            style={[styles.logo]}
          />
          <Text style={styles.espereUnMomento}>Espere un Momento</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e', // Fondo translúcido con opacidad 0.5
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  activityIndicator: {
    marginTop: 20,
  },
  espereUnMomento: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#fff",
    textAlign: "left"
    }
});

export default LoadingComponent;

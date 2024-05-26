// components/BackButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet, Platform, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

const BackButton: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Icon name="arrow-back-ios" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 80 : 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,

  },
  backIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#fff"
  },
});

export default BackButton;

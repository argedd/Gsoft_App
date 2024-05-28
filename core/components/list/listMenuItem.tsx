import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props{
  icon: any,
  title:string, 
  onPress:()=>void
}

const MenuItem = ({icon,title, onPress}:Props) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.titleMenu}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    paddingLeft:12,
    color:"#fff"
  },

  titleMenu:{
    flexDirection:'row',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#fff', // Si deseas cambiar el color de la imagen
  },
});

export default MenuItem;

import React, { useEffect, useState } from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { percentHeight } from '../../../../utils/dimensions/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { RootTicket } from '../../../../data/interfaces/tickets_interface';
import { getTicket } from '../../../../services/tickets/tickets_service';






interface Props {
  ticket: any ;
}


const MultimediaComponent: React.FC<Props> = ({ ticket }) => {
    const [multimedia, setMultimedia] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchTimeLine = async () => {
        try {
          const file = await getTicket(ticket);
          console.log('====================================');
          console.log(file);
          console.log('====================================');
          setMultimedia(file.files_tickets);
        } catch (error) {
          console.error('Error al obtener timeline:', error);
        }
      };
  
      fetchTimeLine();
    }, []);
  return (
    <View style={styles.containerItem}>
         {multimedia.map((item, index) => (
            
        <LinearGradient key={index} style={styles.vectorParent} locations={[0.04,1]} colors={['rgba(182, 182, 180, 0.48)','rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
<Image style={styles.vectorIcon} resizeMode="cover" source={{uri:item.file}} />
<View style={styles.imagenOVideoWrapper}>
<Text style={styles.imagenOVideo}>Archivo</Text>
</View>
</LinearGradient>
         ))}
   </View>

  );
}

const styles = StyleSheet.create({
    containerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: percentHeight(8), // Utilizo la función para porcentaje de altura
      },
      vectorIcon: {
        width: 100,
        height: 100
        },
        imagenOVideo: {
        fontSize: 17,
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#fff",
        textAlign: "center"
        },
        imagenOVideoWrapper: {
        marginTop: 16.8,
        alignItems: "center"
        },
        vectorParent: {
        borderRadius: 17,
        flex: 1,
        width: "100%",
        height: 141,
        justifyContent: "center",
        padding: 17,
        backgroundColor: "transparent",
        alignItems: "center"
        }


});
export default MultimediaComponent
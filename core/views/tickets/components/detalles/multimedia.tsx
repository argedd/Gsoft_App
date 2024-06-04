import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { percentHeight } from '../../../../utils/dimensions/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { RootTicket } from '../../../../data/interfaces/tickets_interface';
import { getTicket } from '../../../../services/tickets/tickets_service';

interface Props {
  ticket: RootTicket;
}

const MultimediaComponent: React.FC<Props> = ({ ticket }) => {
  const [multimedia, setMultimedia] = useState<any[]>([]);

  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        const { files_tickets } = await getTicket(ticket);
        setMultimedia(files_tickets);
      } catch (error) {
        console.error('Error al obtener timeline:', error);
      }
    };

    fetchTimeLine();
  }, [ticket]);

  return (
    <View style={styles.containerItem}>
      {multimedia.map((item, index) => (
        <View
          key={index}
          style={styles.vectorParent}
        >
             {item.extension === 'png' || item.extension === 'jpg' || item.extension === 'jpeg'
                ? ( <Image
                    style={styles.vectorIcon}
                    resizeMode="cover"
                    source={{ uri: item.file }}
                  />)
                : (
                    <TouchableOpacity>
                        <Text>Descargar Archivo</Text>
                    </TouchableOpacity>
                )}
         
          <View style={styles.imagenOVideoWrapper}>
            <Text style={styles.imagenOVideo}>
              {item.extension === 'png' || item.extension === 'jpg' || item.extension === 'jpeg'
                ? 'Imagen'
                : 'Archivo'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: percentHeight(8),
  },
  vectorIcon: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagenOVideo: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  imagenOVideoWrapper: {
    marginTop: 16.8,
    alignItems: 'center',
  },
  vectorParent: {
    borderRadius: 17,
    flex: 1,
    width: '100%',
    height: 141,
    justifyContent: 'center',
    padding: 17,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
});

export default MultimediaComponent;
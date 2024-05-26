import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const CardOnu = () => (
  <View style={styles.container}>
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.titleContainer}>
          <Title style={styles.title}>Very Good</Title>
          <View style={styles.outerIndicator}>
            <View style={styles.innerIndicator} />
          </View>
        </View>
        <Image
          style={styles.image}
          source={{ uri: 'https://via.placeholder.com/150' }} // Reemplaza con tu imagen
        />
        {/* <Paragraph>Card content</Paragraph> */}
      </Card.Content>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  card: {
    width: '90%',
    borderRadius: 10,
    shadowColor: 'green',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24, // Ajusta el tamaño del título
  },
  outerIndicator: {
    width: 16, // Tamaño del indicador externo
    height: 16,
    borderRadius: 8, // Hace que sea circular
    backgroundColor: 'rgba(0, 128, 0, 0.2)', // Verde con opacidad
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'green',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  innerIndicator: {
    width: 8, // Tamaño del indicador interno
    height: 8,
    borderRadius: 4, // Hace que sea circular
    backgroundColor: 'green', // Verde sólido
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
});

export default CardOnu;

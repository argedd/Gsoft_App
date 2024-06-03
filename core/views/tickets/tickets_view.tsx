import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../components/components';
import { RootStackParamListRoute } from '../../navigations/routes/app_routes';
import LayoutPrimary from '../../components/layouts/layout_primary';
import { ResultTickets } from '../../data/interfaces/tickets_interface';
import { useFocusEffect } from '@react-navigation/native';
import { getTickets } from '../../services/tickets/tickets_service';
import { percentHeight, percentWidth } from '../../utils/dimensions/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const TicketsView: React.FC<Props> = ({ navigation }) => {
  const [tickets, setTickets] = useState<ResultTickets[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMethods = async () => {
        try {
          const tickets = await getTickets();

          setTickets(tickets.results);
        } catch (error) {
          console.error('Error al obtener tickets del cliente:', error);
        }
      };

      fetchMethods();
    }, [])
  );

  const ComponentNoTickets = () => (
    <Text style={styles.aunNoTienes}>Aun no tienes tickets creados</Text>
  );

  const handleTicket = (ticket:any) => {
    console.log('====================================');
    console.log(ticket);
    console.log('====================================');
    navigation.navigate('DetalleTicket', { ticket: ticket });
  }

  const ComponentTickets = () => (
    <View style={styles.frameParent}>
      <View style={styles.frameGroup}>
        {tickets.map((ticket, index) => (
          <TouchableOpacity key={index} onPress={()=>handleTicket(ticket)} >
            <LinearGradient
            key={index}
          style={styles.iconosAfiliacionDeCuentasParent}
          locations={[0.04, 1]}
          colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']}
          useAngle={true}
          angle={180}
        >
          <View style={styles.iconosAfiliacionDeCuentas}>
            <Image style={styles.vectorIcon} resizeMode="cover" source={require("../../assets/icons/home/ticket.png")} />
          </View>
          <View style={styles.frameContainer}>
            <View style={styles.header}>
              <Text style={[styles.gabrielaRamos, styles.iniciarSesinFlexBox]}>Nº{ticket.id} </Text>
              <View style={[styles.badge, { backgroundColor: ticket.office_color }]}>
                <Text style={styles.badgeText}>{ticket.office_name}</Text>
              </View>
            </View>
            <Text style={[styles.metodoPagoMvil, styles.iniciarSesinFlexBox]} numberOfLines={2} ellipsizeMode="tail">
              {ticket.description}
            </Text>
            <Text style={[styles.metodoPagoMvil, styles.iniciarSesinFlexBox]}>{moment(ticket.created_at).format('YYYY-MM-DD')}  Status: {ticket.status_name}</Text>
          </View>
        </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  
  

  const TicketsComponent = () => (
    <ScrollView style={styles.container}>
      <BackButton title={'Mis Tickets'} />
      <View style={styles.containerItem}>
        {tickets.length > 0 ? <ComponentTickets /> : <ComponentNoTickets />}
      </View>
    </ScrollView>
  );

  return (
    <LayoutPrimary>
      <TicketsComponent />
      <TouchableOpacity style={styles.botonesBotnPrincipal} onPress={() => navigation.navigate("RegistrarTicket")}>
        <Text style={styles.iniciarSesin}>Crear nuevo ticket</Text>
      </TouchableOpacity>
    </LayoutPrimary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
  },
  containerItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aunNoTienes: {
    fontSize: percentWidth(6),
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
    color: "#fafafa",
    textAlign: "center",
    width: percentWidth(60),
    marginVertical: percentHeight(20),
  },
  iniciarSesin: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    fontSize: 16,
    color: "#fafafa"
  },
  botonesBotnPrincipal: {
    position: 'absolute',
    bottom: percentHeight(4),
    alignSelf: 'center',
    backgroundColor: "#e20a17",
    paddingHorizontal: percentWidth(8),
    paddingVertical: percentHeight(1.5),
    flexDirection: "row",
    width: percentWidth(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: percentWidth(2),
  },
  frameParent: {
    width: "100%",
    alignItems: 'center',
  },
  frameGroup: {
    width: "100%",
    alignItems: 'center',
  },
  iconosAfiliacionDeCuentasParent: {
    paddingHorizontal: percentWidth(4),
    backgroundColor: "transparent",
    paddingVertical: percentHeight(2),
    borderWidth: 0.4,
    borderColor: "#fafafa",
    flexDirection: "row",
    width: percentWidth(90),
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: percentHeight(1),
    borderRadius: 8
  },
  vectorIcon: {
    width: percentWidth(12),
    height: percentWidth(12),
  },
  iconosAfiliacionDeCuentas: {
    width: percentWidth(16),
    height: percentWidth(16),
    justifyContent: "center",
    alignItems: "center",
  },
  gabrielaRamos: {
    fontFamily: "Roboto-Bold",
    fontWeight: "600",
    fontSize: percentWidth(4),
    color: "#fafafa",
  },
  metodoPagoMvil: {
    fontSize: percentWidth(3),
    fontFamily: "Roboto-Regular",
    marginTop: percentHeight(1),
  },
  frameContainer: {
    marginLeft: percentWidth(2),
    justifyContent: "center",
    flex: 1,
  },
  iniciarSesinFlexBox: {
    textAlign: "left",
    color: "#fafafa",
  },
  badge: {
    paddingHorizontal: percentWidth(2),
    paddingVertical: percentHeight(0.5),
    borderRadius: percentWidth(2),
    alignSelf: 'flex-start',
    marginVertical: percentHeight(0.5),
  },
  badgeText: {
    color: "#fff",
    fontSize: percentWidth(3),
    fontFamily: "Roboto-Bold",
  },
});

export default TicketsView;

import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BackButton } from '../../../../components/components';
import LayoutPrimary from '../../../../components/layouts/layout_primary';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamListRoute } from '../../../../navigations/routes/app_routes';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { percentWidth, percentHeight } from '../../../../utils/dimensions/dimensions';
import TimeLineComponent from './time_line';
import MultimediaComponent from './multimedia';

const TicketDetailView = () => {
  const route = useRoute<RouteProp<RootStackParamListRoute, 'DetalleTicket'>>();
  const { ticket } = route.params;
  const [selectedTab, setSelectedTab] = useState<'timeline' | 'multimedia'>('timeline');

  const TicketDetailComponent = () => (
    <View style={styles.container}>
      <View style={styles.containerItem}>
        <LinearGradient
          style={styles.iconosAfiliacionDeCuentasParent}
          locations={[0.04, 1]}
          colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']}
          useAngle={true}
          angle={180}
        >
          <View style={styles.iconosAfiliacionDeCuentas}>
            <Image style={styles.vectorIcon} resizeMode="cover" source={require("../../../../assets/icons/home/ticket.png")} />
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
        <View style={styles.filtro}>
          <TouchableOpacity
            style={[
              styles.botonesFiltro,
              selectedTab === 'timeline' && styles.selectedButton
            ]}
            onPress={() => setSelectedTab('timeline')}
          >
            <Text style={[styles.pagadas, styles.pagadasTypo]}>Linea de tiempo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.botonesFiltro,
              selectedTab === 'multimedia' && styles.selectedButton
            ]}
            onPress={() => setSelectedTab('multimedia')}
          >
            <Text style={[styles.porPagar, styles.pagadasTypo]}>Multimedia</Text>
          </TouchableOpacity>
        </View>
        {selectedTab === 'timeline' ? <TimeLineComponent ticket={ticket.id} /> : <MultimediaComponent ticket={ticket.id} />}
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LayoutPrimary>
        <BackButton title={`Ticket Nº ${ticket.id}`} />
        <ScrollView>
          <TicketDetailComponent />
        </ScrollView>
      </LayoutPrimary>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  iconosFlexBox: {
    alignItems: "center",
    flexDirection: "row"
  },
  n0000FlexBox: {
    textAlign: "left",
    color: "#fafafa"
  },
  iconosTicketChild: {
    width: 23,
    height: 30
  },
  iconosTicket: {
    width: 45,
    justifyContent: "center",
    padding: 8
  },
  n0000: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto-Bold"
  },
  n0000Wrapper: {
    flexDirection: "row"
  },
  nDeTicket: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    marginTop: 6
  },
  frameParent: {
    marginLeft: 9
  },
  iconosTicketParent: {
    borderRadius: 16,
    borderStyle: "solid",
    borderColor: "#fafafa",
    borderWidth: 0.2,
    flex: 1,
    width: "100%",
    height: 102,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "transparent"
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
  vectorIcon: {
    width: percentWidth(12),
    height: percentWidth(12),
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
    marginLeft: 8, // adjust as needed for spacing
  },
  badgeText: {
    color: "#fff",
    fontSize: percentWidth(3),
    fontFamily: "Roboto-Bold",
  },
  botonesFiltro: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(171, 170, 170, 0.5)",
  },
  selectedButton: {
    backgroundColor: "#e20a17",
  },
  pagadasTypo: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12
  },
  pagadas: {
    fontWeight: "500",
    fontFamily: "Roboto-Medium"
  },
  porPagar: {
    fontWeight: "600",
    fontFamily: "Roboto-Bold"
  },
  filtro: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
  }
});

export default TicketDetailView;

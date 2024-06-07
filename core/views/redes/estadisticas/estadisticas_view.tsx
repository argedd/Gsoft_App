import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton, DialogComponent, LoadingComponent } from '../../../components/components';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { BarChart } from "react-native-gifted-charts";
import { getConsumo } from '../../../services/redes/redes_services';
import { Estadisticas } from '../../../data/interfaces/estadisticas_interface';
import { Calendar } from 'react-native-calendars';
import { percentHeight, percentWidth } from '../../../utils/dimensions/dimensions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/store';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const EstadisticasView: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<Estadisticas[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [totalSubida, setTotalSubida] = useState(0);
  const [totalBajada, setTotalBajada] = useState(0);
  const [dateRange, setDateRange] = useState('');
  const contract = useSelector((state: RootState) => state.contractState);

  useEffect(() => {
    userConsumo(endDate);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      userConsumo(endDate);
    }
  }, [startDate, endDate]);

  const userConsumo = async (endDay: string) => {
    setShowLoading(true);

    const consumo = await getConsumo(contract.contract, startDate, endDay);
    console.log(startDate);
    console.log(consumo);
    console.log(endDay);
    setData(consumo);

    let totalDownload = 0;
    let totalUpload = 0;

    const chartDataArray = consumo.flatMap(item => {
      totalDownload += item.download;
      totalUpload += item.upload;

      return [
        {
          value: item.download,
          label: `${monthNames[item.date__month - 1]}/${String(item.date__year).slice(-2)}`,
          frontColor: '#E20A17',  // Color Base
          sideColor: '#FF4C50',   // Tonalidad Más Clara
          topColor: '#A0000D',    // Tonalidad Más Oscura
          labelTextStyle: { color: 'white' },
          topLabelComponent: () => (
            <Text style={styles.topLabelText}>{`${item.download} GB`}</Text>
          )
        },
        {
          value: item.upload,
          label: '',
          frontColor: '#50504F',  // Color Base
          sideColor: '#787877',   // Tonalidad Más Clara
          topColor: '#282828',    // Tonalidad Más Oscura
          topLabelComponent: () => (
            <Text style={styles.topLabelText}>{`${item.upload} GB`}</Text>
          )
        }
      ];
    });
    setShowLoading(false);


    setTotalSubida(totalUpload);
    setTotalBajada(totalDownload);
    setChartData(chartDataArray);

    if (consumo.length > 0) {
      const initialDate = consumo[0];
      const finalDate = consumo[consumo.length - 1];
      const range = `${monthNames[initialDate.date__month - 1]} ${initialDate.date__year} - ${monthNames[finalDate.date__month - 1]} ${finalDate.date__year}`;
      setDateRange(range);
    } else {
      setDateRange('No hay Datos');
    }
  };

  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const maxValue = Math.max(...data.map(item => Math.max(item.download, item.upload))) * 1.2;

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const getDatesInRange = (start: string, end: string) => {
    const range: any = {};
    const startDate = new Date(start);
    const endDate = new Date(end);

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      range[dateString] = { color: 'red' };
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  const handleDayPress = async (day: any) => {
    if (!startDate) {
      setStartDate(day.dateString);
    } else if (!endDate) {
      await setEndDate(day.dateString);
      setShowDialog(false);
    } else {
      setStartDate('');
      setEndDate('');
    }
  };

  const clearDates = () => {
    setStartDate('');
    setEndDate('');
  };

  const renderTitle = () => (
    <View style={{ marginVertical: percentHeight(2) }}>
      <Text style={styles.titleText}>
        Contrato Nº {contract.contract}
      </Text>
      <View style={styles.containerItems}>
        <Text style={styles.rangoDeFecha}>Rango de fecha de consumo</Text>
        <View style={[styles.parent, styles.parentFlexBox]}>
          <Text style={styles.text}>{dateRange !== '' ? dateRange : 'Seleccione Fechas'}</Text>
          <TouchableOpacity onPress={toggleDialog} style={[styles.botonesCalendario, styles.parentFlexBox]}>
            <Image style={styles.vectorIcon} resizeMode="cover" source={require("../../../assets/icons/facturacion/calendarios.png")} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#E20A17' }]} />
          <Text style={styles.legendText}>Bajada</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#50504F' }]} />
          <Text style={styles.legendText}>Subida</Text>
        </View>
      </View>
    </View>
  );

  const EstadisticasComponent = () => (
    <View style={styles.container}>
      {showLoading && <LoadingComponent isLoading={showLoading} />}

      <BackButton title={'Uso de Datos'} />
      <View style={styles.containerItems}>
        <View style={styles.chartWrapper}>
          {renderTitle()}
          {data.length > 0 ? (
            <BarChart
              data={chartData}
              barWidth={percentWidth(10)}
              spacing={percentWidth(8)}
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{ color: 'white' }}
              isAnimated
              isThreeD
              noOfSections={4}
              maxValue={maxValue}
              // showLine
              lineConfig={{
                color: '#F29C6E',
                thickness: 3,
                curved: true,
                hideDataPoints: true,
                shiftY: 2,
                initialSpacing: 0,
              }}
            />
          ) : (
            <Text style={{ color: 'white', marginTop: percentHeight(2) }}>No hay datos disponibles para el rango de fechas seleccionado.</Text>
          )}
        </View>
        <View>
          <View style={styles.frameParent}>
            <LinearGradient style={styles.totalParentLayout} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
              <Text style={[styles.totalSubida, styles.gbFlexBox]}>Total subida</Text>
              <Text style={[styles.gb, styles.gbFlexBox]}>{totalSubida.toFixed(2)} GB</Text>
            </LinearGradient>
            <LinearGradient style={[styles.totalBajadaParent, styles.totalParentLayout]} locations={[0.04, 1]} colors={['rgba(182, 182, 180, 0.48)', 'rgba(80, 80, 79, 0.48)']} useAngle={true} angle={180}>
              <Text style={[styles.totalSubida, styles.gbFlexBox]}>Total bajada</Text>
              <Text style={[styles.gb, styles.gbFlexBox]}>{totalBajada.toFixed(2)} GB</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <LayoutPrimary>
      <EstadisticasComponent />
      <View>
        <DialogComponent visible={showDialog} onClose={toggleDialog}>
          <Calendar
            markingType={'period'}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#fff',
              selectedDayBackgroundColor: '#fff',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#fff',
              dayTextColor: '#fff',
              monthTextColor: "#fff",
              arrowColor: "#fff"
            }}
            onDayPress={handleDayPress}
            markedDates={{
              [startDate]: { startingDay: true, disableTouchEvent: true, color: 'red' },
              [endDate]: { endingDay: true, disableTouchEvent: true, color: 'red' },
              ...getDatesInRange(startDate, endDate)
            }}
          />
          <View style={styles.botonesBotnPrincipalParent}>
            <TouchableOpacity style={[styles.botonesBot, styles.botonesFlexBox]} onPress={clearDates}>
              <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Borrar Fechas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botonesBotnPrincipal, styles.botonesFlexBox]} onPress={toggleDialog}>
              <Text style={[styles.iniciarSesin, styles.iniciarSesinTypo]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </DialogComponent>
      </View>
    </LayoutPrimary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItems: {
    alignItems: 'center',
  },
  chartWrapper: {
    paddingBottom: percentHeight(4),
    borderRadius: percentWidth(5),
    marginTop: percentHeight(2),
    width: percentWidth(90),
  },
  titleText: {
    color: 'white',
    fontSize: percentWidth(5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: percentHeight(2),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    height: percentHeight(1.5),
    width: percentHeight(1.5),
    borderRadius: percentHeight(0.75),
    marginRight: percentWidth(4),
  },
  legendText: {
    color: 'lightgray',
  },
  topLabelText: {
    color: 'white',
    fontSize: percentWidth(3),
    textAlign: 'center',
  },
  botonesBotnPrincipalParent: {
    marginTop: percentHeight(2),
    alignSelf: "stretch",
    alignItems: "center",
  },
  iniciarSesin: {
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fafafa",
  },
  botonesBotnPrincipal: {
    backgroundColor: "#e20a17",
  },
  botonesBot: {
    backgroundColor: "transparent",
    borderWidth: percentWidth(0.3),
    borderColor: "white",
  },
  iniciarSesinTypo: {
    textAlign: "left",
    fontSize: percentWidth(4),
  },
  botonesFlexBox: {
    paddingHorizontal: percentWidth(8),
    justifyContent: "center",
    paddingVertical: percentHeight(1.5),
    borderRadius: percentWidth(2),
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    marginBottom: percentHeight(1),
  },
  gbFlexBox: {
    textAlign: "left",
    color: "#fff",
  },
  totalParentLayout: {
    backgroundColor: "transparent",
    padding: percentWidth(3),
    justifyContent: "center",
    alignItems: "center",
    height: percentHeight(8),
    width: percentWidth(40),
    borderRadius: percentWidth(2),
  },
  totalSubida: {
    fontSize: percentWidth(4),
    fontFamily: "Roboto-Regular",
  },
  gb: {
    fontSize: percentWidth(6),
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    marginTop: percentHeight(1),
  },
  totalBajadaParent: {
    marginLeft: percentWidth(4),
  },
  frameParent: {
    width: "100%",
    flexDirection: "row",
  },
  parentFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontSize: percentWidth(4),
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
    color: "#fff",
    textAlign: "left",
  },
  vectorIcon: {
    width: percentWidth(10),
    height: percentWidth(10),
  },
  botonesCalendario: {
    borderRadius: percentWidth(2),
    backgroundColor: "#e20a17",
    width: percentWidth(12),
    padding: percentWidth(1.5),
    marginLeft: percentWidth(2),
  },
  parent: {
    width: percentWidth(50),
    alignItems: "center",
    paddingTop: percentHeight(2),
  },
  rangoDeFecha: {
    fontSize: percentWidth(4),
    fontFamily: "Roboto-Regular",
    color: "#fff",
    textAlign: "left",
    paddingTop: percentHeight(2),
  },
});

export default EstadisticasView;

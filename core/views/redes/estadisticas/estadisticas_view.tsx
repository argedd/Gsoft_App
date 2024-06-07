import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BackButton, DialogComponent } from '../../../components/components';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { BarChart } from "react-native-gifted-charts";
import { getConsumo } from '../../../services/redes/redes_services';
import { Estadisticas } from '../../../data/interfaces/estadisticas_interface';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import { percentHeight, percentWidth } from '../../../utils/dimensions/dimensions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/store';

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const EstadisticasView: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<Estadisticas[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const contract = useSelector((state: RootState) => state.contractState);

  // useEffect(() => {
  //   const userConsumo = async () => {
  //     const consumo = await getConsumo();
  //     setData(consumo);
  //   };
  //   userConsumo();
  // }, []);

  const userConsumo = async (endDay: string) => {

    const consumo = await getConsumo(contract.contract, startDate, endDay);
    setData(consumo);
  };

  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const maxValue = Math.max(...data.map(item => Math.max(item.download, item.upload))) * 1.2;

  const chartData = data.flatMap(item => [
    {
      value: item.download,
      label: `${monthNames[item.date__month - 1]}/${String(item.date__year).slice(-2)}`,
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6',
      labelTextStyle: { color: 'white' },
      topLabelComponent: () => (
        <Text style={styles.topLabelText}>{`${item.download} GB`}</Text>
      )
    },
    {
      value: item.upload,
      label: '',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
      labelTextStyle: { color: 'white' },
      topLabelComponent: () => (
        <Text style={styles.topLabelText}>{`${item.upload} GB`}</Text>
      )
    }
  ]);

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
      console.log('====================================');
      console.log(day.dateString);
      console.log('====================================');
      userConsumo(day.dateString)
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
    <View style={{ marginVertical: 30 }}>
      <Text style={styles.titleText}>
        Uso de Datos Mensual
      </Text>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4ABFF4' }]} />
          <Text style={styles.legendText}>Descarga</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#28B2B3' }]} />
          <Text style={styles.legendText}>Subida</Text>
        </View>
      </View>
      <TouchableOpacity onPress={toggleDialog} >
        <MaterialCommunityIcons name="calendar-clock-outline" size={24} color="#fff" />
      </TouchableOpacity>

    </View>
  );

  const EstadisticasComponent = () => (
    <View style={styles.container}>
      <BackButton title={'Uso de Datos'} />
      <View style={styles.chartWrapper}>
        {renderTitle()}
        {data.length > 0 ? (<BarChart
          data={chartData}
          barWidth={40}
          spacing={8}
          xAxisThickness={1}
          xAxisColor='white'
          yAxisThickness={1}
          yAxisColor='white'
          yAxisTextStyle={{ color: 'white' }}
          initialSpacing={20}
          noOfSections={3}
          showFractionalValues
          showYAxisIndices
          isAnimated
          isThreeD
          maxValue={maxValue}
        />) : ''}


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
            <TouchableOpacity style={[styles.botonesBot,styles.botonesFlexBox]} onPress={clearDates}>
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
  chartWrapper: {
    paddingBottom: 40,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 26,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: 'lightgray',
  },
  topLabelText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },

  botonesBotnPrincipalParent: {
    marginTop: percentHeight(2),
    alignSelf: "stretch",
    alignItems: "center"
  },
  iniciarSesin: {
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fafafa"
  },
  botonesBotnPrincipal: {
    backgroundColor: "#e20a17"
  },
  botonesBot: {
    backgroundColor: "transparent",
    borderWidth:1,
    borderColor:"white"
  },
  iniciarSesinTypo: {
    textAlign: "left",
    fontSize: 16
  },
  botonesFlexBox: {
    paddingHorizontal: percentWidth(8),
    justifyContent: "center",
    paddingVertical: percentHeight(1.5),
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    marginBottom:8
  },
});

export default EstadisticasView;

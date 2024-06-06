import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { BackButton } from '../../../components/components';
import { RootStackParamListRoute } from '../../../navigations/routes/app_routes';
import LayoutPrimary from '../../../components/layouts/layout_primary';
import { BarChart } from "react-native-gifted-charts";

type ConfiguracionViewNavigationProp = StackNavigationProp<RootStackParamListRoute>;

interface Props {
  navigation: ConfiguracionViewNavigationProp;
}

const EstadisticasView: React.FC<Props> = ({ navigation }) => {
  const data = [
    {
      "date__year": 2024,
      "date__month": 5,
      "download": 899.65,
      "upload": 57.93
    },
    {
      "date__year": 2024,
      "date__month": 6,
      "download": 72.7,
      "upload": 3.25
    }
  ];

  // Transformamos los datos para el BarChart
  const chartData = data.flatMap(item => [
    {
      value: item.download,
      label: `${item.date__month}/${item.date__year}`,
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6', // Color para las descargas
      labelTextStyle: { color: 'white' }
    },
    {
      value: item.upload,
      label: '',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9', // Color para las subidas
      labelTextStyle: { color: 'white' }
    }
  ]);

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
    </View>
  );

  const EstadisticasComponent = () => (
    <View style={styles.container}>
      <BackButton title={'Uso de Datos'} />
      <View style={styles.chartWrapper}>
        {renderTitle()}
        <BarChart
          data={chartData}
          barWidth={30}
          spacing={12}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: 'white' }}
          noOfSections={4}
          // maxValue={5000}
          showFractionalValues
          showYAxisIndices
          isAnimated
          isThreeD
          showValuesAsTopLabel
        />
      </View>
    </View>
  );

  return (
    <LayoutPrimary>
      <EstadisticasComponent />
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
    marginTop: 16,
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
});

export default EstadisticasView;

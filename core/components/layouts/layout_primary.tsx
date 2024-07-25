import * as React from "react";
import {Image, StyleSheet, Text, View, ImageBackground} from "react-native";

const LayoutPrimary = (props: any) => {
  	
  	return (
    		<ImageBackground style={styles.androidLarge3} resizeMode="cover" source={require("../../assets/fondo2.png")}>
      			
                  {props.children}
			<View style={styles.rectangleView}>
			<Text style={styles.gNetworkAppVersin}>G-network app versión 1.0.0</Text>
			</View>
    		</ImageBackground>);
};

const styles = StyleSheet.create({
  	


  	androidLarge3: {
    		flex: 1,
    		width: "100%",
    		height: "100%",
    		overflow: "hidden"
  	},
	  rectangleView: {
		backgroundColor: "#90908f",
		width: "100%",
		height: 20,
		alignItems:'center'
		},
		gNetworkAppVersin: {
			marginTop:3,
			fontSize: 10,
			fontFamily: "Roboto-Regular",
			color: "#fafafa",
			textAlign: "left"
			}
});

export default LayoutPrimary;

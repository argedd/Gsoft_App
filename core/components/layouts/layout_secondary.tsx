import * as React from "react";
import {Image, StyleSheet, Text, View, ImageBackground} from "react-native";

const LayoutSecondary = (props: any) => {
  	
  	return (
    		<ImageBackground style={styles.androidLarge3} resizeMode="cover" source={require("../../assets/Fondo1.png")}>
      			
                  {props.children}
      		
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
		fontSize: 10,
		fontFamily: "Roboto-Regular",
		color: "#fafafa",
		textAlign: "left"
		}
});

export default LayoutSecondary;

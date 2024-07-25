import * as React from "react";
import {Image, StyleSheet, Text, View, ImageBackground} from "react-native";

const Layout = (props: any) => {
  	
  	return (
    		<View style={styles.androidLarge3}  >
      			
                  {props.children}
			<View style={styles.rectangleView}>
			<Text style={styles.gNetworkAppVersin}>G-network app versión 1.0.0</Text>
			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	


  	androidLarge3: {
    		flex: 1,
    		width: "100%",
    		height: "100%",
    		overflow: "hidden",
            backgroundColor:"#1e1e1e"
            
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

export default Layout;

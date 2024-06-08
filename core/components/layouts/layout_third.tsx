import * as React from "react";
import {Image, StyleSheet, Text, View, ImageBackground} from "react-native";

const LayoutThird = (props: any) => {
  	
  	return (
    		<ImageBackground style={styles.androidLarge3} resizeMode="cover" source={require("../../assets/fondo3.png")}>
      			
                  {props.children}
      		
    		</ImageBackground>);
};

const styles = StyleSheet.create({
  	


  	androidLarge3: {
    		flex: 1,
    		width: "100%",
    		height: "100%",
    		overflow: "hidden"
  	}
});

export default LayoutThird;

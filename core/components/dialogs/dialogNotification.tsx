import * as React from "react";
import { View, Modal, StyleSheet } from "react-native";
import LayoutThird from "../layouts/layout_third";

interface DialogComponentProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DialogNotificationComponent: React.FC<DialogComponentProps> = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
     
   <LayoutThird>
    <View>
    {children}

    </View>
   </LayoutThird>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity to create a dim effect
  },
  modalView: {
    backgroundColor: "rgba(80, 80, 79, 0.9)",
    borderRadius: 16,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DialogNotificationComponent;

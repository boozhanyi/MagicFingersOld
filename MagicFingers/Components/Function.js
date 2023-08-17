import React, { useState } from "react";
import { StyleSheet, View, Pressable, Image, Modal, Text } from "react-native";
import { deleteDrawing, favouriteDrawings } from "../BackEnd/Firebase";

export default function ProjectFucntion({ isVisible, onClose, projects }) {
  const [deleteButton, pressedButtonDelete] = useState(false);

  const deleteProject = () => {
    pressedButtonDelete(true);
  };

  const confirmDelete = async () => {
    pressedButtonDelete(false);
    await deleteDrawing(projects);
    onClose();
  };

  const starProject = async () => {
    await favouriteDrawings(projects);
    onClose();
  };

  const cancelDelete = () => {
    pressedButtonDelete(false);
  };

  return (
    isVisible && (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {deleteButton && (
          <Modal animationType="fade" transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Confirm your deletion!</Text>
                </View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#A3FFFE" : "#B9B9B9",
                    },
                    styles.confirmButton,
                  ]}
                  onPress={confirmDelete}
                >
                  <Text style={styles.text}>Confirm</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#A3FFFE" : "#B9B9B9",
                    },
                    styles.cancelButton,
                  ]}
                  onPress={cancelDelete}
                >
                  <Text style={styles.text}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
        <View pointerEvents="box-none" style={styles.overlayView}>
          <View style={styles.functionButton}>
            <Pressable onPress={deleteProject} style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/Delete.png")}
                style={{ width: 24, height: 24 }}
              />
            </Pressable>
          </View>
          <View style={styles.functionButton}>
            <Pressable style={{ alignItems: "center" }} onPress={starProject}>
              <Image
                source={require("../assets/Star.png")}
                style={{ width: 24, height: 24 }}
              />
            </Pressable>
          </View>
          <View style={styles.functionButton}>
            <Pressable onPress={onClose} style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/Close.png")}
                style={{ width: 24, height: 24 }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  overlayView: {
    position: "absolute",
    bottom: 5,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#E9FFFF",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    elevation: 10,
  },
  functionButton: {
    marginLeft: 20,
    marginRight: 10,
    alignItems: "center",
  },
  confirmDeleteContainer: {
    width: "90%",
    padding: 35,
    backgroundColor: "#F0FDFF",
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    padding: 35,
    backgroundColor: "#F0FDFF",
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontWeight: "bold",
  },
  titleContainer: {
    borderRadius: 30,
    marginTop: 10,
  },
  textInputContainer: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 10,
  },
  text: {
    fontWeight: "bold",
  },
  confirmButton: {
    marginTop: 30,
    width: "60%",
    height: 40,
    marginLeft: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    marginTop: 10,
    width: "60%",
    height: 40,
    marginLeft: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

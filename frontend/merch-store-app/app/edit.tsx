import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button, Card, Dialog, TextInput } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { IMerch, Merch } from "@/interface/type";
import { router, useLocalSearchParams } from "expo-router";
import { deleteMerch, getMerch, updateMerch } from "@/api/merch.api";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const EditScreen = () => {
  const [merchName, setMerchName] = useState("");
  const [merchDescription, setMerchDescription] = useState("");
  const [merchPrice, setMerchPrice] = useState("");
  const [merchQuantity, setMerchQuantity] = useState("");
  const [merchImage, setMerchImage] = useState("");
  const [merch_id, setMerch_id] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const { _id } = useLocalSearchParams();

  useEffect(() => {
    setMerch_id(_id as string);
    fetchMerch();
  }, []);

  const fetchMerch = async () => {
    try {
      const response = await getMerch(_id as string);
      const merch = response.data as IMerch;
      setMerchName(merch.name);
      setMerchDescription(merch.description);
      setMerchPrice(merch.price);
      setMerchQuantity(merch.quantity);
      setMerchImage(merch.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handPriceChange = (text: string) => {
    if (/^\d*(\.\d{0,2})?$/.test(text)) {
      setMerchPrice(text);
    }
  };

  const handQuantityChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setMerchQuantity(text);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMerchImage(result.assets[0].uri);

      if (Platform.OS !== "web") {
        const base64Image = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: "base64",
          }
        );
        setMerchImage(`data:image/jpeg;base64,${base64Image}`);
      }
    }
  };

  const handleEditMerch = async () => {
    const merch: Merch = {
      name: merchName,
      description: merchDescription,
      price: merchPrice,
      quantity: merchQuantity,
      image: merchImage,
    };
    if (
      !merch.name ||
      !merch.description ||
      !merch.price ||
      !merch.quantity ||
      !merch.image
    ) {
      Platform.OS === "web"
        ? alert("Please fill all fields")
        : ToastAndroid.show("Please fill all fields", ToastAndroid.SHORT);
      return;
    }
    try {
      const response = await updateMerch(merch_id, merch);
      if (response.status === 200) {
        Platform.OS === "web"
          ? alert("Merch updated successfully")
          : ToastAndroid.show("Merch updated successfully", ToastAndroid.SHORT);

        console.log();
        setMerchName("");
        setMerchDescription("");
        setMerchPrice("");
        setMerchQuantity("");
        setMerchImage("");

        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);

  const handleDeleteMerch = async () => {
    try {
      const response = await deleteMerch(merch_id);
      if (response.status === 200) {
        Platform.OS === "web"
          ? alert("Merch deleted successfully")
          : ToastAndroid.show("Merch deleted successfully", ToastAndroid.SHORT);
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Edit Merch" />
          <Appbar.Action
            icon={() => (
              <MaterialCommunityIcons
                name="delete-variant"
                size={22}
                color="black"
              />
            )}
            onPress={() => showDialog()}
          />
        </Appbar.Header>
      </View>
      <ScrollView style={styles.scrollView}>
        <TextInput
          label={"Merch Name"}
          value={merchName}
          onChangeText={setMerchName}
          style={styles.input}
          mode="outlined"
          placeholder="Enter Merch Name"
        />
        <TextInput
          label={"Merch Description"}
          value={merchDescription}
          onChangeText={setMerchDescription}
          multiline
          style={styles.multilineInput}
          mode="outlined"
          placeholder="Enter Description"
        />
        <View style={styles.row}>
          <TextInput
            label={"Merch Price"}
            value={merchPrice}
            onChangeText={handPriceChange}
            keyboardType="decimal-pad"
            style={styles.rowInput}
            mode="outlined"
            placeholder="Enter Merch Price"
            maxLength={9}
          />
          <TextInput
            label={"Merch Quantity"}
            value={merchQuantity}
            onChangeText={handQuantityChange}
            keyboardType="numeric"
            mode="outlined"
            placeholder="Enter Merch Quantity"
            maxLength={5}
            style={styles.rowInput}
          />
        </View>
        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          {merchImage && (
            <Image source={{ uri: merchImage }} style={styles.image} />
          )}
          <View style={styles.chosesImage}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.item_image_picker}
            >
              <Image
                style={styles.icon}
                source={require("../assets/images/image.png")}
              />
              <Text>{merchImage ? "Change Image" : "Chose Image"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleEditMerch}
        >
          Save
        </Button>
      </ScrollView>
      <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Delete Merch</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure you want to delete this merch?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={handleDeleteMerch}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  appbar: {
    width: "100%",
    backgroundColor: "white",
  },
  scrollView: {
    marginHorizontal: 20,
    width: "100%",
  },
  input: {
    margin: 10,
  },
  multilineInput: {
    margin: 10,
    height: 150,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  chosesImage: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "black",
  },
  icon: {
    width: 25,
    height: 25,
  },
  item_image_picker: {
    width: 150,
    height: 150,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 10,
  },
});

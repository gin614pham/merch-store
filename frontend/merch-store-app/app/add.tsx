import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Merch } from "@/interface/type";
import * as ImagePicker from "expo-image-picker";
import { storeMerch } from "@/api/merch.api";
import { router } from "expo-router";
import * as FileSystem from "expo-file-system";

const add = () => {
  const [merchName, setMerchName] = useState("");
  const [merchDescription, setMerchDescription] = useState("");
  const [merchPrice, setMerchPrice] = useState("");
  const [textMerchQuantity, setTextMerchQuantity] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handPriceChange = (text: string) => {
    if (/^\d*(\.\d{0,2})?$/.test(text)) {
      setMerchPrice(text);
    }
  };

  const handQuantityChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setTextMerchQuantity(text);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      if (Platform.OS !== "web") {
        const base64Image = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: "base64",
          }
        );
        setImage(`data:image/jpeg;base64,${base64Image}`);
      }
    }
  };

  const handleAddMerch = async () => {
    const merch: Merch = {
      name: merchName,
      description: merchDescription,
      price: merchPrice,
      quantity: textMerchQuantity,
      image: image || "",
    };
    // console.log(merch);
    try {
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

      const response = await storeMerch(merch);
      if (response.status === 201) {
        Platform.OS === "web"
          ? alert("Merch added successfully")
          : ToastAndroid.show("Merch added successfully", ToastAndroid.SHORT);

        setMerchName("");
        setMerchDescription("");
        setMerchPrice("");
        setTextMerchQuantity("");
        setImage(null);
        router.push("/home");
      } else {
        Platform.OS === "web"
          ? alert("Failed to add merch")
          : ToastAndroid.show("Failed to add merch", ToastAndroid.SHORT);
        console.log(response.data);
      }
    } catch (error) {
      //   console.error("Error adding merch:", error);
      Platform.OS === "web"
        ? alert("Failed to add merch")
        : ToastAndroid.show("Failed to add merch 1", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
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
            value={textMerchQuantity}
            onChangeText={handQuantityChange}
            keyboardType="numeric"
            mode="outlined"
            placeholder="Enter Merch Quantity"
            maxLength={5}
            style={styles.rowInput}
          />
        </View>
        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.chosesImage}>
            <TouchableOpacity
              onPress={pickImage}
              style={styles.item_image_picker}
            >
              <Image
                style={styles.icon}
                source={require("../assets/images/image.png")}
              />
              <Text>{image ? "Change Image" : "Chose Image"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button mode="contained" style={styles.button} onPress={handleAddMerch}>
          Add Merch
        </Button>
      </ScrollView>
    </View>
  );
};

export default add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderWidth: 1,
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

import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import colors from "../colors";
import CustomButton from "./Button";
import { extractNumber } from "./converToNumber";
const ImagePickerExample: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasPermission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({ class: "", confidence: "" });
  const pickImageFromGallary = async () => {
    // Request camera roll permissions (if needed)
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to pick an image.");
      return;
    }

    // Launch image library for selection
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, // Adjust quality as needed (0-1)
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image" + error.message);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    const filename = "file"; // Set the desired file name

    console.log(selectedImage);

    const newImageUri = "file:///" + selectedImage.split("file:/").join("");
    // Create a blob object from the image URI (if necessary)

    formData.append(filename, {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://arafath10-safras-ml-api.hf.space/predict",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data", // Important for multipart uploads
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();

      const confidence = extractNumber(data.confidence);
      console.log(confidence);

      console.log(data.class_name);

      const resultClass =
        confidence < 0.8
          ? "probably the image is not a mango"
          : data.class_name;
      console.log(resultClass);

      alert(
        `class name : ${resultClass} & the confidence is : ${extractNumber(
          data.confidence
        )}`
      );
      setSelectedImage(null); // Optionally clear the image selection
      setIsLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload. Please try again.");
    }
  };

  return (
    <>
      <Text
        style={{ color: colors.whiteColor, fontSize: 18, fontWeight: "500" }}
      >
        Upload an image
      </Text>
      <View style={styles.selectFileContianer}>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: "100%", borderRadius: 20 }}
          />
        ) : (
          <TouchableOpacity
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={pickImageFromGallary}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../assets/gallery.png")}
            />
            <Text style={{ fontSize: 16, color: colors.whiteColor }}>
              Select Image
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.verticalBarContainer}>
        <View style={styles.verticalBarTextContainer}>
          <Text style={styles.verticalBarText}>or</Text>
        </View>
        <View style={styles.verticalBar} />
      </View>
      <View style={{ marginVertical: 15, width: "100%" }}>
        <CustomButton
          name="Open Camera & Take Photo"
          foreGround={colors.whiteColor}
          backgroundColor={colors.grayColor}
          iconName="camera"
          onPress={takePicture}
        />
      </View>

      <View style={{ marginVertical: 15, width: "100%" }}>
        <CustomButton
          name="Continue"
          onPress={handleUpload}
          disabled={!selectedImage}
        />
      </View>
      <Spinner
        textStyle={styles.loadingText}
        visible={isLoading}
        overlayColor="rgba(0, 0, 0, 0.75)"
        textContent="loading..."
      />
    </>
  );
};

const styles = StyleSheet.create({
  selectFileContianer: {
    width: "100%",
    aspectRatio: 1.5 / 1,
    borderColor: colors.primaryColor,
    borderWidth: 3,
    borderRadius: 20,
    marginVertical: 15,
    backgroundColor: colors.grayColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  verticalBarContainer: {
    position: "relative",
    width: "100%",
    marginVertical: 15,
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  verticalBar: {
    width: "100%",
    height: 1,
    backgroundColor: colors.grayColor,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    zIndex: 1,
  },
  verticalBarTextContainer: {
    position: "absolute",
    backgroundColor: colors.grayColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 10,
    borderRadius: 10,
  },
  verticalBarText: {
    color: colors.whiteColor,
  },
  loadingText: {
    color: colors.whiteColor,
    fontSize: 14,
  },
});

export default ImagePickerExample;

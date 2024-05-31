import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../../colors";
import ImagePickerExample from "../../components/ImagePicker";

const Scan: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        style="light"
      />
      <View style={styles.container}>
        <ImagePickerExample />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.navyBlue,
    padding: 10,
  },
});

export default Scan;

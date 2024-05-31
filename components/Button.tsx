import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Touchable } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import colors from "../colors";
interface ButtonProps {
  name: string;
  backgroundColor?: string;
  foreGround?: string;
  iconName?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  name,
  backgroundColor,
  foreGround,
  iconName,
  onPress,
  disabled,
}) => {
  const background = backgroundColor ? backgroundColor : "#3DED97";
  const textColor = foreGround ? foreGround : colors.whiteColor;
  return (
    <TouchableOpacity
      style={{
        ...styles.buttonContainer,
        backgroundColor: background,
        pointerEvents: disabled ? "none" : "auto",
      }}
      onPress={onPress}
    >
      {iconName && (
        <Icon
          name={iconName}
          size={24}
          color={colors.whiteColor}
          style={{ marginRight: 5 }}
        />
      )}
      <Text style={{ ...styles.text, color: textColor }}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    borderRadius: 50,
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomButton;

import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export function useThemeColor(props, colorName) {
  const theme = useColorScheme() ?? "light"; 
  const colorFromProps = props?.[theme];

  if (colorFromProps) {
    return colorFromProps; 
  } else if (Colors[theme] && Colors[theme][colorName]) {
    return Colors[theme][colorName]; 
  } else {
    console.warn(`Color '${colorName}' is not defined for theme '${theme}'.`);
    
    return theme === "light" ? "#ffffff" : "#000000"; 
  }
}

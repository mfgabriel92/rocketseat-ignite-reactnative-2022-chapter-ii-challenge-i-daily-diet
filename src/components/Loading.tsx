import { Center, useTheme } from "native-base";
import { ActivityIndicator } from "react-native";

function Loading() {
  const { colors } = useTheme();

  return (
    <Center flex="1">
      <ActivityIndicator color={colors.gray[700]} size={38} />
    </Center>
  );
}

export { Loading };

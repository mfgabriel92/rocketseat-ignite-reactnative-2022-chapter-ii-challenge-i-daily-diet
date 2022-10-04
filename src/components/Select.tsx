import { Text, VStack } from "native-base";
import { Label } from "./Label";
import { Pressable } from "./Pressable";

interface SelectProps {
  label: string;
  value?: string;
  onPress: () => void;
}

function Select({ label, value, onPress }: SelectProps) {
  return (
    <VStack flex="1" height="12">
      <Label label={label} />
      <Pressable
        height="12"
        colorScheme="gray"
        borderRadius="8"
        borderWidth="1"
        borderColor="gray.300"
        justifyContent="center"
        onPress={onPress}
      >
        <Text>{value}</Text>
      </Pressable>
    </VStack>
  );
}

export { Select };

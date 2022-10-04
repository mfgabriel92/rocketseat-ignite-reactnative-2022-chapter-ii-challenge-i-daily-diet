import { Text } from "native-base";

interface LabelProps {
  label: string;
}

function Label({ label }: LabelProps) {
  return (
    <Text fontFamily="heading" fontSize="xs">
      {label}
    </Text>
  );
}

export { Label };

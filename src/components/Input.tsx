import { IInputProps as NBIInputProps, Input as NBInput, VStack } from "native-base";
import { Label } from "./Label";

interface InputProps extends NBIInputProps {
  label: string;
}

function Input({ label, ...rest }: InputProps) {
  return (
    <VStack width="full" space="1">
      <Label label={label} />
      <NBInput borderColor="gray.300" borderRadius="8" {...rest}></NBInput>
    </VStack>
  );
}

export { Input };

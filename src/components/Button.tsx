import { Ionicons } from "@expo/vector-icons";
import { Button as NBButton, IButtonProps as NBIButtonProps, Icon } from "native-base";
import { ReactNode } from "react";

interface ButtonProps extends NBIButtonProps {
  icon: string;
  children: ReactNode;
}

function Button({ icon, children, ...rest }: ButtonProps) {
  return (
    <NBButton
      leftIcon={<Icon as={Ionicons} name={icon} size="sm" fontWeight="bold" />}
      colorScheme="gray"
      borderRadius="8"
      height="12"
      _loading={{
        backgroundColor: "gray.500",
        color: "gray.700",
      }}
      {...rest}
    >
      {children}
    </NBButton>
  );
}

export { Button };

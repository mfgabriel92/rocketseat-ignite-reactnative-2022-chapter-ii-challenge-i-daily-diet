import { Pressable as NBPressable, IPressableProps as NBIPressableProps } from "native-base";
import { ReactNode } from "react";

interface PressableProps extends NBIPressableProps {
  children?: ReactNode;
  colorScheme?: string;
}

function Pressable({ colorScheme = "green", children, ...rest }: PressableProps) {
  return (
    <NBPressable
      padding="2"
      borderRadius="full"
      _pressed={{
        backgroundColor: `${colorScheme}.100`,
      }}
      {...rest}
    >
      {children}
    </NBPressable>
  );
}

export { Pressable };

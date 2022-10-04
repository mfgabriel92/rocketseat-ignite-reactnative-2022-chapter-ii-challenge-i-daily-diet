import { IStackProps, VStack } from "native-base";
import { ReactNode } from "react";

interface PageBodyProps extends IStackProps {
  children: ReactNode;
}

function PageBody({ children, ...rest }: PageBodyProps) {
  return (
    <VStack
      flex="1"
      padding="6"
      paddingTop="8"
      borderTopLeftRadius="18"
      borderTopRightRadius="18"
      marginTop="-3"
      backgroundColor="white"
      alignItems="center"
      space="6"
      {...rest}
    >
      {children}
    </VStack>
  );
}

export { PageBody };

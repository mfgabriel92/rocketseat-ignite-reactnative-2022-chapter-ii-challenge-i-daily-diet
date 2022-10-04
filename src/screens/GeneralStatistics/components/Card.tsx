import { VStack, IStackProps, Text } from "native-base";

interface CardProps extends IStackProps {
  variant?: "gray" | "green" | "red";
  title: string;
  value: number;
}

function Card({ variant = "gray", title, value, ...rest }: CardProps) {
  return (
    <VStack
      width="full"
      borderRadius="6"
      padding="4"
      space="2"
      alignItems="center"
      backgroundColor={`${variant}.100`}
      {...rest}
    >
      <Text fontFamily="heading" fontSize="xl">
        {value}
      </Text>
      <Text>{title}</Text>
    </VStack>
  );
}

export { Card };

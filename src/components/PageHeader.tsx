import { useNavigation } from "@react-navigation/native";
import { HStack, IStackProps, Pressable, Text, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { ReactNode } from "react";
import { useWindowDimensions } from "react-native";

interface PageHeaderProps extends IStackProps {
  children: ReactNode;
}

function PageHeader({ children, ...rest }: PageHeaderProps) {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { height } = useWindowDimensions();
  const headerHeight = height * 0.15;

  return (
    <HStack
      backgroundColor="gray.300"
      height={`${headerHeight}px`}
      alignItems="center"
      justifyContent="center"
      space="4"
      padding="6"
      {...rest}
    >
      <Pressable colorScheme="gray" paddingTop="6" onPress={goBack}>
        <ArrowLeft color={colors.gray[700]} size={24} />
      </Pressable>
      <Text
        flex="1"
        justifyContent="center"
        fontFamily="heading"
        fontSize="md"
        color="gray.700"
        paddingTop="6"
      >
        {children}
      </Text>
    </HStack>
  );
}

export { PageHeader };

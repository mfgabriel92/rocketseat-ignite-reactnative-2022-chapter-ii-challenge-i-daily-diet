import logo from "@assets/logo.png";
import { Avatar, HStack, Image } from "native-base";

function Header() {
  return (
    <HStack
      width="full"
      justifyContent="space-between"
      alignItems="center"
      padding="6"
      paddingTop="10"
    >
      <Image source={logo} width={82} alt="Daily Diet" />
      <Avatar borderWidth="2" borderColor="gray.700">
        LI
      </Avatar>
    </HStack>
  );
}

export { Header };

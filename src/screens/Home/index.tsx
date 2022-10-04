import { Header } from "@components/Header";
import { Summary } from "@components/Summary";
import { Column } from "native-base";
import { Meals } from "./components/Meals";

function Home() {
  return (
    <>
      <Header />
      <Column flex="1" paddingX="6" paddingBottom="0" space="8">
        <Summary />
        <Meals />
      </Column>
    </>
  );
}

export { Home };

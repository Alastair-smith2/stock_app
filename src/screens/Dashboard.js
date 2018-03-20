import Stock from "./Stock";
import Exchange from "./Exchange";

import { TabNavigator, TabBarTop } from "react-navigation";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
export default TabNavigator(
  {
    Stock: { screen: Stock },
    Exchange: { screen: Exchange }
  },
  {
    // default to top on android, bottom on iOS, fine as it is
    // tabBarPosition: "top",
    // default to the top component on android, bottom on iOS, prefer the top component
    tabBarComponent: TabBarTop,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#D3D3D3",
      style: {
        backgroundColor: "#EA572D"
      }
    }
  }
);

import { createStackNavigator } from '@react-navigation/stack';
import KeepLadysMoodCharmEntry from '../keepladysmoodsc/KeepLadysMoodCharmEntry';
import KeepLadysMoodHome from '../keepladysmoodsc/KeepLadysMoodHome';
import KeepLadysMoodAccount from '../keepladysmoodsc/KeepLadysMoodAccount';
import KeepLadysMoodAbout from '../keepladysmoodsc/KeepLadysMoodAbout';
import KeepLadysMoodSettings from '../keepladysmoodsc/KeepLadysMoodSettings';
import KeepLadysMoodCreateMemory from '../keepladysmoodsc/KeepLadysMoodCreateMemory';
import KeepLadysMoodCharmMemoriesList from '../keepladysmoodsc/KeepLadysMoodCharmMemoriesList';
import KeepLadysMoodCreateMemoryDetails from '../keepladysmoodsc/KeepLadysMoodCreateMemoryDetails';

const Stack = createStackNavigator();

const Keepladysmoodstack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="KeepLadysMoodCharmEntry"
        component={KeepLadysMoodCharmEntry}
      />
      <Stack.Screen name="KeepLadysMoodHome" component={KeepLadysMoodHome} />
      <Stack.Screen
        name="KeepLadysMoodAccount"
        component={KeepLadysMoodAccount}
      />
      <Stack.Screen name="KeepLadysMoodAbout" component={KeepLadysMoodAbout} />
      <Stack.Screen
        name="KeepLadysMoodSettings"
        component={KeepLadysMoodSettings}
      />
      <Stack.Screen
        name="KeepLadysMoodCreateMemory"
        component={KeepLadysMoodCreateMemory}
      />
      <Stack.Screen
        name="KeepLadysMoodCharmMemoriesList"
        component={KeepLadysMoodCharmMemoriesList}
      />
      <Stack.Screen
        name="KeepLadysMoodCreateMemoryDetails"
        component={KeepLadysMoodCreateMemoryDetails}
      />
    </Stack.Navigator>
  );
};

export default Keepladysmoodstack;

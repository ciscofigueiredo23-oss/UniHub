import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/Home/HomeScreen';
import CustomNavBar from '../components/CustomNavBar/CustomNavBar';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
    return (
        <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{ 
            headerShown: false,
        }}
        tabBar ={(props) => <CustomNavBar {...props}/>}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
        </Tab.Navigator>

)}

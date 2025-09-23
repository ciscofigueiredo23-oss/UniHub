import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/Home/HomeScreen';
import CustomNavBar from '../components/CustomNavBar/CustomNavBar';
import SubjectsScreen from '../pages/Subjects/SubjectsScreen';
import GradeScreen from '../pages/Grade/GradeScreen';
import ConfigScreen from '../pages/Config/ConfigScreen';

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
            <Tab.Screen
                name="Disciplinas"
                component={SubjectsScreen}
            />
            <Tab.Screen
                name="Grade"
                component={GradeScreen}
            />
            <Tab.Screen
                name="Config"
                component={ConfigScreen}
            />
        </Tab.Navigator>

)}

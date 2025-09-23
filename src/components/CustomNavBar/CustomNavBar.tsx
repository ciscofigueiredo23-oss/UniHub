import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {  BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { themes } from '../../global/themes';
import { Octicons } from '@expo/vector-icons';
import  Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import { CustomNavBarStyles } from './CustomNavBarStyles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const activeColor = themes.colors.blueDark;
const inactiveColor = themes.colors.background;


const CustomNavBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {

  return (
    <View style={CustomNavBarStyles.container}>
      {state.routes.map((route, index) => {

        console.log('route', route);

        if (['_sitemap', "+not-found"].includes(route.name)) return null;
        

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };


        return (
          <AnimatedTouchable  
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[CustomNavBarStyles.tabItem, {backgroundColor: isFocused ? inactiveColor : 'transparent'}]}
          >
            {getIconByRouteName(route.name, isFocused ? activeColor : inactiveColor)}
            {isFocused && <Animated.Text entering={FadeIn.duration(200)} exiting={FadeIn.duration(200)} style={CustomNavBarStyles.text}>
              {label as string}
            </Animated.Text>}
          </AnimatedTouchable>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName: string, color: string) {
    switch (routeName) {
      case 'Home':
        return <Octicons name="home" size={24} color={color} />;
      case 'Disciplinas':
        return <Octicons name="book" size={24} color={color} />;
      case 'Grade':
        return <Octicons name="calendar" size={24} color={color} />;
      case 'Config':
        return <Octicons name="gear" size={24} color={color} />;
    }
  } 
};

export default CustomNavBar;


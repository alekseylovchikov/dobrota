import Expo from 'expo';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
// screens
import HomeScreen from './screens/HomeScreen';
import AnimalListScreen from './screens/AnimalListScreen';
import CreateNewItemScreen from './screens/CreateNewItemScreen';
import SuccessScreen from './screens/SuccessScreen';

const colors = {
	mainColor: '#fff'
};

const headerStyle = {
	paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
	backgroundColor: '#faf4e9',
};

export default StackNavigator({
	HomeScreen: {
		screen: HomeScreen,
		navigationOptions: {
			title: 'Главная',
			headerPressColorAndroid: colors.mainColor,
			gesturesEnabled: true,
			headerStyle,
		}
	},
	AnimalListScreen: {
		screen: AnimalListScreen,
		navigationOptions: {
			title: 'Список объявлений',
			headerPressColorAndroid: colors.mainColor,
			gesturesEnabled: true,
			headerStyle,
		}
	},
	CreateNewItemScreen: {
		screen: CreateNewItemScreen,
		navigationOptions: {
			title: 'Разместить объявление',
			headerPressColorAndroid: colors.mainColor,
			gesturesEnabled: true,
			headerStyle,
		}
	},
	SuccessScreen: {
		screen: SuccessScreen,
		navigationOptions: {
			title: 'Спасибо!',
			headerPressColorAndroid: colors.mainColor,
			gesturesEnabled: true,
			headerStyle,
		}
	}
});

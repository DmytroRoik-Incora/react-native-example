
import { Dimensions, Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const smallScreens = Dimensions.get('window').height < 600;
export const mediumScreens = Dimensions.get('window').height <= 730;
export const bigScreens = Dimensions.get('window').height > 730;
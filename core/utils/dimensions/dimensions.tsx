// utils/dimensions.ts
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const percentWidth = (percentage: number) => (width * percentage) / 100;
export const percentHeight = (percentage: number) => (height * percentage) / 100;

export const screenWidth = width;
export const screenHeight = height;

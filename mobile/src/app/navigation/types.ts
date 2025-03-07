import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Login: undefined;
    Town: undefined;
    PlayerInfo: undefined;
    QuestLog: undefined;
    Skills: undefined;
    Nutrition: undefined;
};

// Type augmentation for React Navigation
declare module '@react-navigation/native' {
    type RootParamList = RootStackParamList;
} 
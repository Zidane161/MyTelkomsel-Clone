import React, { Component, useLayoutEffect } from 'react'
import { SafeAreaView, StyleSheet} from 'react-native'
import { WebView } from 'react-native-webview'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type props = {
    route: RouteProp<RootStackParamList, 'WebView'>;
    navigation: StackNavigationProp<RootStackParamList, 'WebView'>;
};

export default function WebViewScreen({ route }: props) {
    const { url, title } = route.params;
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (title) {
            navigation.setOptions({ title });
        }
    }, [navigation, title]);
    return (
        <SafeAreaView style={styles.container}>
            <WebView source={{ uri: url}} startInLoadingState />
        </SafeAreaView>
    ); 
}
const styles = StyleSheet.create({
    container: { flex: 1},
});
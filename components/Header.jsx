import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Header () {
    const navigation = useNavigation();

    return (
        <View style={styles.navbar}>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>SFE</Text>
                </View>
                {(navigation.getState().routes.some(route => route.name.includes('applications') || route.name.includes('cities'))) && (
                    <TouchableOpacity onPress={goHome} style={styles.homeBtn}>
                        <Image source={homeBtn} style={styles.homeBtnImage} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#000000',
        width: '100%',
        height: 70,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 55,
        height: 55,
        backgroundColor: '#CF0000',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    logoText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'Arial',
    }
});

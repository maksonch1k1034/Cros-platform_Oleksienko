import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ total, done }) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Coffee First Mobile</Text>
            <Text style={styles.stats}>
                Усього товарів: {total}  ·  Обрано: {done}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#7c2d12',
        textAlign: 'center',
        marginBottom: 8,
    },
    stats: {
        fontSize: 16,
        color: '#78716c',
        textAlign: 'center',
        marginBottom: 20,
    },
});
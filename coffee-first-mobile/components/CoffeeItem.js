import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CoffeeItem({ coffee, onToggle, onDelete }) {
    return (
        <View style={[styles.item, coffee.done && styles.itemDone]}>
            <TouchableOpacity
                style={styles.textContainer}
                onPress={() => onToggle(coffee.id)}
                activeOpacity={0.7}
            >
                <Text style={[styles.title, coffee.done && styles.textDone]}>
                    {coffee.text}
                </Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{coffee.category || 'Кава'}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(coffee.id)}
            >
                <Text style={styles.deleteButtonText}>Видалити</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fffbeb',
        borderColor: '#fde68a',
        borderWidth: 1,
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
    },
    itemDone: {
        backgroundColor: '#dcfce7',
        borderColor: '#86efac',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#292524',
    },
    badge: {
        backgroundColor: '#fef3c7',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#92400e',
    },
    textDone: {
        textDecorationLine: 'line-through',
        color: '#166534',
    },
    deleteButton: {
        backgroundColor: '#ef4444',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
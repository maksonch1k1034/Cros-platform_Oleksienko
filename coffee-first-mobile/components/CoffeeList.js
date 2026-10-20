import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CoffeeItem from './CoffeeItem';

export default function CoffeeList({ coffees, onToggle, onDelete }) {
    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Меню кав'ярні</Text>

            {coffees.length === 0 ? (
                <Text style={styles.emptyText}>
                    Позицій у меню поки немає. Додайте першу!
                </Text>
            ) : (
                <>
                    <Text style={styles.hintText}>
                        Торкніться позиції, щоб відмітити як обрану.
                    </Text>
                    <FlatList
                        data={coffees}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => (
                            <CoffeeItem
                                coffee={item}
                                onToggle={onToggle}
                                onDelete={onDelete}
                            />
                        )}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.listContent}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
    },
    hintText: {
        fontSize: 13,
        color: '#64748b',
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        marginVertical: 20,
    },
    listContent: {
        paddingBottom: 10,
    },
});
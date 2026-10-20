import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const CATEGORIES = ['Кава', 'Чай', 'Десерт', 'Сезонне'];

export default function CoffeeForm({ onAdd }) {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Кава');

    const handleAdd = () => {
        if (onAdd(text, category)) {
            setText('');
            setCategory('Кава');
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Додати позицію в меню</Text>

            <TextInput
                style={styles.input}
                placeholder="Введіть назву напою чи десерту"
                placeholderTextColor="#94a3b8"
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleAdd}
                returnKeyType="done"
            />

            <View style={styles.categoryRow}>
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.categoryChip,
                            category === cat && styles.categoryChipSelected,
                        ]}
                        onPress={() => setCategory(cat)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                category === cat && styles.categoryTextSelected,
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>Додати до меню</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
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
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        color: '#0f172a',
        marginBottom: 12,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    categoryChip: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 12,
        backgroundColor: '#fef3c7',
    },
    categoryChipSelected: {
        backgroundColor: '#b45309',
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#92400e',
    },
    categoryTextSelected: {
        color: '#ffffff',
    },
    addButton: {
        backgroundColor: '#b45309',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
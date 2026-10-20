import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './components/Header';
import CoffeeForm from './components/CoffeeForm';
import CoffeeList from './components/CoffeeList';

export default function App() {
  const [coffees, setCoffees] = useState([
    { id: '1', text: 'Капучино', category: 'Кава', done: false },
    { id: '2', text: 'Айс-лате', category: 'Кава', done: false },
    { id: '3', text: 'Тістечко Чізкейк', category: 'Десерт', done: true },
  ]);

  const addCoffee = (text, category) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      Alert.alert('Помилка', 'Введіть назву напою чи десерту!');
      return false;
    }

    const newCoffee = {
      id: Date.now().toString(),
      text: trimmedText,
      category: category,
      done: false,
    };

    setCoffees((current) => [newCoffee, ...current]);
    Alert.alert('Успіх', 'Позицію успішно додано до меню!');
    return true;
  };

  const toggleCoffee = (id) => {
    setCoffees((current) =>
        current.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item
        )
    );
  };

  const deleteCoffee = (id) => {
    setCoffees((current) => current.filter((item) => item.id !== id));
    Alert.alert('Видалення', 'Позицію видалено з меню кав\'ярні.');
  };

  const doneCount = coffees.filter((item) => item.done).length;

  return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#eff6ff" />
        <View style={styles.container}>
          <Header total={coffees.length} done={doneCount} />
          <CoffeeForm onAdd={addCoffee} />
          <CoffeeList
              coffees={coffees}
              onToggle={toggleCoffee}
              onDelete={deleteCoffee}
          />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});І

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories as defaultCategories } from '../data/vocab';

const VocabContext = createContext();

export const useVocab = () => useContext(VocabContext);

export const VocabProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load data on startup
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const stored = await AsyncStorage.getItem('aac_vocab_v1');
            if (stored) {
                setCategories(JSON.parse(stored));
            } else {
                setCategories(defaultCategories);
            }
        } catch (e) {
            console.error("Failed to load vocab", e);
            setCategories(defaultCategories);
        } finally {
            setLoading(false);
        }
    };

    const saveData = async (newCategories) => {
        setCategories(newCategories);
        try {
            await AsyncStorage.setItem('aac_vocab_v1', JSON.stringify(newCategories));
        } catch (e) {
            console.error("Failed to save vocab", e);
        }
    };

    // --- Actions ---

    const addCategory = (name, emoji) => {
        const newCat = {
            id: Date.now().toString(), // Simple unique ID
            name,
            emoji: emoji || '📁',
            items: []
        };
        saveData([...categories, newCat]);
    };

    const deleteCategory = (id) => {
        const newCats = categories.filter(c => c.id !== id);
        saveData(newCats);
    };

    const addItemToCategory = (categoryId, item) => {
        const newCats = categories.map(cat => {
            if (cat.id === categoryId) {
                return { ...cat, items: [...cat.items, item] };
            }
            return cat;
        });
        saveData(newCats);
    };

    const deleteItemFromCategory = (categoryId, itemIndex) => {
        console.log(`[VocabContext] Deleting item ${itemIndex} from category ${categoryId}`);
        const newCats = categories.map(cat => {
            // Use loose equality (==) to handle potential string/number mismatches
            if (cat.id == categoryId) {
                const newItems = [...cat.items];
                if (itemIndex >= 0 && itemIndex < newItems.length) {
                    newItems.splice(itemIndex, 1);
                    return { ...cat, items: newItems };
                } else {
                    console.warn(`[VocabContext] Invalid index ${itemIndex} for category ${categoryId}`);
                }
            }
            return cat;
        });
        saveData(newCats);
    };

    return (
        <VocabContext.Provider value={{
            categories,
            loading,
            addCategory,
            deleteCategory,
            addItemToCategory,
            deleteItemFromCategory
        }}>
            {children}
        </VocabContext.Provider>
    );
};

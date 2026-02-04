
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { categories } from '../data/vocab';
import { Ionicons } from '@expo/vector-icons';
import SentenceBar from '../components/SentenceBar';

export default function HomeScreen({ navigation, theme, textSize, isKeyboardMode }) {

    return (
        <View style={{ flex: 1, backgroundColor: theme.bg }}>
            {/* Optional: Show SentenceBar on Home too if desired, or just in Category */}
            <SentenceBar
                theme={theme}
                isKeyboardMode={isKeyboardMode}
                textSize={textSize}
            />

            <ScrollView contentContainerStyle={{ padding: 15 }}>
                <Text style={[styles.title, { color: theme.text, fontSize: textSize * 1.5 }]}>Categorii</Text>
                <View style={styles.grid}>
                    {categories.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.catCard,
                                { backgroundColor: theme.card, borderColor: theme.border }
                            ]}
                            onPress={() => navigation.navigate('Category', { category: cat })}
                        >
                            <Text style={[styles.catEmoji, { fontSize: textSize * 2.5 }]}>
                                {cat.id === 'core' ? '⭐' :
                                    cat.id === 'actions' ? '🏃' :
                                        cat.id === 'food' ? '🍎' :
                                            cat.id === 'feelings' ? '😊' :
                                                cat.id === 'body' ? '✋' :
                                                    cat.id === 'clothes' ? '👕' :
                                                        cat.id === 'places' ? '🏠' :
                                                            '❓'}
                            </Text>
                            <Text style={[styles.catText, { color: theme.text, fontSize: textSize * 1.2 }]}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontWeight: '800', marginBottom: 20, marginLeft: 5 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
    catCard: {
        width: 130, height: 130, borderRadius: 20, borderWidth: 2,
        alignItems: 'center', justifyContent: 'center',
        elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1,
    },
    catEmoji: { marginBottom: 10 },
    catText: { fontWeight: 'bold' }
});

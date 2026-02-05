import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useVocab } from '../context/VocabContext';
import { Ionicons } from '@expo/vector-icons';
import SentenceBar from '../components/SentenceBar';
import ScaleButton from '../components/ScaleButton';
import FadeInView from '../components/FadeInView';

export default function HomeScreen({ navigation, theme, textSize, isKeyboardMode }) {
    const { categories } = useVocab();

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
                        <FadeInView key={index} delay={index * 50}>
                            <ScaleButton
                                style={[
                                    styles.catCard,
                                    { backgroundColor: theme.card, borderColor: theme.border }
                                ]}
                                onPress={() => navigation.navigate('Category', { categoryId: cat.id })}
                            >
                                <Text style={[styles.catEmoji, { fontSize: textSize * 2.5 }]}>
                                    {cat.emoji || '❓'}
                                </Text>
                                <Text style={[styles.catText, { color: theme.text, fontSize: textSize * 1.2 }]}>{cat.name}</Text>
                            </ScaleButton>
                        </FadeInView>
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

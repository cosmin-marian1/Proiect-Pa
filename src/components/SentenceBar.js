
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useSentence } from '../context/SentenceContext';
import { getBorderColor } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function SentenceBar({ theme, isKeyboardMode, textSize }) {
    const { sentence, deleteLast, clearSentence, speakFullSentence } = useSentence();
    const [customText, setCustomText] = useState('');

    // Local helper for custom text speech
    const speakCustom = () => {
        Speech.speak(customText, { language: 'ro-RO' });
    };

    return (
        <View style={[styles.sentenceBarContainer, { backgroundColor: theme.bar }]}>

            <View style={[styles.displayArea, { backgroundColor: theme.inputBg }]}>
                {isKeyboardMode ? (
                    <TextInput
                        style={[styles.inputField, { color: theme.text, fontSize: textSize * 1.2 }]}
                        placeholder="Scrie mesajul tau..."
                        placeholderTextColor={theme.subText}
                        value={customText}
                        onChangeText={setCustomText}
                        onSubmitEditing={speakCustom}
                    />
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 5 }}>
                        {sentence.length === 0 ? (
                            <Text style={{ color: theme.subText, fontStyle: 'italic', fontSize: textSize }}>Atinge imaginile de jos...</Text>
                        ) : (
                            sentence.map((item, index) => (
                                <View key={index} style={[styles.miniCard, { borderColor: getBorderColor(item.type), backgroundColor: theme.card }]}>
                                    {item.image ? (
                                        <Image source={{ uri: item.image }} style={styles.miniImage} />
                                    ) : (
                                        <Text style={{ fontSize: 30, marginBottom: 2 }}>{item.emoji || '❓'}</Text>
                                    )}
                                    <Text style={[styles.miniText, { color: theme.text }]}>{item.label}</Text>
                                </View>
                            ))
                        )}
                    </ScrollView>
                )}
            </View>

            <View style={styles.sentenceActions}>
                <TouchableOpacity onPress={deleteLast} style={[styles.actionBtn, { backgroundColor: '#fab1a0' }]}>
                    <Ionicons name="backspace" size={24} color="#d63031" />
                </TouchableOpacity>

                <TouchableOpacity onPress={clearSentence} style={[styles.actionBtn, { backgroundColor: '#ff7675' }]}>
                    <Ionicons name="trash" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={isKeyboardMode ? speakCustom : speakFullSentence}
                    style={[styles.actionBtn, { backgroundColor: '#55efc4', flex: 1.5, flexDirection: 'row', gap: 5 }]}
                >
                    <Ionicons name="volume-high" size={24} color="#00b894" />
                    <Text style={[styles.actionBtnText, { color: '#00b894', fontSize: textSize }]}>VORBESTE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sentenceBarContainer: {
        padding: 10,
        elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1,
        zIndex: 9, flexDirection: 'column', gap: 10
    },
    displayArea: {
        height: 80, borderRadius: 15, flexDirection: 'row', alignItems: 'center',
        padding: 5, overflow: 'hidden'
    },
    inputField: { flex: 1, height: '100%', paddingHorizontal: 15, fontWeight: 'bold' },
    miniCard: {
        width: 65, height: 70, marginRight: 8, borderWidth: 2, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center', elevation: 1
    },
    miniImage: { width: 35, height: 35, marginBottom: 2 },
    miniText: { fontSize: 11, fontWeight: 'bold' },
    sentenceActions: { flexDirection: 'row', gap: 10, height: 50 },
    actionBtn: {
        flex: 1, borderRadius: 12, justifyContent: 'center', alignItems: 'center',
        elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2
    },
    actionBtnText: { fontWeight: '900', letterSpacing: 1 },
});

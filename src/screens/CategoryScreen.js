
import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useSentence } from '../context/SentenceContext';
import { getBorderColor } from '../constants/theme';
import SentenceBar from '../components/SentenceBar';

export default function CategoryScreen({ route, navigation, theme, textSize, isKeyboardMode }) {
    const { category } = route.params;
    const { addToSentence } = useSentence();

    useLayoutEffect(() => {
        navigation.setOptions({ title: category.name });
    }, [navigation, category]);

    return (
        <View style={{ flex: 1, backgroundColor: theme.bg }}>
            {!isKeyboardMode && (
                <SentenceBar
                    theme={theme}
                    isKeyboardMode={isKeyboardMode}
                    textSize={textSize}
                />
            )}

            {isKeyboardMode ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <SentenceBar
                        theme={theme}
                        isKeyboardMode={isKeyboardMode}
                        textSize={textSize}
                    />
                    <Text style={{ fontSize: textSize * 1.5, color: theme.subText, marginTop: 20 }}>
                        Mod tastatura activ
                    </Text>
                </View>
            ) : (
                <View style={styles.gridArea}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                        <View style={styles.grid}>
                            {category.items.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.card,
                                        { borderColor: getBorderColor(item.type), backgroundColor: theme.card }
                                    ]}
                                    onPress={() => addToSentence(item)}
                                >
                                    {item.image ? (
                                        <Image source={{ uri: item.image }} style={styles.cardImage} />
                                    ) : (
                                        <Text style={{ fontSize: 60, marginBottom: 10 }}>{item.emoji || '❓'}</Text>
                                    )}
                                    <Text style={[styles.cardText, { color: theme.text, fontSize: textSize * 1.1 }]}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    gridArea: { flex: 1, padding: 15 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
    card: {
        width: 140, height: 140, borderRadius: 20, borderWidth: 4,
        alignItems: 'center', justifyContent: 'center',
        elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15,
    },
    cardImage: { width: 75, height: 75, marginBottom: 8, resizeMode: 'contain' },
    cardText: { fontWeight: '700', textAlign: 'center' },
});

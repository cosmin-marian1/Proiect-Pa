
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';

export default function SettingsModal({
    visible, onClose, theme,
    textSizeMode, setTextSizeMode,
    voicePitch, setVoicePitch,
    speechRate, setSpeechRate,
    availableVoices, selectedVoice, setSelectedVoice,
    onOpenAdmin
}) {

    const testVoice = () => {
        const text = "Salut, așa sună noua ta voce.";
        Speech.speak(text, {
            language: 'ro-RO',
            rate: speechRate,
            pitch: voicePitch,
            voice: selectedVoice ? selectedVoice.identifier : undefined
        });
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: theme.modalBg }]}>
                    <ScrollView>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: theme.text }]}>Setari</Text>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={{ fontSize: 24, color: theme.subText }}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Setare: Marime Text */}
                        <View style={styles.settingRow}>
                            <Text style={[styles.settingLabel, { color: theme.text }]}>Marime Text:</Text>
                            <View style={styles.settingOptions}>
                                {['small', 'normal', 'large'].map((mode) => (
                                    <TouchableOpacity
                                        key={mode}
                                        style={[
                                            styles.optionBtn,
                                            textSizeMode === mode && { backgroundColor: theme.accent }
                                        ]}
                                        onPress={() => setTextSizeMode(mode)}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            textSizeMode === mode ? { color: '#fff' } : { color: theme.text }
                                        ]}>
                                            {mode === 'small' ? 'Mic' : mode === 'normal' ? 'Normal' : 'Mare'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.separator} />

                        {/* Setare: Voce (List) */}
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Personalizare Voce</Text>

                        <View style={styles.settingRow}>
                            <Text style={[styles.settingLabel, { color: theme.text }]}>Selecteaza Vocea:</Text>
                            <ScrollView style={{ height: 100, borderWidth: 1, borderColor: theme.border, borderRadius: 10 }}>
                                {availableVoices.map((v) => (
                                    <TouchableOpacity
                                        key={v.identifier}
                                        style={[
                                            styles.voiceItem,
                                            selectedVoice?.identifier === v.identifier && { backgroundColor: theme.activeCat }
                                        ]}
                                        onPress={() => setSelectedVoice(v)}
                                    >
                                        <Text style={{ color: theme.text }}>{v.name}</Text>
                                        {selectedVoice?.identifier === v.identifier && <Text style={{ color: theme.accent }}> ✓</Text>}
                                    </TouchableOpacity>
                                ))}
                                {availableVoices.length === 0 && <Text style={{ padding: 10, color: theme.subText }}>Nicio voce romana gasita.</Text>}
                            </ScrollView>
                        </View>

                        {/* Setare: Ton (Slider) */}
                        <View style={styles.settingRow}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.settingLabel, { color: theme.text }]}>Tonalitate (Pitch):</Text>
                                <Text style={{ color: theme.subText }}>{voicePitch.toFixed(1)}</Text>
                            </View>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0.5}
                                maximumValue={2.0}
                                step={0.1}
                                value={voicePitch}
                                onValueChange={setVoicePitch}
                                minimumTrackTintColor={theme.accent}
                                maximumTrackTintColor={theme.subText}
                                thumbTintColor={theme.accent}
                            />
                        </View>

                        {/* Setare: Viteza (Slider) */}
                        <View style={styles.settingRow}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.settingLabel, { color: theme.text }]}>Viteza (Rate):</Text>
                                <Text style={{ color: theme.subText }}>{speechRate.toFixed(1)}</Text>
                            </View>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0.5}
                                maximumValue={1.5}
                                step={0.1}
                                value={speechRate}
                                onValueChange={setSpeechRate}
                                minimumTrackTintColor={theme.accent}
                                maximumTrackTintColor={theme.subText}
                                thumbTintColor={theme.accent}
                            />
                        </View>

                        <View style={styles.separator} />

                        <TouchableOpacity
                            style={[styles.testBtn, { borderColor: theme.accent, backgroundColor: theme.activeCat }]}
                            onPress={onOpenAdmin}
                        >
                            <Text style={{ color: theme.accent, fontWeight: 'bold' }}>🛠️ Administrare Vocabular</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.testBtn, { borderColor: theme.accent }]}
                            onPress={testVoice}
                        >
                            <Text style={{ color: theme.accent, fontWeight: 'bold' }}>🔊 Testeaza Vocea</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.closeModalBtn, { backgroundColor: theme.inputBg }]}
                            onPress={onClose}
                        >
                            <Text style={{ fontWeight: 'bold', color: theme.text }}>Inchide</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'
    },
    modalContent: {
        width: '90%', maxHeight: '80%', padding: 20, borderRadius: 20, elevation: 10
    },
    modalHeader: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20
    },
    modalTitle: { fontSize: 24, fontWeight: 'bold' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
    settingRow: { marginBottom: 20 },
    settingLabel: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
    settingOptions: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    optionBtn: {
        flex: 1, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc',
        alignItems: 'center'
    },
    optionText: { fontWeight: 'bold' },
    closeModalBtn: {
        padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10
    },
    voiceItem: {
        padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between'
    },
    testBtn: {
        padding: 12, borderRadius: 10, borderWidth: 2, alignItems: 'center', marginBottom: 10, marginTop: 5
    },
    separator: { height: 1, backgroundColor: '#ccc', marginVertical: 10 }
});

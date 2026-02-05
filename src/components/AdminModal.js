import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useVocab } from '../context/VocabContext';
import CustomAlert from './CustomAlert';

export default function AdminModal({ visible, onClose, theme }) {
    const { categories, addCategory, addItemToCategory, deleteCategory, deleteItemFromCategory } = useVocab();
    const [activeTab, setActiveTab] = useState('word'); // 'word' | 'category' | 'manage'

    // Alert State
    const [alertConfig, setAlertConfig] = useState({ visible: false, title: '', message: '', type: 'info', onConfirm: () => { } });

    const showAlert = (title, message, type = 'info', onConfirm = () => { }) => {
        setAlertConfig({ visible: true, title, message, type, onConfirm });
    };

    const closeAlert = () => {
        setAlertConfig(prev => ({ ...prev, visible: false }));
    };

    // Form States
    const [newItemLabel, setNewItemLabel] = useState('');
    const [newItemEmoji, setNewItemEmoji] = useState('');
    const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || '');
    const [newItemType, setNewItemType] = useState('object');

    const [newCatName, setNewCatName] = useState('');
    const [newCatEmoji, setNewCatEmoji] = useState('');

    const handleAddWord = () => {
        if (!newItemLabel || !newItemEmoji || !selectedCatId) {
            showAlert("Eroare", "Te rog completează toate câmpurile.", 'info');
            return;
        }
        addItemToCategory(selectedCatId, {
            label: newItemLabel,
            emoji: newItemEmoji,
            type: newItemType
        });
        showAlert("Succes", "Cuvânt adăugat!", 'info');
        setNewItemLabel('');
        setNewItemEmoji('');
    };

    const handleAddCategory = () => {
        if (!newCatName || !newCatEmoji) {
            showAlert("Eroare", "Nume și Emoji necesare.", 'info');
            return;
        }
        addCategory(newCatName, newCatEmoji);
        showAlert("Succes", "Categorie creată!", 'info');
        setNewCatName('');
        setNewCatEmoji('');
    };

    const confirmDeleteCat = (id) => {
        showAlert("Șterge Categorie", "Sigur vrei să ștergi această categorie?", 'confirm', () => {
            deleteCategory(id);
        });
    };

    // Helper to render type selector
    const renderTypeOption = (type, label, color) => (
        <TouchableOpacity
            onPress={() => setNewItemType(type)}
            style={[
                styles.typeBtn,
                { backgroundColor: newItemType === type ? color : theme.card, borderColor: color }
            ]}
        >
            <Text style={{ color: newItemType === type ? '#fff' : theme.text }}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <View style={[styles.modalContent, { backgroundColor: theme.modalBg }]}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.text }]}>Administrare Vocabular</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={28} color={theme.text} />
                        </TouchableOpacity>
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabs}>
                        <TouchableOpacity onPress={() => setActiveTab('word')} style={[styles.tab, activeTab === 'word' && styles.activeTab]}>
                            <Text style={{ color: theme.text }}>Cuvânt Nou</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('category')} style={[styles.tab, activeTab === 'category' && styles.activeTab]}>
                            <Text style={{ color: theme.text }}>Categorie Nouă</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setActiveTab('manage')} style={[styles.tab, activeTab === 'manage' && styles.activeTab]}>
                            <Text style={{ color: theme.text }}>Șterge</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        {activeTab === 'word' && (
                            <View style={{ gap: 15 }}>
                                <Text style={{ color: theme.subText }}>Selectează Categoria:</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
                                    {categories.map(cat => (
                                        <TouchableOpacity
                                            key={cat.id}
                                            onPress={() => setSelectedCatId(cat.id)}
                                            style={[
                                                styles.catChoice,
                                                { backgroundColor: selectedCatId === cat.id ? theme.accent : theme.card, borderColor: theme.border }
                                            ]}
                                        >
                                            <Text style={{ fontSize: 20 }}>{cat.emoji}</Text>
                                            <Text style={{ color: selectedCatId === cat.id ? '#fff' : theme.text }}>{cat.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                                <Text style={{ color: theme.subText }}>Emoji (Iconiță):</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, fontSize: 30, textAlign: 'center' }]}
                                    value={newItemEmoji}
                                    onChangeText={setNewItemEmoji}
                                    placeholder="🍎"
                                    placeholderTextColor={theme.subText}
                                />

                                <Text style={{ color: theme.subText }}>Nume Cuvânt:</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text }]}
                                    value={newItemLabel}
                                    onChangeText={setNewItemLabel}
                                    placeholder="Ex: Măr"
                                    placeholderTextColor={theme.subText}
                                />

                                <Text style={{ color: theme.subText }}>Tip Gramatical (Culoare):</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                                    {renderTypeOption('subject', 'Subiect (Galben)', '#f1c40f')}
                                    {renderTypeOption('action', 'Acțiune (Verde)', '#2ecc71')}
                                    {renderTypeOption('object', 'Obiect (Portocaliu)', '#e67e22')}
                                    {renderTypeOption('descriptor', 'Descriere (Albastru)', '#3498db')}
                                    {renderTypeOption('social', 'Social (Roz)', '#9b59b6')}
                                </View>

                                <TouchableOpacity onPress={handleAddWord} style={[styles.saveBtn, { backgroundColor: theme.accent }]}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Adaugă Cuvânt</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {activeTab === 'category' && (
                            <View style={{ gap: 15 }}>
                                <Text style={{ color: theme.subText }}>Emoji Categorie:</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, fontSize: 30, textAlign: 'center' }]}
                                    value={newCatEmoji}
                                    onChangeText={setNewCatEmoji}
                                    placeholder="📂"
                                    placeholderTextColor={theme.subText}
                                />
                                <Text style={{ color: theme.subText }}>Nume Categorie:</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text }]}
                                    value={newCatName}
                                    onChangeText={setNewCatName}
                                    placeholder="Ex: Natură"
                                    placeholderTextColor={theme.subText}
                                />
                                <TouchableOpacity onPress={handleAddCategory} style={[styles.saveBtn, { backgroundColor: theme.accent }]}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Creează Categorie</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {activeTab === 'manage' && (
                            <View style={{ gap: 10 }}>
                                {categories.map(cat => (
                                    <View key={cat.id} style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: theme.border, paddingBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold' }}>{cat.emoji} {cat.name}</Text>
                                            <TouchableOpacity onPress={() => confirmDeleteCat(cat.id)} style={{ padding: 5 }}>
                                                <Ionicons name="trash" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>

                                        {/* List items for this category to allow deleting individual words */}
                                        <View style={{ marginTop: 10, paddingLeft: 10 }}>
                                            {cat.items.map((item, index) => (
                                                <View key={`${cat.id}-${index}-${item.label}`} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
                                                    <Text style={{ color: theme.text, fontSize: 16 }}>{item.emoji} {item.label}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            showAlert("Sterge Cuvant", `Sigur stergi "${item.label}"?`, 'confirm', () => {
                                                                deleteItemFromCategory(cat.id, index);
                                                            });
                                                        }}
                                                        style={{ padding: 10, backgroundColor: theme.inputBg, borderRadius: 20 }}
                                                    >
                                                        <Ionicons name="close" size={20} color="red" />
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                            {cat.items.length === 0 && <Text style={{ color: theme.subText, fontStyle: 'italic' }}>Niciun cuvânt.</Text>}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </ScrollView>

                    <CustomAlert
                        visible={alertConfig.visible}
                        title={alertConfig.title}
                        message={alertConfig.message}
                        type={alertConfig.type}
                        onConfirm={() => {
                            if (alertConfig.onConfirm) alertConfig.onConfirm();
                            closeAlert();
                        }}
                        onCancel={closeAlert}
                    />

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '90%', height: '80%', borderRadius: 20, overflow: 'hidden' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
    title: { fontSize: 20, fontWeight: 'bold' },
    tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' },
    tab: { flex: 1, padding: 15, alignItems: 'center' },
    activeTab: { borderBottomWidth: 3, borderBottomColor: '#0984e3' },
    input: { padding: 15, borderRadius: 10, borderWidth: 1, borderColor: 'transparent', marginBottom: 10 },
    catChoice: { padding: 10, borderRadius: 10, borderWidth: 1, marginRight: 10, alignItems: 'center' },
    typeBtn: { padding: 8, borderRadius: 20, borderWidth: 1, marginBottom: 5 },
    saveBtn: { padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    manageRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1 }
});

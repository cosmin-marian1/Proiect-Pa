
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomAlert({ visible, title, message, onConfirm, onCancel, type = 'confirm' }) {
    // type: 'confirm' (Yes/No) or 'info' (OK)

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttons}>
                        {type === 'confirm' && (
                            <TouchableOpacity onPress={onCancel} style={[styles.btn, styles.cancelBtn]}>
                                <Text style={styles.cancelText}>Nu</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={onConfirm}
                            style={[
                                styles.btn,
                                styles.confirmBtn,
                                type === 'info' && { width: '100%' }
                            ]}
                        >
                            <Text style={styles.confirmText}>{type === 'confirm' ? 'Da' : 'OK'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center', alignItems: 'center'
    },
    alertBox: {
        width: '80%', padding: 20, backgroundColor: '#fff',
        borderRadius: 15, elevation: 10, alignItems: 'center'
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    message: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' },
    buttons: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', gap: 10 },
    btn: {
        flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center'
    },
    cancelBtn: { backgroundColor: '#f1f2f6' },
    confirmBtn: { backgroundColor: '#0984e3' },
    cancelText: { fontWeight: 'bold', color: '#636e72', fontSize: 16 },
    confirmText: { fontWeight: 'bold', color: '#fff', fontSize: 16 }
});

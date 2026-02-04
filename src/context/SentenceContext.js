
import React, { createContext, useState, useContext } from 'react';
import * as Speech from 'expo-speech';

const SentenceContext = createContext();

export const useSentence = () => useContext(SentenceContext);

export const SentenceProvider = ({ children, settings }) => {
    const [sentence, setSentence] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = (text) => {
        if (isSpeaking) return;

        setIsSpeaking(true);
        Speech.speak(text, {
            language: 'ro-RO',
            rate: settings.speechRate,
            pitch: settings.voicePitch,
            voice: settings.selectedVoice ? settings.selectedVoice.identifier : undefined,
            onDone: () => setIsSpeaking(false),
            onStopped: () => setIsSpeaking(false),
            onError: () => setIsSpeaking(false)
        });
    };

    const addToSentence = (item) => {
        setSentence(prev => [...prev, item]);
        speak(item.label);
    };

    const deleteLast = () => {
        setSentence(prev => prev.slice(0, -1));
    };

    const clearSentence = () => {
        setSentence([]);
    };

    const speakFullSentence = () => {
        const textToSpeak = sentence.map(item => item.label).join(' ');
        if (textToSpeak) speak(textToSpeak);
    };

    return (
        <SentenceContext.Provider value={{
            sentence,
            addToSentence,
            deleteLast,
            clearSentence,
            speakFullSentence,
            isSpeaking
        }}>
            {children}
        </SentenceContext.Provider>
    );
};

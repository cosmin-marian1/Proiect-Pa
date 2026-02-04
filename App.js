
import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { themes } from './src/constants/theme';
import { SentenceProvider } from './src/context/SentenceContext';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import SettingsModal from './src/components/SettingsModal';
import { injectWebCss } from './src/utils/webStyles';

const Stack = createNativeStackNavigator();

export default function App() {
  injectWebCss(); // Inject scrollbar styles for Web

  // --- STATE-URI GLOBALE (Setari) ---
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [speechRate, setSpeechRate] = useState(0.9);
  const [voicePitch, setVoicePitch] = useState(1.0);
  const [textSizeMode, setTextSizeMode] = useState('normal');

  // Voice Settings
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        const roVoices = voices.filter(v => v.language.includes('ro'));
        setAvailableVoices(roVoices.length > 0 ? roVoices : voices); // Fallback
        if (roVoices.length > 0) setSelectedVoice(roVoices[0]);
      } catch (e) {
        console.log("Error fetching voices:", e);
      }
    };
    fetchVoices();
  }, []);

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  // Calcul marime font
  const getFontSize = (baseSize) => {
    if (textSizeMode === 'large') return baseSize * 1.3;
    if (textSizeMode === 'small') return baseSize * 0.8;
    return baseSize;
  };
  const baseTextSize = getFontSize(14); // O marime de referinta

  const settings = { speechRate, voicePitch, selectedVoice };

  return (
    <SentenceProvider settings={settings}>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={currentTheme.bar}
        />

        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: currentTheme.bar },
            headerTintColor: currentTheme.text,
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setIsKeyboardMode(!isKeyboardMode)}>
                  <Ionicons
                    name="keypad"
                    size={24}
                    color={isKeyboardMode ? currentTheme.accent : currentTheme.text}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
                  <Text style={{ fontSize: 20 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsSettingsOpen(true)}>
                  <Ionicons name="settings-sharp" size={24} color={currentTheme.text} />
                </TouchableOpacity>
              </View>
            ),
            contentStyle: { backgroundColor: currentTheme.bg }
          })}
        >
          <Stack.Screen name="Home">
            {(props) => (
              <HomeScreen
                {...props}
                theme={currentTheme}
                textSize={baseTextSize}
                isKeyboardMode={isKeyboardMode}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Category">
            {(props) => (
              <CategoryScreen
                {...props}
                theme={currentTheme}
                textSize={baseTextSize}
                isKeyboardMode={isKeyboardMode}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>

        <SettingsModal
          visible={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          theme={currentTheme}
          textSizeMode={textSizeMode} setTextSizeMode={setTextSizeMode}
          voicePitch={voicePitch} setVoicePitch={setVoicePitch}
          speechRate={speechRate} setSpeechRate={setSpeechRate}
          availableVoices={availableVoices}
          selectedVoice={selectedVoice} setSelectedVoice={setSelectedVoice}
        />

      </NavigationContainer>
    </SentenceProvider>
  );
}
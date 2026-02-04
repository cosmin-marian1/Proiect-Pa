
import { Platform } from 'react-native';

export const injectWebCss = () => {
    if (Platform.OS === 'web') {
        const style = document.createElement('style');
        style.textContent = `
      body {
        scrollbar-width: thin;
        scrollbar-color: #485460 #1e272e;
      }
      ::-webkit-scrollbar {
        width: 12px;
      }
      ::-webkit-scrollbar-track {
        background: #1e272e; 
      }
      ::-webkit-scrollbar-thumb {
        background-color: #485460;
        border-radius: 20px;
        border: 3px solid #1e272e;
      }
    `;
        document.head.appendChild(style);
    }
};

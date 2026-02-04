export const themes = {
    light: {
        bg: '#f8f9fa',
        sidebar: '#ffffff',
        card: '#ffffff',
        text: '#2d3436',
        subText: '#636e72',
        bar: '#ffffff',
        border: '#dfe6e9',
        accent: '#0984e3',
        inputBg: '#f1f2f6',
        activeCat: '#e1f5fe',
        modalBg: '#ffffff'
    },
    dark: {
        bg: '#121212',
        sidebar: '#1E1E1E',
        card: '#1E1E1E',
        text: '#E0E0E0',
        subText: '#A0A0A0',
        bar: '#1E1E1E',
        border: '#333333',
        accent: '#4dabf7',
        inputBg: '#2C2C2C',
        activeCat: '#2C3E50',
        modalBg: '#1E1E1E'
    }
};

export const getBorderColor = (type) => {
    switch (type) {
        case 'subject': return '#f1c40f';
        case 'action': return '#2ecc71';
        case 'object': return '#e67e22';
        case 'descriptor': return '#3498db';
        case 'social': return '#e84393';
        case 'urgent': return '#e74c3c';
        default: return '#bdc3c7';
    }
};

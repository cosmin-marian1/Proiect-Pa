
// --- DATA: VOCABULAR AAC (COMUNICARE ALTERNATIVA) ---
// Expert Review: Structure optimized for child development logic.
// Visuals: All items use Emojis for consistent, reliable, offline visual feedback.
// Type Coding (Fitzgerald Key):
// - subject (E.g. Eu, Cine) -> Yellow
// - action (E.g. Vreau, Merg) -> Green
// - object (E.g. Tableta, Apa) -> Orange
// - descriptor (E.g. Rosu, Mare) -> Blue
// - social (E.g. Da, Nu) -> Pink/Purple
// - urgent (E.g. Ajutor) -> Red

export const categories = [
    {
        id: 'core', name: 'Esențial', emoji: '⭐',
        items: [
            { label: 'Eu', type: 'subject', emoji: '🧑' },
            { label: 'Vreau', type: 'action', emoji: '🤲' },
            { label: 'Mai mult', type: 'descriptor', emoji: '➕' }, // "More" is often early vocab
            { label: 'Gata', type: 'descriptor', emoji: '🏁' },      // "All done"
            { label: 'Nu', type: 'social', emoji: '❌' },
            { label: 'Da', type: 'social', emoji: '✅' },
            { label: 'Ajutor', type: 'urgent', emoji: '🆘' },
            { label: 'Pauză', type: 'social', emoji: '✋' },
            { label: 'Unde', type: 'descriptor', emoji: '❓' },
        ]
    },
    {
        id: 'toys', name: 'Jucării', emoji: '🧸',
        items: [
            { label: 'Mă joc', type: 'action', emoji: '🎮' },
            { label: 'Tabletă', type: 'object', emoji: '📱' },
            { label: 'Minge', type: 'object', emoji: '⚽' },
            { label: 'Păpușă', type: 'object', emoji: '🎎' },
            { label: 'Mașinuță', type: 'object', emoji: '🚗' },
            { label: 'Lego', type: 'object', emoji: '🧱' },
            { label: 'Baloane', type: 'object', emoji: '🎈' },
            { label: 'Pluș', type: 'object', emoji: '🧸' },
            { label: 'Cuburi', type: 'object', emoji: '🧊' },
        ]
    },
    {
        id: 'food', name: 'Mâncare', emoji: '🍎',
        items: [
            { label: 'Mănânc', type: 'action', emoji: '🍽️' },
            { label: 'Beau', type: 'action', emoji: '🥤' },
            { label: 'Apă', type: 'object', emoji: '💧' },
            { label: 'Măr', type: 'object', emoji: '🍎' },
            { label: 'Banană', type: 'object', emoji: '🍌' },
            { label: 'Ciocolată', type: 'object', emoji: '🍫' },
            { label: 'Pâine', type: 'object', emoji: '🍞' },
            { label: 'Lapte', type: 'object', emoji: '🥛' },
            { label: 'Suc', type: 'object', emoji: '🧃' },
            { label: 'Sandviș', type: 'object', emoji: '🥪' },
            { label: 'Paste', type: 'object', emoji: '🍝' },
        ]
    },
    {
        id: 'activities', name: 'Activități', emoji: '🏃',
        items: [
            { label: 'Merg', type: 'action', emoji: '🚶' },
            { label: 'Alerg', type: 'action', emoji: '🏃' },
            { label: 'Sar', type: 'action', emoji: '🦘' },
            { label: 'Dorm', type: 'action', emoji: '😴' },
            { label: 'Mă spăl', type: 'action', emoji: '🧼' },
            { label: 'Desenez', type: 'action', emoji: '🖍️' },
            { label: 'Citesc', type: 'action', emoji: '📖' },
            { label: 'Mă uit', type: 'action', emoji: '👀' },
            { label: 'Dansez', type: 'action', emoji: '💃' },
        ]
    },
    {
        id: 'animals', name: 'Animale', emoji: '🐶',
        items: [
            { label: 'Câine', type: 'object', emoji: '🐶' },
            { label: 'Pisică', type: 'object', emoji: '🐱' },
            { label: 'Cal', type: 'object', emoji: '🐴' },
            { label: 'Vacă', type: 'object', emoji: '🐮' },
            { label: 'Porc', type: 'object', emoji: '🐷' },
            { label: 'Pasăre', type: 'object', emoji: '🐦' },
            { label: 'Pește', type: 'object', emoji: '🐟' },
            { label: 'Urs', type: 'object', emoji: '🐻' },
        ]
    },
    {
        id: 'people', name: 'Oameni', emoji: '👨‍👩‍👧',
        items: [
            { label: 'Mami', type: 'subject', emoji: '👩' },
            { label: 'Tati', type: 'subject', emoji: '👨' },
            { label: 'Buni', type: 'subject', emoji: '👵' },
            { label: 'Bunicu', type: 'subject', emoji: '👴' },
            { label: 'Bebe', type: 'subject', emoji: '👶' },
            { label: 'Doamna', type: 'subject', emoji: '👩‍🏫' }, // Educatoarea
            { label: 'Doctor', type: 'subject', emoji: '👨‍⚕️' },
        ]
    },
    {
        id: 'colors', name: 'Culori & Forme', emoji: '🎨',
        items: [
            { label: 'Roșu', type: 'descriptor', emoji: '🔴' },
            { label: 'Albastru', type: 'descriptor', emoji: '🔵' },
            { label: 'Verde', type: 'descriptor', emoji: '🟢' },
            { label: 'Galben', type: 'descriptor', emoji: '🟡' },
            { label: 'Portocaliu', type: 'descriptor', emoji: '🟠' },
            { label: 'Mov', type: 'descriptor', emoji: '🟣' },
            { label: 'Rotund', type: 'descriptor', emoji: '⚪' },
            { label: 'Pătrat', type: 'descriptor', emoji: '🟧' },
        ]
    },
    {
        id: 'time', name: 'Timp', emoji: '⏳',
        items: [
            { label: 'Acum', type: 'descriptor', emoji: '👇' },
            { label: 'Mai târziu', type: 'descriptor', emoji: '⏳' },
            { label: 'Azi', type: 'descriptor', emoji: '📅' },
            { label: 'Mâine', type: 'descriptor', emoji: '🔜' },
            { label: 'Dimineață', type: 'descriptor', emoji: '🌅' },
            { label: 'Noapte', type: 'descriptor', emoji: '🌙' },
        ]
    },
    {
        id: 'places', name: 'Locuri', emoji: '🏠',
        items: [
            { label: 'Acasă', type: 'object', emoji: '🏠' },
            { label: 'Afară', type: 'object', emoji: '🌳' },
            { label: 'Parc', type: 'object', emoji: '🎠' },
            { label: 'Bunici', type: 'object', emoji: '🏡' },
            { label: 'Școală', type: 'object', emoji: '🏫' },
            { label: 'Doctor', type: 'object', emoji: '🏥' },
            { label: 'Magazin', type: 'object', emoji: '🛒' },
            { label: 'Baie', type: 'object', emoji: '🚽' },
        ]
    },
    {
        id: 'feelings', name: 'Emoții', emoji: '😊',
        items: [
            { label: 'Sunt', type: 'action', emoji: '😐' },
            { label: 'Fericit', type: 'descriptor', emoji: '😄' },
            { label: 'Trist', type: 'descriptor', emoji: '😢' },
            { label: 'Supărat', type: 'descriptor', emoji: '😠' },
            { label: 'Obosit', type: 'descriptor', emoji: '😫' },
            { label: 'Speriat', type: 'descriptor', emoji: '😱' },
            { label: 'Mă doare', type: 'urgent', emoji: '🤕' },
        ]
    },
    {
        id: 'clothes', name: 'Haine', emoji: '👕',
        items: [
            { label: 'Vreau', type: 'action', emoji: '🤲' },
            { label: 'Tricou', type: 'object', emoji: '👕' },
            { label: 'Pantaloni', type: 'object', emoji: '👖' },
            { label: 'Pantofi', type: 'object', emoji: '👟' },
            { label: 'Geacă', type: 'object', emoji: '🧥' },
            { label: 'Pijama', type: 'object', emoji: '🥱' },
            { label: 'Căciulă', type: 'object', emoji: '🧢' },
        ]
    },
];

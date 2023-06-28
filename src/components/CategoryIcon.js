import React from 'react';
import { UtensilsCrossed, Soup, Pizza, CakeSlice } from 'lucide-react';

let icons = [
    { id: 0, icon: UtensilsCrossed },
    { id: 1, icon: Soup },
    { id: 2, icon: Pizza },
    { id: 3, icon: CakeSlice }
];

export default function CategoryIcon({ id, color, size }) {
    const iconObj = icons.find(icon => icon.id === id);
    if (!iconObj) return;
    const LucideIcon = iconObj.icon;
    return (
        <LucideIcon color={color} size={size} />
    );
}


import React from 'react';
import { UtensilsCrossed, Soup, Pizza, CakeSlice, Globe2, Salad, Sandwich, ChefHat, LeafyGreen } from 'lucide-react';

let icons = [
    { id: 0, icon: UtensilsCrossed },
    { id: 1, icon: Soup },
    { id: 2, icon: ChefHat },
    { id: 3, icon: Globe2 },
    { id: 4, icon: LeafyGreen },
    { id: 5, icon: Salad },
    { id: 6, icon: Sandwich },
    { id: 7, icon: CakeSlice },
    { id: 8, icon: Pizza },
];

export default function CategoryIcon({ id, color, size }) {
    const iconObj = icons.find(icon => icon.id === id);
    if (!iconObj) return;
    const LucideIcon = iconObj.icon;
    return (
        <LucideIcon color={color} size={size} />
    );
}


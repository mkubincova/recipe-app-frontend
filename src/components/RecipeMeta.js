import React from 'react';
import { AlarmClock, Flame, UtensilsCrossed } from 'lucide-react';


export default function RecipeMeta({ cookTime, temp, portions }) {
    return (
        <div className='meta'>
            {cookTime ? (
                <div className='meta__item'>
                    <AlarmClock />
                    <span>{cookTime}<small> min.</small></span>
                </div>
            ) : ''}
            {temp ? (
                <div className='meta__item'>
                    <Flame />
                    <span>{temp}<small> °C</small></span>
                </div>
            ) : ''}
            {portions ? (
                <div className='meta__item'>
                    <UtensilsCrossed />
                    <span>{portions}<small> portions</small></span>
                </div>
            ) : ''}
        </div>
    );
}
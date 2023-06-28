import React from 'react';
import RecipeCard from './RecipeCard';


export default function RecipeCardList({ className = '', recipes }) {
    return (
        <div className={`recipe-card-list ${className}`}>
            <div className='recipe-card-list-items'>
                {recipes.map(recipe => (
                    <RecipeCard recipe={recipe} key={recipe.id} />
                ))}
            </div>
        </div>
    );
}
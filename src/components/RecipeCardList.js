import React from 'react';
import RecipeCard from './RecipeCard';


export default function RecipeCardList({ recipes }) {
    return (
        <div className="card-list-container pt-15 pb-30">
            <div className='card-list'>
                {recipes.map(recipe => (
                    <RecipeCard recipe={recipe} key={recipe.id} />
                ))}
            </div>
        </div>
    );
}
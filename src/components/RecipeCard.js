import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';


export default function RecipeCard({ recipe }) {
    return (
        <Link to={`/recipe/${recipe.id}`} className='card'>
            <div className='card__img'>
                {recipe.attributes.cover.data ?
                    <img src={`${process.env.REACT_APP_IMG_URL}${recipe.attributes.cover.data?.attributes?.formats?.small?.url}`}
                        alt=''
                        width="100"
                        height="100"
                    /> : <Utensils />}
            </div>
            <div className='card__text py-15 px-10'>
                <h2>{recipe.attributes.title}</h2>
                <div className='categories'>
                    {recipe.attributes.categories.data.map(cat => (
                        <small key={cat.id}>{cat.attributes.name}</small>
                    ))}
                </div>
            </div>

        </Link>
    );
}
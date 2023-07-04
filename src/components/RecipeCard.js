import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';


export default function RecipeCard({ recipe }) {
    return (
        <Link to={`/recipe/${recipe.id}`} className='recipe-card'>
            <div className='image-container'>
                {recipe.attributes.cover.data ?
                    <img src={`${process.env.REACT_APP_IMG_URL}${recipe.attributes.cover.data?.attributes?.formats?.small?.url}`}
                        alt=''
                        width="100"
                        height="100"
                    /> : <Utensils color="var(--color-primary)" />}

            </div>
            <div className='text-container'>
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
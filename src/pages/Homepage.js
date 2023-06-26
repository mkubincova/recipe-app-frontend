import React from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Homepage() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/recipes?populate=cover');
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
            {data.data.map(recipe => (
                <div key={recipe.id} className='recipe-card'>
                    <div className="category-icon">i</div>
                    <div>
                        <h2>{recipe.attributes.title}</h2>
                        <small>console list</small>
                        <Link to={`/recipe/${recipe.id}`}>View recipe</Link>
                    </div>
                    {recipe.attributes.cover.data ?
                        <div className='image-container'>
                            <img src={`http://localhost:1337${recipe.attributes.cover.data?.attributes?.formats?.thumbnail?.url}`}
                                alt={recipe.attributes.cover.data?.attributes?.alternativeText}
                                width="100"
                                height="100"
                            />
                        </div> : <></>
                    }
                </div>
            ))}
        </div>
    );
}

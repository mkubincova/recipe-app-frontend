import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const RECIPES = gql`
    query GetRecipes {
        recipes {
            data {
                id,
                attributes {
                    title,
                    cover {
                        data {
                            attributes {
                                alternativeText,
                                formats
                            } 
                        }
                    }
                }
            }
        } 
    }
`;

export default function Homepage() {
    const { loading, error, data } = useQuery(RECIPES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
            {data.recipes.data.map(recipe => (
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

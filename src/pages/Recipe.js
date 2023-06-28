import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useQuery, gql } from "@apollo/client";
import { AlarmClock, Flame, UtensilsCrossed } from "lucide-react";

const RECIPE = gql`
    query GetRecipe($id: ID!) {
        recipe(id: $id) {
            data {
                id,
                attributes {
                    title,
                    ingredients,
                    directions,
                    cookTemperature,
                    cookTimeMinutes,
                    portions,
                    categories {
                        data {
                            id,
                            attributes {
                                name
                            }
                        }
                    },
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

export default function Recipe() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(RECIPE, {
        variables: { id: id }
    });

    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        setHeaderHeight(document.querySelector('.header').clientHeight);
    }, []);

    if (loading) return <p className='container'>Loading...</p>;
    if (error) return <p className='container'>Error</p>;

    const recipe = data.recipe.data;

    return (
        <div className='recipe container'>
            <div className='recipe-header'>
                {recipe.attributes.cover.data ?
                    <div className='image-container' style={{ marginTop: -headerHeight }}>
                        <img src={`http://localhost:1337${recipe.attributes.cover.data?.attributes?.formats?.medium?.url}`}
                            alt={recipe.attributes.cover.data?.attributes?.alternativeText}
                            width="640"
                            height="640"
                        />
                    </div> : <></>
                }
                <div className='text-container'>
                    <h1>{recipe.attributes.title}</h1>
                    <div className='categories'>
                        {recipe.attributes.categories.data.map(cat => (
                            <small key={cat.id}>{cat.attributes.name}</small>
                        ))}
                    </div>
                    <div className='meta'>
                        <div className={recipe.attributes.cookTimeMinutes ? '' : 'hidden'}>
                            <AlarmClock />
                            <span>{recipe.attributes.cookTimeMinutes}<small> min.</small></span>
                        </div>
                        <div className={recipe.attributes.cookTemperature ? '' : 'hidden'}>
                            <Flame />
                            <span>{recipe.attributes.cookTemperature}<small> °C</small></span>
                        </div>
                        <div className={recipe.attributes.portions ? '' : 'hidden'}>
                            <UtensilsCrossed />
                            <span>{recipe.attributes.portions}<small> portions</small></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='recipe-body'>
                <div className="ingredients">
                    <h2>Ingredients:</h2>

                    <ReactMarkdown>
                        {data.recipe.data.attributes.ingredients}
                    </ReactMarkdown>
                </div>
                <div className="directions">
                    <h2>Directions:</h2>
                    <ReactMarkdown>
                        {data.recipe.data.attributes.directions}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

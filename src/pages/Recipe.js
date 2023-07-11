import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useQuery, gql } from "@apollo/client";
import { Utensils } from "lucide-react";
import RecipeMeta from '../components/RecipeMeta';

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

    if (loading) return <p className='container text-center'>Loading...</p>;
    if (error) return <p className='container text-center'>Error</p>;

    const recipe = data.recipe.data;

    return (
        <div className='recipe container app-body'>
            <div className='recipe-header'>

                <div className='recipe-header__img'>
                    {recipe.attributes.cover.data?.attributes?.formats?.medium ?
                        (<img src={`${process.env.REACT_APP_IMG_URL}${recipe.attributes.cover.data.attributes.formats.medium.url}`}
                            alt=''
                            width="640"
                            height="640"
                        />) :
                        recipe.attributes.cover.data?.attributes?.formats?.small ?
                            (<img src={`${process.env.REACT_APP_IMG_URL}${recipe.attributes.cover.data.attributes.formats.small.url}`}
                                alt=''
                                width="640"
                                height="640"
                            />) : <Utensils />}
                </div>

                <div className='recipe-header__text'>
                    <h1>{recipe.attributes.title}</h1>
                    <div className='categories mb-20'>
                        {recipe.attributes.categories.data.map(cat => (
                            <small key={cat.id}>{cat.attributes.name}</small>
                        ))}
                    </div>
                    <RecipeMeta cookTime={recipe.attributes.cookTimeMinutes} temp={recipe.attributes.cookTemperature} portions={recipe.attributes.portions} />
                </div>
            </div>

            <div className='recipe-body'>
                <div className="ingredients pt-40">
                    <h2 className='mb-15'>Ingredients:</h2>
                    <ReactMarkdown>
                        {data.recipe.data.attributes.ingredients}
                    </ReactMarkdown>
                </div>

                {data.recipe.data.attributes.directions ? <div className="directions pt-40">
                    <h2 className='mb-15'>Directions:</h2>
                    <ReactMarkdown>
                        {data.recipe.data.attributes.directions}
                    </ReactMarkdown>
                </div> : ""}
            </div>
        </div>
    );
}

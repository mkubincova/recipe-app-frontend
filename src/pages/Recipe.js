import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useQuery, gql } from "@apollo/client";

const RECIPE = gql`
    query GetRecipe($id: ID!) {
        recipe(id: $id) {
            data {
                id,
                attributes {
                    title,
                    ingredients,
                    directions,
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
            <div className='recipe-detail'>
                <div className="category-icon">i</div>
                <div>
                    <h1>{data.recipe.data.attributes.title}</h1>
                    <div>
                        {data.recipe.data.attributes.categories.data.map(cat => (
                            <small key={cat.id}>{cat.attributes.name}</small>
                        ))}
                    </div>
                </div>
                {data.recipe.data.attributes.cover.data ?
                    <div className='image-container'>
                        <img src={`http://localhost:1337${data.recipe.data.attributes.cover.data?.attributes?.formats?.thumbnail?.url}`}
                            alt={data.recipe.data.attributes.cover.data?.attributes?.alternativeText}
                            width="100"
                            height="100"
                        />
                    </div> : <></>
                }
                <div className="ingredients">
                    <h2>Ingrediets</h2>
                    <ReactMarkdown>
                        {data.recipe.data.attributes.ingredients}
                    </ReactMarkdown>
                </div>
                <div className="directions">
                    <h2>Directions</h2>
                    <ReactMarkdown>
                        {data.recipe.data.attributes.directions}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

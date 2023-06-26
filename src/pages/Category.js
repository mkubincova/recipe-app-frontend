import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import { useParams } from 'react-router-dom';

const CATEGORY = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
            data {
                id,
                attributes {
                    name,
                    recipes {
                        data {
                            id,
                            attributes {
                                title,
                                categories {
                                    data {
                                        id,
                                        attributes {
                                            name
                                        }
                                    }
                                }
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
            }
        }
    }
`;

export default function Category() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(CATEGORY, {
        variables: { id: id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    console.log(data);

    return (
        <div>
            <h2>{data.category.data.attributes.name}</h2>
            {data.category.data.attributes.recipes.data.map(recipe => (
                <div key={recipe.id} className='recipe-card'>
                    <div className="category-icon">i</div>
                    <div>
                        <h2>{recipe.attributes.title}</h2>
                        <div>
                            {recipe.attributes.categories.data.map(cat => (
                                <small key={cat.id}>{cat.attributes.name}</small>
                            ))}
                        </div>

                        <Link to={`/recipe/${recipe.id}`} className='view'>View recipe</Link>
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
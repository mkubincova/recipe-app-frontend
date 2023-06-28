import React from 'react';
import { useQuery, gql } from "@apollo/client";
import { useParams } from 'react-router-dom';
import RecipeCardList from '../components/RecipeCardList';

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

    if (loading) return <p className='container'>Loading...</p>;
    if (error) return <p className='container'>Error</p>;

    return (
        <div className='category'>
            <RecipeCardList className='container' recipes={data.category.data.attributes.recipes.data} />
        </div>
    );
}
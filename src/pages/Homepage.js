import React from 'react';
import { useQuery, gql } from "@apollo/client";
import RecipeCardList from "../components/RecipeCardList";

const RECIPES = gql`
    query GetRecipes {
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
`;

export default function Homepage() {
    const { error, loading, data } = useQuery(RECIPES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div className="homepage">
            <RecipeCardList className='container' recipes={data.recipes.data} />
        </div>
    );
}

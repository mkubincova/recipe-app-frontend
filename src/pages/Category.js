import { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import RecipeCardList from "../components/RecipeCardList";
import { useParams } from 'react-router-dom';

const RECIPES = gql`
    query GetRecipes($id: ID!, $start: Int, $limit: Int) {
        recipes(sort: "id:desc", pagination: { start: $start, limit: $limit }, filters: { categories: {id : { eq: $id }} }) {
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

const TOTAL = gql`
    query GetTotal($id: ID!) {
        recipes(pagination: { limit: -1 }, filters: { categories: {id : { eq: $id }} }) {
            data {
                id,
                attributes {
                    categories {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`;

export default function Category() {
    const { id } = useParams();
    const pageSize = 12;
    const [maxRecipes, setMaxRecipes] = useState(0);
    const [limit, setLimit] = useState(pageSize);
    const [oldData, setOldData] = useState([]);

    useEffect(() => {
        setOldData([]);
        setLimit(pageSize);
    }, [id]);

    const { error, loading, data, fetchMore } = useQuery(RECIPES, {
        variables: { start: 0, limit: limit, id: id }
    });

    const { data: totalData } = useQuery(TOTAL, {
        variables: { id: id }
    });

    useEffect(() => {
        if (!totalData) return;
        setMaxRecipes(totalData.recipes.data.length);
    }, [totalData]);

    const loadMore = () => {
        setOldData(data.recipes.data);
        const currentLength = data.recipes.data.length;
        fetchMore({
            variables: {
                start: currentLength,
                limit: pageSize,
            },
        }).then(fetchMoreResult => {
            // Update variables.limit for the original query to include
            // the newly added feed items.
            setLimit(currentLength + fetchMoreResult.data.recipes.data.length);
        });
    };

    if (error) return <p className='container'>Error</p>;

    return (
        <div className="category">
            <div className='container'>
                <RecipeCardList recipes={data?.recipes?.data || oldData} />
                {loading ?
                    <p className='text-center pb-md'>Loading...</p> :
                    <div className='text-center pb-md'>
                        {data.recipes.data.length < maxRecipes ? <button onClick={loadMore}>Load more</button> : ''}
                    </div>
                }
            </div>
        </div>
    );
}
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import RecipeCardList from "../components/RecipeCardList";
import ScrollToTop from "../components/ScrollToTop";
import useGetTotal from '../hooks/useGetTotal';

const RECIPES = gql`
    query GetRecipes($start: Int, $limit: Int) {
        recipes(sort: "id:desc", pagination: { start: $start, limit: $limit }) {
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
    const pageSize = 12;
    const [limit, setLimit] = useState(pageSize);
    const [oldData, setOldData] = useState([]);

    const total = useGetTotal();

    const { error, loading, data, fetchMore } = useQuery(RECIPES, {
        variables: { start: 0, limit: limit }
    });

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
        <div className="homepage app-body">
            <div className='container pb-30'>
                <RecipeCardList recipes={data?.recipes?.data || oldData} />
                {loading ?
                    <p className='text-center pb-md'>Loading...</p> :
                    <div className='text-center pb-md'>
                        {data.recipes.data.length < total ? <button onClick={loadMore} className='btn btn--primary'>Load more</button> : ''}
                    </div>
                }
            </div>
            <ScrollToTop />
        </div>
    );
}

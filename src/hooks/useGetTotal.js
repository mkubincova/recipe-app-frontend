import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const TOTAL_FILTERED = gql`
    query GetTotal($id: ID!) {
        recipes(pagination: { limit: -1 }, filters: { categories: { id: { eq: $id } } }) {
            data {
                id
            }
        }
    }
`;

const TOTAL = gql`
    query GetTotal {
        recipes(pagination: { limit: -1 }) {
            data {
                id
            }
        }
    }
`;

const useGetTotal = (id = null) => {
    const [GetTotal, setGetTotal] = useState(0);
    const QUERY = id ? TOTAL_FILTERED : TOTAL;
    const variables = id ? { id: id } : {};

    const { data } = useQuery(QUERY, {
        variables: variables
    });

    useEffect(() => {
        if (!data) return;
        setGetTotal(data.recipes.data.length);
    }, [data]);

    return GetTotal;
};

export default useGetTotal;
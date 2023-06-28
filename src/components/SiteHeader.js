import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import CategoryIcon from './CategoryIcon';

const CATGORIES = gql`
    query GetCategories {
        categories {
            data {
                id,
                attributes {
                    name
                }
            }
        }
    }
`;

export default function SiteHeader() {
    const { data } = useQuery(CATGORIES);

    const categories = data ? data.categories.data : [];

    return (
        <div className="header container">
            <Link to="/"><h1>My recipes</h1></Link>
            <div className='categories-gradient'>
                <ul className="categories">
                    <li>
                        <Link to="/">
                            <CategoryIcon id={0} />
                            <span>All</span>
                        </Link>
                    </li>
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <Link to={`/category/${cat.id}`}>
                                <CategoryIcon id={parseInt(cat.id)} />
                                <span>{cat.attributes.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import CategoryIcon from './CategoryIcon';
import { ArrowLeft } from "lucide-react";

const CATGORIES = gql`
    query GetCategories {
        categories(sort: "name") {
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
    const navigate = useNavigate();

    const location = useLocation();
    if (location.pathname.includes('recipe/')) return (
        <div className="header container">
            <button onClick={() => navigate(-1)} className='icon-button' aria-label='Go back'><ArrowLeft /></button>
        </div>
    );
    return (
        <div className="header container">
            <h1>My recipes</h1>
            <ul className="categories">
                <li>
                    <NavLink to="/">
                        <CategoryIcon id={0} />
                        <span>All</span>
                    </NavLink>
                </li>
                {categories.map(cat => (
                    <li key={cat.id} className=''>
                        <NavLink to={`/category/${cat.id}`}>
                            <CategoryIcon id={parseInt(cat.id)} />
                            <span>{cat.attributes.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
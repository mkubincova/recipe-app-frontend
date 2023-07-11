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
                    name,
                    theme_color
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
        <div className="relative container">
            <button onClick={() => navigate(-1)} id='back' className='btn btn--icon' aria-label='Go back'><ArrowLeft /></button>
        </div>
    );
    return (
        <div className="header container pt-30 pb-30">
            <h1 className='text-center pb-30'>My recipes</h1>
            <ul className="category-menu">
                <li>
                    <NavLink to="/" className="btn btn--category" >
                        <CategoryIcon id={0} />
                        <span>All</span>
                    </NavLink>
                </li>
                {categories.map(cat => (
                    <li key={cat.id} >
                        <NavLink to={`/category/${cat.id}`} className="btn btn--category" style={{ "--color": `var(--${cat.attributes.theme_color})` }} >
                            <CategoryIcon id={parseInt(cat.id)} />
                            <span>{cat.attributes.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div >
    );
}
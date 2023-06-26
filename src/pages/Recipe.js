import React from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function Recipe() {
    const { id } = useParams();
    const { loading, error, data } = useFetch(`http://localhost:1337/api/recipes/${id}?populate=cover`);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    console.log(data);

    return (
        <div>
            <div className='recipe-detail'>
                <div className="category-icon">i</div>
                <div>
                    <h1>{data.data.attributes.title}</h1>
                    <small>console list</small>
                </div>
                {data.data.attributes.cover.data ?
                    <div className='image-container'>
                        <img src={`http://localhost:1337${data.data.attributes.cover.data?.attributes?.formats?.thumbnail?.url}`}
                            alt={data.data.attributes.cover.data?.attributes?.alternativeText}
                            width="100"
                            height="100"
                        />
                    </div> : <></>
                }
                <div className="ingredients">
                    <h2>Ingrediets</h2>
                    <ReactMarkdown>
                        {data.data.attributes.ingredients}
                    </ReactMarkdown>
                </div>
                <div className="directions">
                    <h2>Directions</h2>
                    <ReactMarkdown>
                        {data.data.attributes.directions}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

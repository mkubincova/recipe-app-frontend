import React from 'react';

export default function Footer() {
    return (
        <footer class="footer container py-10">
            <p className='m-remove'>Made by Magdaléna Kubincová ©{new Date().getFullYear()}</p>
            <p className='m-remove'>
                Source code: <a href="https://github.com/mkubincova/recipe-app-frontend" target='_blank' rel="noreferrer">Frontend</a>, <a href="https://github.com/mkubincova/recipe-app-backend" target='_blank' rel="noreferrer">Backend</a>
            </p>
        </footer>
    );
}
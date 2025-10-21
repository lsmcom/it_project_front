import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout(props) {
    return (
        <div>
            <Header />
            <section>
                <Outlet />
            </section>
            <Footer />
        </div>
    );
}

export default Layout;
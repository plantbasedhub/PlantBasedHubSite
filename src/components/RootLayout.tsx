import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Topbar from './Shared/Topbar';
import { LeftSidebar } from './Shared/LeftSidebar';
//import Footer from '../components/footer'
//import { SpeedInsights } from '@vercel/speed-insights/next';
import { Outlet } from 'react-router-dom'
import { Bottombar } from './Shared/Bottombar';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div>
            <Navbar/>
            {/* <SpeedInsights /> */}
            <main>{children}</main>
            {/* <Footer/> */}
            <Topbar/>
            <LeftSidebar/>
            <section>
                <Outlet />
        </section>


        <Bottombar />
        </div>
    );
}

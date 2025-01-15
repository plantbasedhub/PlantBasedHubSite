import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from

const Topbar = () => {
    return(
        <section className="topbar">
        <div className="flex-between py-4 px-5">Topbar</div>
        <Link to="/" className='flex gap-3 items-center'>
        <img
            src="public/logo.png"
            alt="logo" />
            width={130}
            height={325}
        </Link>

        <div className='flex gap-4'>
            <Button variant="ghost" className="shad-button_ghost"
            onClick={SignOut}>
                <img src="public/logout.png" alt="logout" />
            </Button>

        </div>
        </section>
    )
}

export default Topbar
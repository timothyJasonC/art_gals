import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function Layout() {
    return (
        <div className='hero-section'>
            <video className="background-video" autoPlay loop muted>
                <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className='main-border'>
                <video className="background-video-inner" autoPlay loop muted>
                    <source src="/background.mp4" type="video/mp4" />
                </video>
                <div className='background-color'>
                    <Header />
                    <Outlet />
                </div>
            </div>



        </div>
    )
}

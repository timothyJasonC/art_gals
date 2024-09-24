import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <div>
                <Link to={'/'} className="link"
                    style={{ textDecoration: 'none', color: '#cccccccc' }}>NAVIGATOR</Link>
                <Link to={'/explore'} className="link"
                    style={{ textDecoration: 'none', color: '#cccccccc' }}>EXSPLORE</Link>
            </div>
            <h1>artgals</h1>
            <div>
                <Link to={'/about'} className="link"
                    style={{ textDecoration: 'none', color: '#cccccccc' }}>ABOUT</Link>
                <Link to={'/contact'} className="link"
                    style={{ textDecoration: 'none', color: '#cccccccc' }}>CONTACTS</Link>
            </div>
        </header>
    )
}

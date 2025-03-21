import { Link } from 'react-router-dom';
import "./notFound.scss";

function NotFound() {
    return (
        <div className="not-found">
            <h1>404 - Strona nie znaleziona</h1>
            <p>Przepraszamy, strona której szukasz nie istnieje.</p>
            <Link to="/">Wróć na stronę główną</Link>
        </div>
    );
}

export default NotFound;
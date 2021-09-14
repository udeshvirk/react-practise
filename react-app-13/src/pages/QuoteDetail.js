import { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/ui/LoadingSpinner";
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../libs/api';
const QuoteDetail = () => {
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
    const params = useParams();
    const match = useRouteMatch();
    const { quoteId } = params;
    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest,quoteId]);
    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }
    if (error) {
        return <p className="centered focused">{error}</p>
    }
    if (!loadedQuote.text) {
        return <p>No Quote Found</p>;
    }
    return (
        <section>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} id={loadedQuote.id} />
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </section>
    );
}

export default QuoteDetail;
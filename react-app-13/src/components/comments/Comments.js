import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../libs/api';
import LoadingSpinner from '../ui/LoadingSpinner';

const Comments = () => {
    const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams();
    const { quoteId } = params;
    const { sendRequest, status, data: loadedComments } = useHttp(getAllComments, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId])

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    const addedCommenthandler = useCallback(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);
    let comments;
    if (status === 'pending') {
        comments = (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }
    if (status === 'completed' && (loadedComments && loadedComments.length > 0)) {
        comments = <CommentsList comments={loadedComments} />;
    }
    if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
        comments = <p className="centered">No comment were added yet!</p>
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && <NewCommentForm onAddedComment={addedCommenthandler} quoteId={quoteId} />}
            {comments}
        </section>
    );
};

export default Comments;

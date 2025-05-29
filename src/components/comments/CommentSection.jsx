import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentsContainer = styled.section`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const Title = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: ${props => props.theme.colors.text};
`;

const CommentsList = styled.div`
  margin-top: 30px;
`;

const CommentSection = ({ articleId }) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([
      ...comments,
      {
        id: Date.now(),
        ...newComment,
        replies: [],
        upvotes: 0
      }
    ]);
  };

  const handleAddReply = (commentId, reply) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, { id: Date.now(), ...reply, upvotes: 0 }]
        };
      }
      return comment;
    }));
  };

  const handleUpvote = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, upvotes: (comment.upvotes || 0) + 1 };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId 
              ? { ...reply, upvotes: (reply.upvotes || 0) + 1 }
              : reply
          )
        };
      }
      return comment;
    }));
  };

  return (
    <CommentsContainer>
      <Title>{t('comments.title')}</Title>
      <CommentForm onSubmit={handleAddComment} />
      <CommentsList>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleAddReply}
            onUpvote={handleUpvote}
          />
        ))}
      </CommentsList>
    </CommentsContainer>
  );
};

export default CommentSection; 
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import CommentForm from './CommentForm';

const CommentContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: ${props => props.theme.colors.background};
  border-radius: 5px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Author = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`;

const Date = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const Content = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: ${props => props.theme.colors.textLight};
    cursor: default;
    text-decoration: none;
  }
`;

const UpvoteCount = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Replies = styled.div`
  margin-left: 20px;
  padding-left: 20px;
  border-left: 2px solid ${props => props.theme.colors.border};
`;

const Comment = ({ comment, onReply, onUpvote }) => {
  const { t } = useTranslation();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const upvotes = comment.upvotes || 0;

  const handleReply = (reply) => {
    onReply(comment.id, reply);
    setShowReplyForm(false);
  };

  const handleUpvote = () => {
    if (!isUpvoted) {
      onUpvote(comment.id);
      setIsUpvoted(true);
    }
  };

  // Simpler date formatting
  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return ''; // Return empty string if date is invalid
      }
      return date.toLocaleString(); // Use basic toLocaleString instead
    } catch (error) {
      console.error('Date formatting error:', error);
      return ''; // Return empty string on error
    }
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <Author>{comment.author}</Author>
        <Date>{formatDate(comment.date)}</Date>
      </CommentHeader>
      <Content>{comment.content}</Content>
      <ActionButtons>
        <Button onClick={handleUpvote} disabled={isUpvoted}>
          {isUpvoted ? t('comments.alreadyUpvoted') : t('comments.upvoteButton')}
          <UpvoteCount>
            {upvotes === 1 
              ? t('comments.upvoteCountOne')
              : t('comments.upvoteCount', { count: upvotes })}
          </UpvoteCount>
        </Button>
        <Button onClick={() => setShowReplyForm(!showReplyForm)}>
          {t('comments.replyButton')}
        </Button>
      </ActionButtons>

      {showReplyForm && (
        <CommentForm onSubmit={handleReply} isReply />
      )}

      {comment.replies && comment.replies.length > 0 && (
        <Replies>
          {comment.replies.map(reply => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onUpvote={onUpvote}
            />
          ))}
        </Replies>
      )}
    </CommentContainer>
  );
};

export default Comment; 
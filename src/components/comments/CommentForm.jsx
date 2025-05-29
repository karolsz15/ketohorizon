import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Form = styled.form`
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
`;

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const CommentForm = ({ onSubmit, isReply = false }) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() || !nickname.trim()) return;

    try {
      onSubmit({
        content,
        author: nickname.trim(),
        date: Date.now()
      });
      setContent('');
      if (!isReply) {
        setNickname(''); // Clear nickname only for new comments, not replies
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label>{t('comments.nicknameLabel')}</Label>
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder={t('comments.nicknamePlaceholder')}
          maxLength={30}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label>{t('comments.commentLabel')}</Label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t(isReply ? 'comments.replyPlaceholder' : 'comments.placeholder')}
          required
        />
      </InputGroup>
      <Button type="submit" disabled={!content.trim() || !nickname.trim()}>
        {t(isReply ? 'comments.reply' : 'comments.submit')}
      </Button>
    </Form>
  );
};

export default CommentForm; 
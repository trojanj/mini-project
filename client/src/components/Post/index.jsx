import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import EditPost from '../EditPost';

import styles from './styles.module.scss';

const Post = ({
  post, likePost, dislikePost,
  toggleExpandedPost, sharePost,
  userId, editPostId, setEditPostId,
  editPost, uploadImage
}) => {
  const {
    id,
    image,
    body,
    user,
    likeCount,
    dislikeCount,
    commentCount,
    createdAt
  } = post;
  const date = moment(createdAt).fromNow();

  if (editPostId === id) {
    return (
      <EditPost
        editPost={editPost}
        uploadImage={uploadImage}
        post={post}
        setEditPostId={setEditPostId}
      />
    );
  }

  return (
    <Card style={{ width: '100%' }}>
      {image && <Image src={image.link} wrapped ui={false} />}
      <Card.Content>
        <Card.Meta>
          <span className="date">
            posted by
            {' '}
            {user.username}
            {' - '}
            {date}
          </span>
        </Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => likePost(id)}>
          <Icon name="thumbs up" />
          {likeCount}
        </Label>
        <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => dislikePost(id)}>
          <Icon name="thumbs down" />
          {dislikeCount}
        </Label>
        <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => toggleExpandedPost(id)}>
          <Icon name="comment" />
          {commentCount}
        </Label>
        <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => sharePost(id)}>
          <Icon name="share alternate" />
        </Label>
        {userId === post.userId && (
          <>
            <Label
              basic
              size="small"
              as="a"
              className={styles.toolbarBtn}
              onClick={() => setEditPostId(id)}
            >
              <Icon name="edit" />
            </Label>
            <Label
              basic
              size="small"
              as="a"
              className={styles.toolbarBtn}
            >
              <Icon name="remove circle" />
            </Label>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
  toggleExpandedPost: PropTypes.func.isRequired,
  sharePost: PropTypes.func.isRequired,
  userId: PropTypes.string,
  editPostId: PropTypes.string.isRequired,
  setEditPostId: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

Post.defaultProps = {
  userId: undefined
};

export default Post;

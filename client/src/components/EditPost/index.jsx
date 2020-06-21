import React, { useState } from 'react';
import { Button, Form, Icon, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const EditPost = ({ editPost, uploadImage, post, setEditPostId }) => {
  const [body, setBody] = useState(post.body);
  const [image, setImage] = useState({ imageId: post.image?.id, imageLink: post.image?.link });
  const [isUploading, setIsUploading] = useState(false);

  const handleEditPost = async () => {
    if (!body) {
      return;
    }
    if (body === post.body && image.imageId === post.image?.id) {
      setEditPostId('');
      return;
    }
    await editPost({ id: post.id, imageId: image?.imageId, body });
    setEditPostId('');
  };

  const handleUploadFile = async ({ target }) => {
    setIsUploading(true);
    try {
      const { id: imageId, link: imageLink } = await uploadImage(target.files[0]);
      setImage({ imageId, imageLink });
    } finally {
      // TODO: show error
      setIsUploading(false);
    }
  };

  return (
    <Segment>
      <Form onSubmit={handleEditPost}>
        <Form.TextArea
          name="body"
          value={body}
          onChange={ev => setBody(ev.target.value)}
        />
        {image?.imageLink && (
          <div className={styles.imageWrapper}>
            <Image className={styles.image} src={image?.imageLink} alt="post" />
          </div>
        )}
        <Button color="teal" icon labelPosition="left" as="label" loading={isUploading} disabled={isUploading}>
          <Icon name="image" />
          Attach image
          <input name="image" type="file" onChange={handleUploadFile} hidden />
        </Button>
        <Button floated="right" color="blue" type="submit">Save</Button>
      </Form>
    </Segment>
  );
};

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  setEditPostId: PropTypes.func.isRequired
};

export default EditPost;

import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Form, Modal, Button } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

AddPostModal.propTypes = {};

const postObj = {
  title: "",
  description: "",
  url: "",
  status: "TO LEARN",
};

function AddPostModal(props) {
  // contexts
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(
    PostContext
  );

  // state
  const [newPost, setNewPost] = useState(postObj);

  const { title, description, url } = newPost;

  const closeDialog = () => {
    setShowAddPostModal(false);
    setNewPost(postObj);
  };

  const onChangePostForm = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    closeDialog();
    setShowToast({
      show: true,
      message,
      type: success ? 'success' : 'danger'
    })
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={onChangePostForm}
              required
              aria-aria-describedby="title-help"
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangePostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Yotube Url"
              name="url"
              value={url}
              onChange={onChangePostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddPostModal;

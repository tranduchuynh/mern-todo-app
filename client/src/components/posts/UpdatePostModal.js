import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Modal, Button } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

UpdatePostModal.propTypes = {};

const postObj = {
  title: "",
  description: "",
  url: "",
  status: "TO LEARN",
};

function UpdatePostModal(props) {
  // contexts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  // state
  const [newPost, setNewPost] = useState(post);

  const { title, description, url, status } = newPost || {};

  useEffect(() => {
    setNewPost(post)
  }, [post])

  const closeDialog = () => {
    setNewPost(post)
    setShowUpdatePostModal(false);
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
    const { success, message } = await updatePost(newPost);
    closeDialog();
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
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
          <Form.Group>
          <Form.Control
              as='select'
              placeholder="Yotube Url"
              name="status"
              value={status}
              onChange={onChangePostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdatePostModal;

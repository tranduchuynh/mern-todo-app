import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { PostContext } from "../contexts/PostContext";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Spinner,
  Toast,
  Tooltip,
} from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../components/posts/UpdatePostModal";

Dashboard.propTypes = {};

let body;

function Dashboard(props) {
  // contexts
  const {
    postState: { posts, postLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast
  } = useContext(PostContext);
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  useEffect(() => {
    getPosts();
  }, []);

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to LearnIt</Card.Title>
						<Card.Text>
							Click the button below to track your first skill to learn
						</Card.Text>
						<Button
							variant='primary'
							onClick={() => setShowAddPostModal(true)}
						>
							LearnIt!
						</Button>
					</Card.Body>
				</Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <>
              <Col key={post.id} className="my-2">
                <SinglePost post={post} />
              </Col>
            </>
          ))}
        </Row>

        {/* open add post modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={() => setShowAddPostModal(true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      <UpdatePostModal />

      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: 'fixed', top: '20%', right: '10px'}}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({
          show: false,
          message: '',
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}

export default Dashboard;

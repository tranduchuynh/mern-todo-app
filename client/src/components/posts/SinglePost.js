import React from "react";
import PropTypes from "prop-types";
import { Badge, Card, Col, Row } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

SinglePost.propTypes = {
  post: PropTypes.object,
};

const checkStatus = (status) => {
  return status === "LEARNED"
    ? "success"
    : status === "LEARNING"
    ? "warning"
    : "danger";
};

function SinglePost({ post = {} }) {
  const { _id, title, status, description, url } = post;

  return (
    <Card className="shadow" border={checkStatus(status)}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge pill variant={checkStatus(status)}>
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SinglePost;

import React from "react";
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";

const GistHeader = (props) => {
  const { owner, html_url } = props.gist;
  return (
    <div className="gist-header">
      <div>
        <img alt="avatar-img" className="avatar-image" src={owner.avatar_url}/>
        <div className="username">{owner.login}</div>
      </div>
      <Button target="_blank" href={html_url}>Check gist</Button>
    </div>
  )
}

export default GistHeader;

GistHeader.propTypes = {
  gist: PropTypes.object
}

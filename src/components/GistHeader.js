import React from "react";

const GistHeader = (props) => {
  const { owner } = props.gist;
  return (
    <div className="gist-header">
      <img alt="avatar-img" className="avatar-image" src={owner.avatar_url}/>
      <div className="username">{owner.login}</div>
    </div>
  )
}

export default GistHeader;

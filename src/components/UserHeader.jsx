import React from "react";
import { connect } from "react-redux";

const UserHeader = (props) => {
  if (!props.user) {
    return null;
  }

  return (
    <div style={{ color: "red" }} className="header">
      {props.user.name}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find((user) => user.id === ownProps.userId),
  };
};

export default connect(mapStateToProps)(UserHeader);

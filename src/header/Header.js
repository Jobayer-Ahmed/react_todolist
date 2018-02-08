import React, { Component } from "react";
import "./header.css";

class Header extends Component {
  render() {
    const ref = this;
    let open = [];
    const todo = ref.props.todo.map(el => {
      if (!el.completed) {
          open.push(el)
      }
    });
    return (
      <div className={ref.props.header ? "header new_header" : "header"}>
        <div className="head">
          <div className="today">TODAY</div>
          <div className="task_open">
            <span>{open.length}</span> Open Task
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

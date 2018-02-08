import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    render() {
        const ref = this;
        return (
            <div className={ref.props.header ? "header new_header": "header"}>
                <div className="head">
                    <div className="today">TODAY</div>
                    <div className="task_open">
                        <span>{this.props.open}</span> Open Task
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
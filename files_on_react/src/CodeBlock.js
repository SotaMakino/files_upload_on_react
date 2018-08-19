import React, { Component } from 'react';
import './CodeBlock.css'

class CodeBlock extends Component {



  render() {
    const { language, literal } = this.props;

    return (
      <pre className="CodeBlock">
        <code className={language}
          ref={(code) => { this.code = code; }}
        >
          {literal}
        </code>
      </pre>
    );
  }
}

export default CodeBlock;

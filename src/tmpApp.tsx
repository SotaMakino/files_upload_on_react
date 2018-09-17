import * as React from 'react';

interface Props {
  name: string;
}
class App extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.name}さん。こんにちは。
      </div>
    )
  }
}

export default App;
import * as React from "react";
import Box from "./box";

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  countDown: number;
}

export default class Apple extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      confirmOpen: false,
      confirmMessage: "Please hit the confirm button",
      countDown: 10
    };
  }

  private timer: number = 0;

  public componentDidMount() {
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
  }

  private handleCancelConfirmClick = () => {
    this.setState({
      confirmOpen: true,
      confirmMessage: "open is true"
    });
  };

  private handleTimerTick() {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${
          this.state.countDown
        } secs to go`,
        countDown: this.state.countDown - 1
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: "Too late to confirm!"
          });
        }
      }
    );
  }

  private handleOkConfirmClick = () => {
    this.setState({
      confirmOpen: false,
      confirmMessage: "open is false"
    });
    if (this.state.countDown <= 0) {
      clearInterval(this.timer);
      this.setState({
        confirmMessage: "Too late to confirm!"
      });
    }
  };

  public render() {
    return (
      <div>
        <div>Apple</div>
        <p>{this.state.confirmMessage}</p>
        <Box
          open={this.state.confirmOpen}
          title="React and TypeScript"
          content="Are you sure you want to learn React and TypeScript?"
          cancelCaption="No way"
          okCaption="Yes please!"
          onCancelClick={this.handleCancelConfirmClick}
          onOkClick={this.handleOkConfirmClick}
        />
      </div>
    );
  }
}

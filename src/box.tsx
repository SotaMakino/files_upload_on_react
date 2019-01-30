import * as React from "react";

interface IProps {
    open: boolean;
    title: string;
    content: string; 
    cancelCaption?: string; 
    okCaption?: string; 
    onOkClick: () => void; 
    onCancelClick: () => void;
}

export default class Box extends React.Component <IProps> {

    public static defaultProps = {
        cancelCaption: "Cancel",
        okCaption: "Okay"
    };

    private handleCancelClick = () => {
        this.props.onCancelClick();
    };
    private handleOkClick = () => {
        this.props.onOkClick();
    };

    public render() {

        const switcher = this.props.open ? "confirm-visible" : "close"

        return (
            <div>
                <div>Box</div>
                {switcher}
                <div>
                {this.props.cancelCaption}
                {this.props.okCaption}
                </div>
                <button onClick={this.handleCancelClick}>cancel</button>
                <button onClick={this.handleOkClick}>ok</button>
            </div>
        );
    }
}
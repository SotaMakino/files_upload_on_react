import * as React from 'react';

interface IProps{
  text: string;
  age?: number;
}

interface IState{
  email: string;
  name: string;
}

export default class Playgrounds extends React.Component<IProps, IState> {
  state: IState = {
    email: "",
    name: ""
  }

  //InputElement because there is <input> tag
  // handleChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   const { name, value }: any = e.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  public render() {
    const { text } = this.props; 
    const { name } = this.state;
    return (
      <div>
        <div>{text}</div>
        <input name="name" value={name}/>
      </div>
    );
  }
}
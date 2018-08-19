import React, { Component } from 'react';
import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import CardActions from 'react-toolbox/lib/card/CardActions';
import Button from 'react-toolbox/lib/button/Button';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import Markdown from './Markdown';
import './Nega.css'

class Nega extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false
    };

    this.handleClickFlip = this.handleClickFlip.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickFlip() {
    this.setState(prevState => {
      return { showDescription: !prevState.showDescription };
    });
  }

  handleClickEdit() {
    this.props.onClickEdit(this.props.nega);
  }

  handleClickDelete() {
      this.props.onClickDelete(this.props.nega);
  }

  componentDidUpdate(prevProps) {
    const currentNegaId = this.props.nega.id;
    const prevNegaId = prevProps.nega.id;

    if (currentNegaId !== prevNegaId) {
      this.setState({ showDescription: false })
    }
  }

  render() {
    const { nega } = this.props;
    const { showDescription } = this.state;

    return (
      <Card className='Nega'>
        <IconMenu
          icon='more_vert'
          menuRipple
          className='Nega-menu'
        >
          <MenuItem
            value='edit'
            icon='edit'
            caption='Edit'
            onClick={this.handleClickEdit}
          />
          <MenuDivider />
          <MenuItem
            value='signout'
            icon='delete'
            caption='Delete'
            onClick={this.handleClickDelete}
          />
        </IconMenu>
        <CardText>
          {!showDescription ?
            <div className='Nega-title'>
              <Markdown source={nega.title} />
            </div> :
            <div className='Nega-Description'>
              <Markdown source={nega.description} />
            </div>
          }
        </CardText>
        <CardActions className='Nega-actions'>
          <Button
            icon='replay'
            label='Flip'
            onClick={this.handleClickFlip}
          />
        </CardActions>
      </Card>
    );
  }
}

export default Nega;
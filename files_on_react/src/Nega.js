import React, { Component } from 'react';
import Card from 'react-toolbox/lib/card/Card';
import CardText from 'react-toolbox/lib/card/CardText';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import './Nega.css'

class Nega extends Component {
  constructor(props) {
    super(props);

    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickEdit() {
    this.props.onClickEdit(this.props.nega);
  }

  handleClickDelete() {
      this.props.onClickDelete(this.props.nega);
  }

  render() {
    const { nega } = this.props;

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
            <div className='Nega-title'>
              {nega.title}
            </div> 
            <div className='Nega-Description'>
              {nega.description}
            </div>
        </CardText>
      </Card>
    );
  }
}

export default Nega;
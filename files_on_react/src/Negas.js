import React, { Component } from 'react';
import Nega from './Nega';
import Button from 'react-toolbox/lib/button/Button';
import Chip from 'react-toolbox/lib/chip/Chip';

class Negas extends Component {
  renderNegas() {

    if (this.props.negas == null) {
      return 'Loading...';
    }

    if (this.props.negas.length === 0) {
      return 'Add a nega for this tag!';
    }

    const {
      negas,
      selectedNegaIndex,
      onClickPreviousNega,
      onClickNextNega,
      onClickEdit,
      onClickDelete
    } = this.props;

    const currentNega = negas[selectedNegaIndex];

    return (
      <div className='Negas-content'>
        <div className='Negas-button'>
          <Button icon='keyboard_arrow_left' floating
            disabled={selectedNegaIndex === 0}
            onClick={onClickPreviousNega}
          />
        </div>
        <Nega
          nega={currentNega}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
        <div className='Negas-button'>
          <Button icon='keyboard_arrow_right' floating
            disabled={selectedNegaIndex === negas.length - 1}
            onClick={onClickNextNega}
          />
        </div>
        <div className='Negas-index'>
          <Chip>
            {selectedNegaIndex + 1} / {negas.length}
          </Chip>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='Negas'>
        {this.renderNegas()}
      </div>
    );
  }
}

export default Negas;
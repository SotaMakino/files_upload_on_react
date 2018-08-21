import React, { Component } from 'react';
import Nega from './Nega';
import Chip from 'react-toolbox/lib/chip/Chip';
import './Negas.css';

class Negas extends Component {
  renderNegas() {

    if (this.props.negas == null) {
      return 'Loading...';
    }

    if (this.props.negas.length === 0) {
      return 'zero data';
    }

    const {
      negas,
      selectedNegaIndex,
      onClickEdit,
      onClickDelete
    } = this.props;

    const currentNega = negas[selectedNegaIndex];

    return (
      <div className='Negas-content'>
        <div className='Negas-button'>
        </div>
        <Nega
          nega={currentNega}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
        <div className='Negas-button'>
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
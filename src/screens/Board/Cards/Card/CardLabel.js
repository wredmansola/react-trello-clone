import React, { Component } from 'react';

import { LABELS } from '../../../../constants';
import { Label } from '../../../../components/Label';

export default class CardLabel extends Component {
  render() {
    return LABELS.map((color, index) => <Label key={index} color={color} />);
  }
}

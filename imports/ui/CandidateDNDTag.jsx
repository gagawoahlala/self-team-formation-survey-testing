import React, { Component, PropTypes } from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
		<li className='candidate-tag'>{value}</li>);

const SortableList = SortableContainer(({items}) => {
	return (
		<ul>
			{items.map((c, index) =>
				<SortableItem key={c.mturk_id} index={index} value={c.name} />
				)}
		</ul>
	);
});

export default class CandidateDNDTag extends Component {

  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({oldIndex, newIndex}){
  	this.props.updateCandidatesOrding(
  		arrayMove(this.props.candidates, oldIndex, newIndex));
  };

  render() {
    return (
      <SortableList
      	items={this.props.candidates}
      	axis="x"
      	onSortEnd={this.onSortEnd} />
    )
  }
}

CandidateDNDTag.propTypes = {
  candidates: React.PropTypes.array.isRequired,
  updateCandidatesOrding: React.PropTypes.func.isRequired,
}
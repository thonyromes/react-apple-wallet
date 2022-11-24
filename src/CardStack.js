import React from 'react';
import PropTypes from 'prop-types';

const errorMessage =
  'CardStack component must have at least two child Card components. Please check the children of this CardStack instance.';

class CardStack extends React.Component {
  constructor(props) {
    super(props);
    const { children, height } = props;

    const childrenLength = children.length || 1;
    const headerHeight = height / childrenLength;

    if (childrenLength <= 1) throw new Error(errorMessage);

    this.initialTopOffsets = props.children.map((_, i) =>
      i === 0 ? 0 : headerHeight * i
    );

    this.state = {
      topOffsets: this.initialTopOffsets,
      cardSelected: false,
    };
  }

  componentDidMount() {
    const { initialCard, children } = this.props;

    if (initialCard >= children.length)
      throw new Error(
        'prop "initialCard" cannot be equal or greater than children.length'
      );
    else if (initialCard >= 0) this.handleCardClick(initialCard);
  }

  handleCardClick(id, cb) {
    const initialState = {
      topOffsets: [],
      cardSelected: true,
    };

    const { cardSelected, topOffsets } = this.state;
    const { height } = this.props;

    const nextState = (prev, offset, index) => {
      const newOffset = index === id ? 0 : height;
      return {
        cardSelected: !cardSelected,
        topOffsets: [
          ...prev.topOffsets,
          cardSelected ? this.initialTopOffsets[index] : newOffset,
        ],
      };
    };

    this.setState(topOffsets.reduce(nextState, initialState));

    if (cb) cb(cardSelected, id);
  }

  renderCards() {
    const { hoverOffset, height, children } = this.props;
    const { cardSelected, topOffsets } = this.state;

    const cloneCard = (child, i) =>
      React.cloneElement(child, {
        key: i,
        cardId: i,
        hoverOffset,
        cardSelected,
        height,
        topOffset: topOffsets[i],
        onClick: this.handleCardClick.bind(this),
      });

    return children.map(cloneCard);
  }

  render() {
    const { background, height, width, style } = this.props;

    const stackStyles = {
      ...styles,
      background,
      height,
      width,
      ...style,
    };
    return <ul style={stackStyles}>{this.renderCards()}</ul>;
  }
}

const styles = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  padding: 0,
  margin: 0,
};

CardStack.propTypes = {
  background: PropTypes.string,
  height: PropTypes.number,
  hoverOffset: PropTypes.number,
  width: PropTypes.number,
  initialCard: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.shape(),
};

CardStack.defaultProps = {
  width: 350,
  height: 600,
  background: 'f8f8f8',
  hoverOffset: 30,
  initialCard: -1,
  children: undefined,
  style: {},
};

export default CardStack;

import React from 'react';
import PropTypes from 'prop-types';
import { onEnterPressed } from './handleKeyboardPressed';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  handleClick() {
    const {
      cardId,
      onClick,
      onCardClick,
      cardSelected,
      topOffset,
    } = this.props;

    onClick(cardId);

    if (onCardClick) {
      onCardClick(cardId, !cardSelected, topOffset);
    }

    this.setState({ hover: false });
  }

  render() {
    const {
      cardId,
      cardSelected,
      topOffset,
      hoverOffset,
      background,
      height,
      style,
      children,
      buttonStyle,
      cardSelectedStyle,
      cardHoverStyle,
    } = this.props;
    const { hover } = this.state;

    const offset = cardId !== 0 && hover && !cardSelected ? hoverOffset : 0;
    const transform = `translate3d(0,${topOffset - offset}px,0)`;

    const cardStyles = {
      ...styles,
      background,
      transform,
      WebkitTransform: transform,
      height,
      ...style,
      ...(hover
        ? {
            ...cardHoverStyle,
          }
        : {}),
      ...(cardSelected
        ? {
            ...cardSelectedStyle,
          }
        : {}),
    };

    return (
      <li style={cardStyles}>
        <button
          tabIndex={-1}
          style={{ ...buttonStyles, ...buttonStyle }}
          type="button"
          onClick={event => {
            // If not keypress
            if (event.detail !== 0) {
              this.handleClick();
            }
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onKeyUp={event => {
            if (onEnterPressed(event)) {
              this.handleClick();
            }
          }}
        >
          {children}
        </button>
      </li>
    );
  }
}

const styles = {
  position: 'absolute',
  top: 0,
  width: '100%',
  cursor: 'pointer',
  transition: '0.5s transform ease',
  WebkitTransition: '-webkit-transform 0.5s ease',
  transformStyle: 'preserve-3d',
};

const buttonStyles = {
  display: 'inherit',
  border: 'inherit',
  padding: 'inherit',
  margin: 'inherit',
  textDecoration: 'inherit',
  background: 'inherit',
  color: 'inherit',
  cursor: 'inherit',
  WebkitAppearance: 'inherit',
  MozAppearance: 'inherit',
  height: 'inherit',
  width: 'inherit',
  position: 'inherit',
  textAlign: 'inherit',
};

Card.propTypes = {
  background: PropTypes.string,
  height: PropTypes.number,
  hoverOffset: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.shape(),
  cardSelected: PropTypes.bool,
  topOffset: PropTypes.number,
  cardId: PropTypes.number || PropTypes.string,
  onClick: PropTypes.func,
  onCardClick: PropTypes.func,
  buttonStyle: PropTypes.shape(),
  cardSelectedStyle: PropTypes.shape(),
  cardHoverStyle: PropTypes.shape(),
};

Card.defaultProps = {
  height: undefined,
  background: 'transparent',
  hoverOffset: undefined,
  children: undefined,
  style: {},
  cardSelected: false,
  topOffset: undefined,
  cardId: undefined,
  onClick: () => {},
  onCardClick: undefined,
  buttonStyle: {},
  cardSelectedStyle: {},
  cardHoverStyle: {},
};

export default Card;

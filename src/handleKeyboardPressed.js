const handleKeyboardPressed = (event, key, code, keyCode) => {
  if (event?.key === key || event?.code === code || event.keyCode === keyCode) {
    return true;
  }

  return false;
};

const onEnterPressed = (event, callback) => {
  if (handleKeyboardPressed(event, 'Enter', 'Enter', 13)) {
    event.preventDefault();

    if (callback) callback();

    return true;
  }

  return false;
};

export { handleKeyboardPressed, onEnterPressed };

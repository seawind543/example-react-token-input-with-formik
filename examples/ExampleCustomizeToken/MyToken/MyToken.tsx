/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  SyntheticEvent,
} from 'react';
import classNames from 'classnames';
import keyDownKey from 'keydown-key';
import DeleteButton from './DeleteButton';

import styles from '../myToken.scss';

interface ActionFunction {
  (keyDownEvent: React.KeyboardEvent): void;
}

interface KeyDownHandlerProxyActions {
  onBackspace?: ActionFunction;
  onTab?: ActionFunction;
  onEnter?: ActionFunction;
  onEscape?: ActionFunction;
}

/**
 * Help function to proxy keyDown event to handler
 *
 * @param {React.KeyboardEvent} keyDownEvent - The keyDown event
 * @param {KeyDownHandlerProxyActions} actions
 * @param {ActionFunction} [actions.onBackspace] - The handler for `backspace` keyDown event
 * @param {ActionFunction} [actions.onTab] - The handler for `tab` keyDown event
 * @param {ActionFunction} [actions.onEnter] - The handler for `enter` keyDown event
 * @param {ActionFunction} [actions.onEscape] - The handler for `escape` keyDown event
 */
const keyDownHandlerProxy = (
  keyDownEvent: React.KeyboardEvent,
  actions: KeyDownHandlerProxyActions,
): void => {
  const { onBackspace, onTab, onEnter, onEscape } = actions;

  const { key: eventKey } = keyDownKey(keyDownEvent.nativeEvent);

  switch (eventKey) {
    case 'Backspace':
      onBackspace?.(keyDownEvent);
      break;

    case 'Tab':
      onTab?.(keyDownEvent);
      break;

    case 'Enter':
      onEnter?.(keyDownEvent);
      break;

    case 'Escape':
      onEscape?.(keyDownEvent);
      break;

    default:
  }
};

const handleTokenClick = (e: SyntheticEvent) => {
  // console.log('handleTokenClick');
  e.stopPropagation();
};

const MyToken = ({
  tokenValue,
  tokenMeta,
  onEditStart,
  onEditEnd,
  onDelete,

  /**
   * Could ignore below props(Replace by self implementation)
   * when override built-in Token component.
   *
   * Because basically they are as same as what you passed into TokenInput.
   * That is, you already know what is their implementation.
   */
  // readOnly,
  // onGetClassName,
  // onGetDisplayLabel,
  // onRenderDeleteButtonContent,
  // onGetIsEditable,
  // onGetEditableValue,
  // onBuildTokenValue,
  // onGetErrorMessage,
}: {
  tokenValue: string;
  tokenMeta: { activated: boolean; error: null | undefined | Error };
  onEditStart: () => void;
  onEditEnd: (newTokenValue?: string) => void;
  onDelete: () => void;
}) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const { activated, error } = tokenMeta;

  // Could use self implementation and ignore props `readOnly`
  const isReadOnlyToken = useMemo(() => {
    return tokenValue === 'Example: ReadOnly Token';
  }, [tokenValue]);

  const displayLabel = useMemo(() => {
    return tokenValue;

    // Could use self implementation and ignore props `onGetDisplayLabel`
    // return onGetDisplayLabel(tokenValue, tokenMeta);
  }, [tokenValue]);

  const handleEditStart = useCallback(() => {
    // Could use self implementation and ignore props `onGetEditableValue`
    // const tokenEditableValue = onGetEditableValue(tokenValue, tokenMeta);
    const tokenEditableValue = tokenValue;

    setInputValue(tokenEditableValue);
    onEditStart();
  }, [setInputValue, tokenValue, onEditStart]);
  useEffect(() => {
    const Input = inputRef.current;
    if (activated && Input) {
      (Input as HTMLInputElement).focus();
    }
  }, [activated]);

  const handleEditEnd = useCallback(
    ({ reset = false } = {}) => {
      // Handle input inputValue length === 0 case: Rest token
      const isValueClear = inputValue.length === 0;
      if (reset || isValueClear) {
        onEditEnd();
        return;
      }

      // Could use self implementation and ignore props `onBuildTokenValue`
      // const newTokenValue = onBuildTokenValue(inputValue);
      const newTokenValue = inputValue.trim();

      onEditEnd(newTokenValue);
    },
    [inputValue, onEditEnd],
  );

  /*
   * Event handlers
   */
  const handleEditIconClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const { target } = e;
      const isDeleteButton =
        (target as Element).getAttribute('data-component-name') ===
        'DeleteButton';
      if (isDeleteButton) {
        onDelete();
        return;
      }

      handleEditStart();
    },
    [onDelete, handleEditStart],
  );

  const handleTokenDelete = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      onDelete();
    },
    [onDelete],
  );

  const handleInputValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value);
    },
    [setInputValue],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      keyDownHandlerProxy(e, {
        onEscape: () => handleEditEnd({ reset: true }),
        onEnter: () => handleEditEnd(),
      });
    },
    [handleEditEnd],
  );

  const handleBlur = useCallback(() => {
    handleEditEnd();
  }, [handleEditEnd]);

  const className = useMemo(() => {
    return classNames(
      // Could use self implementation and ignore props `onGetClassName`
      // onGetClassName(tokenValue, tokenMeta),
      styles['customize-token'],
      {
        [styles.error]: error,
        [styles.pass]: !error,
      },
    );
  }, [error]);

  const errorMessage = useMemo(() => {
    if (error === undefined) {
      return undefined;
    }

    return tokenMeta.error?.message;

    // Could use self implementation and ignore props `onGetErrorMessage`
    // return `Error: ${onGetErrorMessage(tokenValue, tokenMeta)}`;
  }, [error, tokenMeta]);

  return (
    <div className={className} role="presentation" onClick={handleTokenClick}>
      {!activated && (
        <div className={styles['token-body']}>
          {!isReadOnlyToken && <DeleteButton onClick={handleTokenDelete} />}

          <div className={styles['display-label']}>{displayLabel}</div>

          {!isReadOnlyToken && (
            <span
              className={classNames(
                'material-icons',
                styles['button-icon'],
                styles['edit-icon'],
              )}
              role="button"
              aria-hidden="true"
              onClick={handleEditIconClick}
            >
              mode_edit
            </span>
          )}
        </div>
      )}

      {activated && (
        <div className={styles['token-body']}>
          <input
            ref={inputRef}
            className={styles.input}
            value={inputValue}
            onChange={handleInputValueChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
      )}

      <div className={styles.message}>
        {errorMessage && (
          <>
            <span
              className={classNames('material-icons', styles['status-icon'])}
            >
              highlight_off
            </span>
            {errorMessage}
          </>
        )}

        {!errorMessage && (
          <>
            <span
              className={classNames('material-icons', styles['status-icon'])}
            >
              check_circle
            </span>
            Valid
          </>
        )}
      </div>
    </div>
  );
};

export default MyToken;

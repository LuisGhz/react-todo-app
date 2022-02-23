/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const buttonStyle = css`
  background-color: rebeccapurple;
  border-radius: 1.5rem;
  border: none;
  color: white;
  height: 3rem;
  outline: none;
  width: 3rem;
  font-size: 2rem;
  &:hover {
    background-color: blue;
    cursor: pointer;
  }
`;

export const AddTodoButton = ({ click, style }) => {
  return (<button className="open-modal-todo-button" css={buttonStyle} style={style} onClick={click} >+</button>)
}
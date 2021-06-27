import React, { createContext, Dispatch, useReducer } from 'react';

// eslint-disable-next-line no-shadow
export enum ControlTypes {
  UPDATE_AXIS,
  RESET_AXES,
}

// eslint-disable-next-line no-shadow
// export enum AxisKey {
//   x,
//   y,
//   z,
//   roll,
//   pitch,
//   yaw,
// }

type AxisKey = 'x' | 'y' | 'z' | 'roll' | 'pitch' | 'yaw';

interface AxisObj {
  name: string;
  value: number;
}

type State = Record<AxisKey, AxisObj>;

export const initialValues: State = {
  x: {
    name: 'X',
    value: 0,
  },
  y: {
    name: 'Y',
    value: 0,
  },
  z: {
    name: 'Z',
    value: 0,
  },
  roll: {
    name: 'Roll',
    value: 0,
  },
  pitch: {
    name: 'Pitch',
    value: 0,
  },
  yaw: {
    name: 'Yaw',
    value: 0,
  },
};

export const ControlContext = createContext(initialValues);

type Action =
  | {
      type: ControlTypes.UPDATE_AXIS;
      payload: {
        axis: AxisKey;
        value: number;
      };
    }
  | {
      type: ControlTypes.RESET_AXES;
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ControlTypes.UPDATE_AXIS:
      return {
        ...state,
        [action.payload.axis]: {
          ...state[action.payload.axis],
          value: action.payload.value,
        },
      };
    case ControlTypes.RESET_AXES:
      return initialValues;
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

interface Value {
  state: Record<string, unknown>;
  dispatch: Dispatch<Action>;
}

export const AppProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const value: Value = { state, dispatch };

  return (
    <ControlContext.Provider value={value}>{children}</ControlContext.Provider>
  );
};

import { SET_MUSIC } from '../actions';

export default function music(state = [1, 2, 3], action = {}) {
  switch (action.type) {
    case SET_MUSIC:
      return action.music;
    default:
      '';
      return state;
  }
}

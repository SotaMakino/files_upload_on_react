import * as axios from './axiosClient';

export function createNega(nega, prevState) {
  const idComparator = (a, b) => (a.id === b.id);
  const newNegas = prevState.negas.concat(
    axios.contains(nega, idComparator)
      ? nega
      : []
  );
  const newIndex = prevState.selectedNegaIndex || 0;

  return {
    negas: newNegas,
    selectedNegaIndex: newIndex,
    negaInDialog: null
  };
}

export function updateNega(nega, prevState) {
  const { negas, selectedNegaIndex } = prevState;

  const idComparator = (a, b) => (a.id === b.id);
  // Update nega with new information.
  const newNegas = negas.reduce((memo, f) => {
    if (f.id === nega.id) {
      memo.push(nega)
    } else {
      memo.push(f);
    }
    return memo;
  }, []);
  const hasBeenDeleted = newNegas.length < negas.length;
  const newIndex = hasBeenDeleted
    ? negas.length - 1 > 0
    ? Math.min(selectedNegaIndex, negas.length - 2)
    : null
    : selectedNegaIndex;

  return {
    negas: newNegas,
    selectedNegaIndex: newIndex,
    negaInDialog: null
  };
}

export function deleteNega(nega, prevState) {
  const { negas, selectedNegaIndex } = prevState;

  const newNegas = negas.filter(f => {
    return f.id !== nega.id;
  });
  const newIndex = negas.length - 1 > 0
    ? Math.min(selectedNegaIndex, negas.length - 2)
    : null;

  return {
    negas: newNegas,
    selectedNegaIndex: newIndex
  }
}
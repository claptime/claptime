/* eslint-disable no-loop-func */

export const sortEpisodesInSeries = (listItems) => {
  const list = [];
  let lastItem = listItems.find((i) => !i.videoNodeNextNodeId);
  while (lastItem) {
    list.push(lastItem);
    lastItem = listItems.find((i) => i.videoNodeNextNodeId === lastItem.id);
  }
  return list.reverse();
};

export default {
  sortEpisodesInSeries,
};

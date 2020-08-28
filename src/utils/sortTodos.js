const sortTodos = (todos) => {
  // complet sort toods algorithm
  return todos.slice().sort((a, b) => {
    if (!a.date && !b.date) return b.timestamp - a.timestamp;
    else if (!a.date) return 1;
    else if (!b.date) return -1;

    const aDate = a.date.toDate();
    const bDate = b.date.toDate();

    const sameDay =
      aDate.getFullYear() === bDate.getFullYear() &&
      aDate.getMonth() === bDate.getMonth() &&
      aDate.getDate() === bDate.getDate();

    const aHasHours = aDate.getHours() !== 0 || aDate.getMinutes() !== 0;
    const bHasHours = bDate.getHours() !== 0 || bDate.getMinutes() !== 0;

    if (sameDay && !aHasHours && bHasHours) return 1;
    else if (sameDay && aHasHours && !bHasHours) return -1;

    return a.date.seconds - b.date.seconds;
  });
};

export default sortTodos;

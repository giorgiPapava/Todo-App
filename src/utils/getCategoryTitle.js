const getCategoryTitle = (categoryTitle) => {
  let words = categoryTitle.split('-');
  let upperCase = words.map((word) =>
    word === '%26' ? '&' : word.slice(0, 1).toUpperCase().concat(word.slice(1))
  );
  return upperCase.join(' ');
};

export default getCategoryTitle;

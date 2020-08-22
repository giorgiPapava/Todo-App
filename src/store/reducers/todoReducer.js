const initState = {
  todos: [
    {
      id: '1',
      status: 'active',
      description: 'Add eggs & breads for preferably breakfeast',
      date: '21 April, 2020',
    },
    {
      id: '2',
      status: 'active',
      description: 'Drink 3 liters water enough a day',
      date: '21 April, 2020 at 6.20am',
    },
    {
      id: '3',
      status: 'active',
      description: 'Finish this project',
      date: '1 September, 2020 at 4.00am',
    },

    { id: '4', status: 'active', description: 'Start Working', date: '2020' },
    { id: '5', status: 'done', description: 'Learn React', date: '2020' },
    { id: '6', status: 'active', description: 'Go gym', date: '2021' },
  ],
};

const todoReducer = (state = initState, action) => {
  return state;
};

export default todoReducer;

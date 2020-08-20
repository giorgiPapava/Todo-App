import React, { useState } from 'react';
import getCategoryTitle from 'utils/getCategoryTitle';

function CategoryInfo({ category }) {
  const statuses = ["All Todo's", 'Upcoming', 'Completed', 'Others'];

  const [currentStatus, setCurrentStatus] = useState("All Todo's");

  const handleStatusChange = (event) => {
    setCurrentStatus(event.target.textContent);

    // need algorithm to filter todo's
  };

  return (
    <div className="category-info">
      <h3>{getCategoryTitle(category)}</h3>
      <div className="todo-status">
        {statuses.map((status) => (
          <button
            className={status === currentStatus ? 'active-status' : undefined}
            onClick={handleStatusChange}
            key={status}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="border-wrapper"></div>
    </div>
  );
}
export default CategoryInfo;

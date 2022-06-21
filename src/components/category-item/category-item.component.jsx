import './category-item.styles.scss';
import {useNavigate} from 'react-router-dom';

const CategoryItem = ({category}) => {
  const {imageUrl, title, linkUrl} = category;
  const navigate = useNavigate ();

  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div
        className="category-body-container"
        onClick={() => navigate (linkUrl)}
      >
        <h2>{title}</h2>
        <p>Click here</p>
      </div>
    </div>
  );
};

export default CategoryItem;

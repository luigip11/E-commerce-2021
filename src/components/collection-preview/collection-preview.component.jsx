import React from 'react';
import { Link } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

//functional component

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
      <div className='flex-container'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <Link to={"/signin"} className='view-all'>Vedi tutti</Link>
      </div>
      <div className='preview'>
        {items
          .filter((item, idx) => idx < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
  
  export default CollectionPreview;
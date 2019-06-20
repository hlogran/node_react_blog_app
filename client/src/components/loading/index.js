import React from 'react'
import './styles.css';

import loadingGif from '../../loading.gif';

function Loading() {
  return (
    <div className="Loading">
      <img src={loadingGif} alt={'Loading...'} />
    </div>
  );
}

export default Loading;
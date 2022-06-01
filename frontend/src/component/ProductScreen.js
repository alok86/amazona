import React from 'react';
import { useParams } from 'react-router-dom';

function ProductScreen() {
  const param = useParams();
  const { slug } = param;
  return (
    <div>
      Product
      <br />
      {slug}
    </div>
  );
}

export default ProductScreen;

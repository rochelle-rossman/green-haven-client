import { useEffect, useState } from 'react';
import DesignList from '../../components/design/DesignList';
import { getDesigns } from '../../utils/data/designData';

function ProductHome() {
  const [designs, setDesigns] = useState([]);

  const getAllDesigns = () => {
    getDesigns().then((designsArr) => {
      setDesigns(designsArr);
    });
  };

  useEffect(() => {
    getAllDesigns();
  }, []);

  return (
    <div className="products">
      <DesignList key={designs.id} designs={designs} />
    </div>
  );
}

export default ProductHome;

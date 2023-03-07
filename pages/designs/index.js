/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import DesignList from '../../components/design/DesignList';
import { ProductTypeContext } from '../../utils/context/productTypeContext';
import { getDesigns } from '../../utils/data/designData';

function DesignHome() {
  const [designs, setDesigns] = useState([]);
  const { designRoom, designStyle } = useContext(ProductTypeContext);

  const queryParams = {
    style: designStyle,
    room: designRoom,
  };

  const getAllDesigns = () => {
    if (designRoom) {
      queryParams.room = designRoom;
    }
    if (designStyle) {
      queryParams.style = designStyle;
    }

    getDesigns(queryParams).then((designsArr) => {
      setDesigns(designsArr);
    });
  };

  useEffect(() => {
    getAllDesigns();
  }, [designRoom, designStyle]);

  return (
    <div className="products">
      <DesignList key={designs.id} designs={designs} />
    </div>
  );
}

export default DesignHome;

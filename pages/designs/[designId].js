import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DesignDetail from '../../components/design/DesignDetail';
import { getSingleDesign } from '../../utils/data/designData';

export default function DesignDetailView() {
  const [design, setDesign] = useState({});
  const router = useRouter();
  const { designId } = router.query;

  useEffect(() => {
    getSingleDesign(designId).then(setDesign);
  }, [router, designId]);

  return <DesignDetail design={design} />;
}

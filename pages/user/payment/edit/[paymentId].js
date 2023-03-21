import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PaymentMethodForm from '../../../../components/user/PaymentMethodForm';
import { getSinglePaymentMethod } from '../../../../utils/data/paymentMethodData';

export default function EditPayment() {
  const router = useRouter();
  const [editPayment, setEditPayment] = useState({});
  const { paymentId } = router.query;

  const onUpdate = () => {
    getSinglePaymentMethod(paymentId).then(setEditPayment);
  };

  useEffect(() => {
    getSinglePaymentMethod(paymentId).then(setEditPayment);
  }, [paymentId]);

  return <PaymentMethodForm paymentMethod={editPayment} onUpdate={onUpdate} />;
}

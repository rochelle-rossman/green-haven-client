import React from 'react';
import PaymentMethodForm from '../../../components/user/PaymentMethodForm';
import { useAuth } from '../../../utils/context/authContext';

export default function AddPaymentMethod() {
  const { onUpdate } = useAuth();
  return <PaymentMethodForm onUpdate={onUpdate} />;
}

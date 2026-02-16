
import { Suspense } from 'react';
import EnterNewPassword from '../../components/Auth/EnterNewPassword'

export default function EnterPinPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterNewPassword />
    </Suspense>
  );
}

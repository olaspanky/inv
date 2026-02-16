
import { Suspense } from 'react';
import EnterPin from '../../components/Auth/EnterPin'

export default function EnterPinPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterPin />
    </Suspense>
  );
}

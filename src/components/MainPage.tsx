import { useState } from 'react';
import { useFormStore } from '../useFormState';
import { Modal } from './Modal';
import { ReactHookFormComponent } from './ReactHookFormComponent';
import { UncontrolledForm } from './UncontrolledForm';

export default function App() {
  const [modalType, setModalType] = useState<'rhf' | 'uncontrolled' | null>(
    null
  );
  const submissions = useFormStore((state) => state.submissions);

  const closeModal = () => setModalType(null);

  return (
    <div className="flex gap-10 flex-col p-5">
      <h1 className="text-3xl text-center font-bold">React Forms</h1>

      <div className="flex gap-4">
        <button
          className="min-w-50 h-10 rounded-md border cursor-pointer hover:bg-gray-100"
          onClick={() => setModalType('rhf')}
        >
          RHF Form
        </button>
        <button
          className="min-w-50 h-10 rounded-md border cursor-pointer hover:bg-gray-100"
          onClick={() => setModalType('uncontrolled')}
        >
          Uncontrolled Form
        </button>
      </div>

      <Modal
        isOpen={modalType !== null}
        onClose={closeModal}
        title={modalType === 'rhf' ? 'React Hook Form' : 'Uncontrolled Form'}
      >
        {modalType === 'rhf' && (
          <ReactHookFormComponent onSuccess={closeModal} />
        )}
        {modalType === 'uncontrolled' && (
          <UncontrolledForm onSuccess={closeModal} />
        )}
      </Modal>

      <h2 className="text-xl text-center font-bold">Submissions History</h2>
      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {submissions.map((sub, index) => (
          <div
            key={sub.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              borderRadius: '8px',
              animation: index === 0 ? 'highlight 3s ease-out' : 'none',
            }}
          >
            <img
              src={sub.image}
              alt="Profile"
              className="w-full h-37.5 object-cover rounded"
            />
            <h3>{sub.name}</h3>
            <p>
              <strong>Age:</strong> {sub.age}
            </p>
            <p>
              <strong>Email:</strong> {sub.email}
            </p>
            <p>
              <strong>Gender:</strong> {sub.gender}
            </p>
            <p>
              <strong>Country:</strong> {sub.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

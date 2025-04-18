import React, { useEffect, useRef, useState } from 'react';

export const DateSelectionModal = ({ onConfirm, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const dialogRef = useRef(null);

  const handleConfirm = () => {
    if (selectedDate) {
      onConfirm(new Date(selectedDate));
      dialogRef.current?.close();
    }
  };

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

    return () => {
      if (dialogRef.current) {
        dialogRef.current.close(); // cleanup
      }
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Select a date for appointment</h3>
        <input
          type="datetime-local"
          className="input input-bordered w-full my-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={handleConfirm}>OK</button>
        </div>
      </div>
    </dialog>
  );
};

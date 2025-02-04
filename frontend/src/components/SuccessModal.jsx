const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold">Purchase Successful!</h2>
                <p>Your purchase has been completed successfully.</p>
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};



export default SuccessModal;

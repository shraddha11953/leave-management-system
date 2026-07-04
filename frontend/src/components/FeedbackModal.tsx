import { useState, useEffect } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  onSubmit,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFeedback("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!feedback.trim()) {
      alert("Please enter feedback");
      return;
    }

    onSubmit(feedback);
    setFeedback("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[500px] p-8">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Reject Leave Request
        </h2>

        <label className="font-semibold">
          Feedback
        </label>

        <textarea
          rows={5}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter rejection reason..."
          className="w-full border rounded-lg p-3 mt-2 resize-none"
        />

        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reject Leave
          </button>

        </div>

      </div>

    </div>
  );
}
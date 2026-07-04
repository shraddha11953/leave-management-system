import { useState, useEffect } from "react";
import { XCircle, MessageSquare } from "lucide-react";

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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pt-6 pb-4 pl-8 pr-8">

      <div className="w-[520px] max-w-[92%] bg-white rounded-2xl shadow-2xl overflow-hidden pt-6 pb-4 pl-8 pr-8">

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-4 bg-red-50 border-b border-red-100">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="text-red-600" size={26} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 pt-6">
                Reject Leave
              </h2>

              <p className="text-sm text-gray-500">
                Give a reason before rejecting.
              </p>
            </div>

          </div>

        </div>

        {/* Body */}

        <div className="p-6">

          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">

            <MessageSquare size={18} />

            Feedback

          </label>

          <textarea
            rows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write rejection reason..."
            className="w-full rounded-xl border border-gray-300 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
          />

          <div className="flex justify-between items-center mt-6">

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Reject Leave
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
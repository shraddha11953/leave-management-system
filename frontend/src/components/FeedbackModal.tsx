import { useState, useEffect } from "react";
import { XCircle, MessageSquare } from "lucide-react";
import "./FeedbackModal.css";

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
    <div className="feedback-overlay">

      <div className="feedback-modal">

        <div className="feedback-header">

          <div className="feedback-title">

            <div className="feedback-icon">
              <XCircle size={24} />
            </div>

            <div>
              <h2>Reject Leave</h2>
              <p>Please provide a reason for rejection.</p>
            </div>

          </div>

        </div>

        <div className="feedback-body">

          <label>

            <MessageSquare size={18} />

            rejection reason

          </label>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write rejection reason..."
          />

          <div className="feedback-buttons">

            <button
              className="cancel-feedback-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="reject-feedback-btn"
              onClick={handleSubmit}
            >
              Reject Leave
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
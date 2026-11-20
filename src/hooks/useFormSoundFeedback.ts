/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef } from 'react';
import {
  FormSubmissionSnapshot,
  hasFormSubmissionErrors,
  playFormFeedbackSound,
  resolveFormSubmissionOutcomeEvent,
} from '../utils/soundManager.ts';

interface FormSubmissionStateInput {
  submitting: boolean;
  succeeded: boolean;
  errors: unknown;
}

export interface FormSoundFeedbackControls {
  /** Triggers gentle 'ui-error' notification on explicit submit validation failure */
  notifyValidationError: () => void;
  /** Marks an explicit user form submission and plays subtle submit click */
  notifySubmitAttempt: () => void;
  /** Clears pending submission state when the form is reset */
  resetFormSoundState: () => void;
}

/**
 * Binds explicit form interaction events to TechSphere's central sound manager.
 * Ensures 'ui-success' and 'ui-error' play strictly on explicit submission outcomes
 * and validation failures—never on mount, typing, field focus, or blur.
 */
export function useFormSoundFeedback({
  submitting,
  succeeded,
  errors,
}: FormSubmissionStateInput): FormSoundFeedbackControls {
  const explicitSubmitPendingRef = useRef(false);
  const hasErrors = hasFormSubmissionErrors(errors);

  const prevSnapshotRef = useRef<FormSubmissionSnapshot>({
    submitting,
    succeeded,
    hasErrors,
    explicitSubmitPending: false,
  });

  useEffect(() => {
    const nextSnapshot: FormSubmissionSnapshot = {
      submitting,
      succeeded,
      hasErrors,
      explicitSubmitPending: explicitSubmitPendingRef.current,
    };

    const outcomeEvent = resolveFormSubmissionOutcomeEvent(
      prevSnapshotRef.current,
      nextSnapshot
    );

    if (outcomeEvent) {
      explicitSubmitPendingRef.current = false;
      playFormFeedbackSound(outcomeEvent);
    }

    prevSnapshotRef.current = {
      ...nextSnapshot,
      explicitSubmitPending: explicitSubmitPendingRef.current,
    };
  }, [submitting, succeeded, hasErrors]);

  const notifyValidationError = useCallback(() => {
    explicitSubmitPendingRef.current = false;
    playFormFeedbackSound('validation-error');
  }, []);

  const notifySubmitAttempt = useCallback(() => {
    explicitSubmitPendingRef.current = true;
    playFormFeedbackSound('submit');
  }, []);

  const resetFormSoundState = useCallback(() => {
    explicitSubmitPendingRef.current = false;
    prevSnapshotRef.current = {
      submitting: false,
      succeeded: false,
      hasErrors: false,
      explicitSubmitPending: false,
    };
  }, []);

  return {
    notifyValidationError,
    notifySubmitAttempt,
    resetFormSoundState,
  };
}

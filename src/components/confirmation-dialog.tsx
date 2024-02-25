'use client';
import { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/alert-dialog';

interface ConfirmationModalProps {
  description?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  onOpenChange: () => void;
  title?: ReactNode;
}

const ConfirmationDialog: FC<ConfirmationModalProps> = ({
  description,
  isOpen,
  onClose,
  onConfirm,
  onOpenChange,
  title,
}) => {
  const [isConfirmationLoading, setIsConfirmationLoading] = useState(false);
  const handleConfirmation = useCallback(async () => {
    setIsConfirmationLoading(true);
    await onConfirm();
    onClose();
    setIsConfirmationLoading(false);
  }, [onConfirm, onClose]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmation} disabled={isConfirmationLoading}>
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface ConfirmationDialogContextType {
  openModal: () => void;
  setContent: (title: ReactNode, description: ReactNode) => void;
  setConfirmationCallback: (onConfirm: () => Promise<void>) => void;
}

const ConfirmationDialogContext = createContext<ConfirmationDialogContextType | undefined>(undefined);

export const ConfirmationDialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<ReactNode>('');
  const [description, setDescription] = useState<ReactNode>('');
  const [onConfirm, setOnConfirm] = useState(() => () => Promise.resolve());
  const [isOpen, setIsOpen] = useState(false);

  const setContent = useCallback((title?: ReactNode, description?: ReactNode) => {
    setTitle(title);
    setDescription(description);
  }, []);

  const setConfirmationCallback = useCallback((onConfirm: () => Promise<void>) => {
    setOnConfirm(() => onConfirm);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onOpenChange = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return (
    <ConfirmationDialogContext.Provider value={{ openModal, setContent, setConfirmationCallback }}>
      {children}
      <ConfirmationDialog
        title={title}
        description={description}
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={onConfirm}
        onOpenChange={onOpenChange}
      />
    </ConfirmationDialogContext.Provider>
  );
};

export const useConfirmationDialog = (): ConfirmationDialogContextType => {
  const context = useContext(ConfirmationDialogContext);
  if (context === undefined) {
    throw new Error('useConfirmationDialog must be used within a ConfirmationDialogProvider');
  }

  return context;
};

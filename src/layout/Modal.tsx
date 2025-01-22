import React from "react";
import styled from "styled-components";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 12px 12px 0 0;
    width: 100%;
    position: relative;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
`;

function Modal({ isOpen, onClose, children, title }: ModalProps) {
    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    {title && <ModalTitle>{title}</ModalTitle>}
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
}

export default Modal;

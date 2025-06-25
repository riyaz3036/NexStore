"use client"
import ColorConstants from "@/constants/ColorConstants";
import { Button, Modal } from "antd";
import React, { useState } from "react";

interface ConfirmationProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
    buttonA: string;
    buttonB?: string;
    buttonExec: any;
}

const Confirmation: React.FC<ConfirmationProps> = ({text, buttonA, buttonB, buttonExec, open, setOpen}) => {
    return (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={[
                <Button
                 key="confirmation-a"
                    style={{ width: '110px' , backgroundColor: ColorConstants.secondaryColor, color: ColorConstants.white}}
                    onClick={() => setOpen(false)} 
                >
                    {buttonB ? buttonB : 'No'}
                </Button>,
                <Button
                    key="confirmation-b"
                    style={{ width: '110px', backgroundColor: ColorConstants.primaryColor, color: ColorConstants.white }}
                    onClick={buttonExec} 
                >
                    Yes
                </Button>
            ]}
        >
            <div className="py-[24px]">
                {text}
            </div>
        </Modal>
    )
}


export default Confirmation;
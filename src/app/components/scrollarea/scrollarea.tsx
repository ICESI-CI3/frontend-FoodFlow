import React, { FC, ReactNode } from "react";

interface ScrollAreaProps {
    className?: string;
    children: ReactNode;
}

export const ScrollArea: FC<ScrollAreaProps> = ({ className, children }) => {
    return (
        <ScrollArea className={` ${className}`}>
            {children}
        </ScrollArea>
    );
};
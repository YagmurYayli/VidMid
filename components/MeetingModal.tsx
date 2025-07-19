import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({isOpen, onClose , title,  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps)  => {
  return (
    
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className=' w-full max-w-[520px]
  gap-6 border-none bg-[#1C1F2E] px-6 py-9 text-white'>
    <div className="flex flex-col items-center text-center space-y-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
           <DialogTitle asChild>
            <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}</h1>
            </DialogTitle>
              {children}
          <Button className={"bg-[#0E78F9] w-full max-w-[200px]"}
            onClick={handleClick}>
          
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}
           
            {buttonText || "Schedule Meeting"}
          </Button>
          </div>
  </DialogContent>
</Dialog>
  )
}

export default MeetingModal

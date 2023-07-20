import Image from "next/image";
import { MouseEventHandler } from "react";

type Props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
};

const Button = ({
  title,
  bgColor,
  handleClick,
  isSubmitting,
  leftIcon,
  rightIcon,
  textColor,
  type,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`
        flexCenter 
        gap-3
        px-4 
        py-3 
        ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'}
        ${textColor || 'text-white'}
        rounded-xl
        text-sm
        font-medium
        max-md:w-full
      `}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="lefticon" />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="rightIcon" />
      )}
    </button>
  );
};

export default Button;

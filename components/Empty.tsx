import Image from "next/image";

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-12 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <img src="empty.gif" alt="GIF Animation" />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};

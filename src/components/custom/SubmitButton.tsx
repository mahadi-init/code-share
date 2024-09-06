"use client"
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SubmitButton({ style }: { style?: string }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className={style}
      disabled={pending}
    >
      {pending &&
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      }
      Submit
    </Button>
  )
}
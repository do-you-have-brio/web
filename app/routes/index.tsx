import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [description, setDescription] = useState("");

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setDescription(event.target.value);
  }

  function handleSubmit() {
    if (!description) {
      toast.error("Please enter a job description");
      return;
    }

    toast("CV created successfully!");
  }

  return (
    <div className="flex flex-col justify-center items-center p-8 gap-4">
      <div className="flex flex-col gap-2 w-full items-center max-w-6xl">
        <Label htmlFor="description" className="font-bold text-xl">
          What do you want to apply for?
        </Label>
        <Textarea
          id="description"
          className="border shadow max-h-[40vh]"
          placeholder="Enter the job description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <Button type="submit" className="" onClick={handleSubmit}>
        Create CV
      </Button>
    </div>
  );
}

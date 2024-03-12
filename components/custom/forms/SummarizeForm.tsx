"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateSummaryService } from "@/data/services/summary-service";
import { cn, extractYouTubeID } from "@/lib/utils";

interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

const INITIAL_STATE = {
  message: null,
  name: "",
  status: null,
};

export function SummarizeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>(INITIAL_STATE);
  const [value, setValue] = useState<string>("");

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    toast.success("Creating your summary");

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;

    const processedVideoId = extractYouTubeID(videoId);

    if (!processedVideoId) {
      toast.error("Invalid Youtube Video ID");
      setLoading(false);
      setValue("");
      setError({
        ...INITIAL_STATE,
        message: "Invalid Youtube Video ID",
        name: "Invalid Id",
      });
      return;
    }

    const summaryResponseData = await generateSummaryService(processedVideoId);

    console.log(summaryResponseData);
    
    if (summaryResponseData.error) {
      setValue("");
      toast.error(summaryResponseData.error.message);
      setError({
        ...INITIAL_STATE,
        message: summaryResponseData.error.message,
        name: "Summary Error",
      })
      setLoading(false);
      return;
    }

    toast.success("Summary Created!");

    setValue("");
    setLoading(false);
    router.push("/dashboard/summaries/" + summaryResponseData.data.id);
  }

  function clearError() {
    setError(INITIAL_STATE);
    if (error.message) setValue("");
  }

  const errorStyles = error.message
    ? "outline-1 outline outline-red-500 placeholder:text-red-700"
    : "";

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <Input
          name="videoId"
          placeholder={
            error.message ? error.message : "Youtube Video ID or URL"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={clearError}
          className={cn("w-full focus:text-black", errorStyles)}
          required
        />

        <SubmitButton
          text="Create Summary"
          loadingText="Creating Summary"
          loading={loading}
        />
      </form>
    </div>
  );
}

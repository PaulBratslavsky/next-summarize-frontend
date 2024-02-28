"use client";
import React from "react";
import { useFormState } from "react-dom";
import { uploadProfileImageAction } from "@/data/actions/upload-profile-image-action";
import { cn } from "@/lib/utils";

import { SubmitButton } from "@/components/custom/buttons/SubmitButton";
import ImagePicker from "@/components/custom/ImagePicker";
import { ZodErrors } from "../ZodErrors";

interface ProfileImageFormProps {
  id: string;
  url: string;
  alternativeText: string;
}

const initialState = {
  type: null,
  data: null,
  error: null,
};

export function ProfileImageForm({
  data,
  className,
}: {
  data: Readonly<ProfileImageFormProps>;
  className?: string;
}) {

  const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(null, data?.id);
  
  const [formState, formAction] = useFormState(
    uploadProfileImageWithIdAction,
    initialState
  );

  return (
    <form
      className={cn("space-y-4", className)}
      action={formAction}
      key={formState.data?.id || ""}
    >
      <div className="">
        <ImagePicker
          id="image"
          name="image"
          label="Profile Image"
          defaultValue={data?.url || ""}
        />
        <ZodErrors error={formState.zodErrors?.image} />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
      </div>
    </form>
  );
}

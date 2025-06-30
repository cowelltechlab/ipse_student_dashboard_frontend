"use client";

import {
  Button,
  FileUpload,
  Float,
  useFileUploadContext,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { LuFileImage, LuX } from "react-icons/lu";



const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;

  if (files.length === 0) return null;

  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item
          key={file.name}
          file={file}
          w="auto"
          boxSize="20"
          p="2"
        >
          <FileUpload.ItemPreviewImage
            boxSize="full"
            objectFit="cover"
            alt={file.name}
          />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger
              boxSize="4"
              layerStyle="fill.solid"
            >
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

interface ProfilePictureUploadProps {
  onFileUpload?: (file: File) => void;
}

const ProfilePictureUpload = ({
  onFileUpload,
}: ProfilePictureUploadProps) => {
  const fileUpload = useFileUploadContext(); // ensure context access

  // Watch for new uploads and optionally forward file
  useEffect(() => {
    const files = fileUpload.acceptedFiles;
    if (onFileUpload && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [fileUpload.acceptedFiles, onFileUpload]);

  return (
    <FileUpload.Root accept="image/*" maxFiles={1}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <LuFileImage /> Upload Profile Picture
        </Button>
      </FileUpload.Trigger>
      <FileUploadList />
    </FileUpload.Root>
  );
};

export default ProfilePictureUpload;

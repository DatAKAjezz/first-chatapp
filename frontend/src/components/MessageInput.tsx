import { useChatStore } from "@/store/useChatStore";
import { Input } from "@chakra-ui/react";
import { Image, Send, X } from "lucide-react";
import * as React from "react";
import { toaster } from "./ui/toaster";

export const MessageInput = () => {
  const [text, setText] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState<any>(null);
  const fileInputRef = React.useRef<any>(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toaster.error({ title: "Please select an image file" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  React.useEffect(() => {
    console.log("Image Ref: ", fileInputRef);
  }, [fileInputRef])

  const handleSendMessages = async (e: any) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      console.error("Failed to send message: ", error);
    }

  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2" style={{marginLeft: "10px"}}>
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3 cursor-pointer" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessages}
        className="flex items-center gap-2"
        style={{ paddingInline: "8px", paddingBottom: "3px" }}
      >
        <div className="flex flex-1 gap-2">
          <Input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Chatting..."
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`cursor-pointer hidden sm:flex`}
            onClick={() => fileInputRef.current?.click()}
            style={{
              color: `${imagePreview ? "text-emerald-500" : "text-zinc-400"}`,
              marginBlock: "auto",
            }}
          >
            <Image style={{ fontSize: "30px" }} />
          </button>
        </div>
        <button
          type="submit"
          className="h-full cursor-pointer hidden sm:flex"
          style={{ marginBlock: "auto" }}
          disabled={!text.trim() && !imagePreview}
        >
          <Send style={{ fontSize: "30px" }} />
        </button>
      </form>
    </div>
  );
};

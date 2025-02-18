import { Field } from "@/components/ui/field";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, defineStyle, Input } from "@chakra-ui/react";
import * as React from "react";
import { LuCamera } from "react-icons/lu";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = React.useState<any>(null)



  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => { 
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({profilePic: base64Image})
    }
  };

  return (
    <div
      className="h-screen"
      style={{ paddingTop: "3rem", color: "rgb(174, 161, 125)" }}
    >
      <div
        className="max-w-2xl"
        style={{
          marginInline: "auto",
          padding: "2rem",
          paddingTop: "4rem",
        }}
      >
        <div
          className="flex flex-col items-center justify-center rounded-xl p-6 space-y-8"
          style={{ backgroundColor: "rgb(24, 14, 23)" }}
        >
          <div className="text-center">
            <h1
              className="bold py-10"
              style={{
                fontSize: "22px",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              Profile
            </h1>
            <p
              className="light"
              style={{ fontSize: "14px", paddingBottom: "15px" }}
            >
              Your profile information
            </p>
          </div>

          {/* avatar upload */}

          <Avatar.Root
            width={"200px"}
            height={"200px"}
            colorPalette={"white"}
            className="relative"
            css={ringCss}
          >
            <Avatar.Fallback name={authUser.fullName} />
            <Avatar.Image src={selectedImage || authUser.profilePic ||  "/tmp.jpg" } />
            <label>
              <LuCamera
                className="absolute bottom-[15px] right-[15px] cursor-pointer rounded-full hover:grayscale-75"
                style={{ fontSize: "20px", backgroundColor: "rgb(169, 114, 60)", padding: "5px", boxSizing: 'content-box'}}
              />
              <input type="file"
              id = "avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled = {isUpdatingProfile}/>
            </label>
          </Avatar.Root>
          
          <p style={{fontSize: "10px", paddingBlock: "10px"}}>Click the camera icon to update your profile picture</p>
          {/* <br style={{marginBottom: "40px"}}/> */}

          <Field
            label="Full Name"
            className="max-w-md flex items-center justify-center"
          >
            <Input
              focusRingColor={"red.100"}
              value={authUser.fullName}
              disabled
            />
          </Field>
          <Field
            label="Email address"
            className="max-w-md flex items-center justify-center"
            style={{ marginBottom: "20px" }}
          >
            <Input value={authUser.email} disabled />
          </Field>
        </div>
      </div>

      <div
        className="max-w-2xl"
        style={{ marginInline: "auto", padding: "2rem" }}
      >
        <div
          className="flex flex-col rounded-xl p-6 space-y-8"
          style={{ backgroundColor: "rgb(24, 14, 23)", paddingInline: "16px" }}
        >
          <h1 style={{marginBlock: "10px"}} className="bold">Account Information</h1>
          <div>
            <p style={{fontSize: "14px"}}>Member Since</p>
          </div>
          <hr style={{height: "5px", marginInline: "20px" }} />
          <div>
            <p style={{fontSize: "14px"}}>Account Status</p>
          </div>

          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
})

export default ProfilePage;

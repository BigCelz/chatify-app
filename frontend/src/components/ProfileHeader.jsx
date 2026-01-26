import React, { useRef, useEffect, useState } from "react";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import PageLoader from "./PageLoader";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

function ProfileHeader() {
  const { logout, authUser, updateProfile,   isUploadingProfileImage } = useAuthStore();
  const { isSoundEnabled, toggleSound, isUsersLoading } = useChatStore();

  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);
  const clickSoundRef = useRef(null);

  // create audio AFTER component mounts (important)
  useEffect(() => {
    clickSoundRef.current = new Audio("/sounds/mouseClickSound.mp3");
    clickSoundRef.current.volume = 0.6;
  }, []);

  // stop loader once authUser exists
  useEffect(() => {
    if (authUser) setLoading(false);
  }, [authUser]);

  const user = authUser?.user || authUser;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setSelectedImg(reader.result);
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);

        //then we call our cloudinary upload api
        await updateProfile({ profilePic: base64Image });
    }
  };

  if (loading) return <PageLoader />;


  return (
    <div className="p-6 border-b border-slate-700/40">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || user?.profilePic || "/avatar1.png"}
                alt="profile"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-xs text-white">Change</span>
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            <h3 className="text-slate-200 font-medium max-w-[160px] truncate">
              {user?.fullName}
            </h3>
            <p className="text-slate-400 text-sm">Online</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="text-slate-400 hover:text-slate-200 transition"
          >
            <LogOutIcon className="size-5" />
          </button>

          <button
            onClick={() => {
              if (isSoundEnabled && clickSoundRef.current) {
                clickSoundRef.current.currentTime = 0;
                clickSoundRef.current
                  .play()
                  .catch((err) => console.error("Sound error:", err));
              }
              toggleSound();
            }}
            className="text-slate-400 hover:text-slate-200 transition"
          >
            {isSoundEnabled ? (
              <VolumeOffIcon className="size-5" />
            ) : (
              <Volume2Icon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

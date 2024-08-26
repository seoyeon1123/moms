import { PhotoIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useState } from 'react';

export default function ProfileImage() {
  const [preview, setPreview] = useState('');

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <>
      <form>
        <label
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover w-96"
          htmlFor="profileImage"
          style={{
            backgroundImage: `url(${preview})`,
            zIndex: 1,
          }}
        >
          {preview ? null : <PhotoIcon className="size-10" />}
        </label>
        <input
          onChange={onChangeImage}
          type="file"
          className="hidden"
          name="photo"
          accept="image/*"
          id="profileImage"
        />
      </form>
    </>
  );
}

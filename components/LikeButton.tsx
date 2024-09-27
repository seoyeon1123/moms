'use client';

import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import {
  HeartIcon,
  HandThumbUpIcon as OutlineHandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { useOptimistic } from 'react';
import {
  dislikeProduct,
  likeProduct,
} from '@/app/(tab)/products/shareOrsell/actions';

interface ILikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  productId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  productId,
}: ILikeButtonProps) {
  const [state, reduceFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => {
      return {
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked ? previousState.likeCount - 1 : +1,
      };
    }
  );

  const onClick = async () => {
    reduceFn(null);
    if (isLiked) {
      await dislikeProduct(productId);
    } else {
      await likeProduct(productId);
    }
  };

  return (
    <>
      <button
        onClick={onClick}
        className={`flex items-center gap-2   transition-colors ${
          state.isLiked ? ' text-red-600 ' : 'text-black'
        }`}
      >
        {state.isLiked ? (
          <HeartIcon className="size-8" />
        ) : (
          <HeartIcon className="size-8" />
        )}
      </button>
    </>
  );
}

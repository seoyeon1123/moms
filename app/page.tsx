import Image from 'next/image';
import Link from 'next/link';

export default function MainPage() {
  return (
    <>
      <div className="relative w-screen h-screen flex flex-row justify-center items-center gap-10">
        <div className="relative w-96 h-96">
          <Image
            fill
            src={`/엄마와_아이들.png`}
            alt="mom and baby"
            className="object-cover"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-orange-200 text-4xl font-bold text-outline">
            엄마와
            <br />
            아이와
          </h1>
        </div>
        <div className="bottom-10 flex flex-col items-center gap-8">
          <p className="text-4xl font-semibold">아이, 우리와 함께 키워요</p>
          <div className="flex flex-col gap-4">
            <form className="flex flex-col justify-center items-center gap-4">
              <input
                className="w-full bg-white border-2 rounded-lg border-neutral-400 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                type="text"
                placeholder="Username"
                required
                name="username"
              />
              <input
                className="w-full bg-white border-2 rounded-lg border-neutral-400 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                type="text"
                placeholder="Username"
                required
                name="username"
              />
              <button className="btn">로그인하기</button>
            </form>
          </div>
          <div className="flex flex-col text-center">
            <p className="pb-1 text-sm text-neutral-600">
              아직 회원이 아니신가요?
            </p>
            <Link href="/signup" className="btn">
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

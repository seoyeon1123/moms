import Input from '@/components/input';
import MomsLogo from '@/app/lib/logo';

export default function FindUsername() {
  return (
    <>
      <div
        className="mx-auto flex flex-col justify-center
        w-full max-w-md 
        h-screen gap-10 px-4 
      "
      >
        {/* Centered MomsLogo */}
        <div className="flex justify-center mb-10">
          <MomsLogo />
        </div>
        <div className="flex flex-col items-start text-start space-y-2">
          <h1 className="text-3xl font-semibold">아이디 찾기</h1>
          <p className="text-gray-600">엄마들에 가입한 이메일을 입력해주세요</p>
        </div>
        <form className="w-full space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Email"
              required
              name="email"
              errors={[]}
            />
          </div>
          <button className="btn w-full">다음</button>
        </form>
      </div>
    </>
  );
}

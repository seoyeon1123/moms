import Link from 'next/link';
import Input from '../components/input';
import MomsLogo from '../lib/logo';

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10 px-4">
      <MomsLogo />
      <h1 className="text-2xl font-bold text-left w-full max-w-md">로그인</h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">아이디</h3>
          <Input
            type="text"
            placeholder="Username"
            required
            name="username"
            errors={[]}
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">비밀번호</h3>
          <Input
            type="password"
            placeholder="Password"
            required
            name="password"
            errors={[]}
          />
        </div>
        <button className="btn w-full">로그인하기</button>
      </div>
      <hr className="w-full max-w-md h-1 bg-neutral-400" />
      <div className="flex flex-row justify-between">
        <p>회원이 아니신가요? </p>
        <Link href="/signup">회원가입</Link>
      </div>
    </div>
  );
}

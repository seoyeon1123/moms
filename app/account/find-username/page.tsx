import Input from '@/components/input';
import MomsLogo from '@/app/lib/logo';

export default function FindUsername() {
  return (
    <>
      <div>
        <MomsLogo />

        <div>
          <h1>아이디 찾기</h1>
          <p>엄마들에 가입한 이메일을 입력해주세요</p>
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            required
            name="email"
            errors={[]}
          />
        </div>
        <button>다음</button>
      </div>
    </>
  );
}

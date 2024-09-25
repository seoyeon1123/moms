import MomsLogo from '@/app/lib/logo';

export default function AuthHeader() {
  return (
    <>
      <div className="flex justify-center items-center absolute top-[100px] left-1/2 transform -translate-x-1/2">
        <MomsLogo />
      </div>
    </>
  );
}
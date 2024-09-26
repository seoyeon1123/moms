import MainTopBar from '@/components/MainTopBar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MainTopBar />
      {children}
    </div>
  );
}

import { Profile } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="my-14 h-full w-full flex flex-col gap-y-10 items-center justify-center ">
  <div className="w-full h-10vh"></div>    
      {children}
    </div>
   );
}
 
export default ProtectedLayout;
import Image from "next/image";
import { UserButton } from "@stackframe/stack";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h2>Welcome!!!</h2>
      <Button variant={'destructive'}>Click Me</Button>
      <UserButton></UserButton>
    </div>
  );
}

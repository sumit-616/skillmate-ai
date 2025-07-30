import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";
import AppHeader from "@/components/custom/AppHeader"; // import your header

export default function Handler(props) {
  return (
    <div>
      <AppHeader />
      <div className="mt-20 px-10">
        <StackHandler fullPage app={stackServerApp} routeProps={props} />
      </div>
    </div>
  );
}

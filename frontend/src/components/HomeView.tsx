import AppButton from "./common/AppButton";

function HomeView({
  handleSigningPopupOpen,
  handleSignupPopupOpen,
}: {
  handleSigningPopupOpen: any;
  handleSignupPopupOpen: any;
}) {
  return (
    <div className="flex lg:mt-16">
      <h1 className="text-6xl font-bold">Welcome to task manager</h1>
      <li className="mt-10 list-disc ml-10">
        In order to manage your tasks please sign in
      </li>
      <div className="flex flex-row gap-10 justify-center self-center mt-20">
        <AppButton onClick={handleSignupPopupOpen} className="min-w-[85px]">
          Sign up
        </AppButton>
        <AppButton onClick={handleSigningPopupOpen} className="min-w-[85px]">
          Sign in
        </AppButton>
      </div>
    </div>
  );
}

export default HomeView;

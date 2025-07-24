import { SuccessButton } from "./_components/SuccessButton";

const page = () => {
    return (
        <div>
            <div className="pt-12 pb-8">
                <div className="container">
                    <div className="space-y-2.5 flex flex-col items-center justify-center text-center">
                        <h1 className="font-semibold text-4xl md:text-5xl">
                           Success
                        </h1>
                        <p className="text-base text-muted-foreground max-w-2xl">
                          Welcome to earnsphere, Tomiwa. Your account has been successfully created and verified. Let's complete a few quick steps to unlock your dashboard and start earning.
                        </p>
                    </div>
                    <SuccessButton />
                </div>
            </div>
        </div>
    );
};

export default page;

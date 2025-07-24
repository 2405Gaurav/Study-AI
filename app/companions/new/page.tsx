import CompanionForm from "@/components/companionform";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-10">
      {canCreateCompanion ? (
        <article className="w-full max-w-2xl flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-center">Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="w-full max-w-xl flex flex-col items-center text-center gap-6">
          <Image
            src="/images/limit.svg"
            alt="Limit Reached"
            width={360}
            height={230}
            className="mx-auto"
          />
          <div className="bg-yellow-400 rounded-full px-4 py-2 font-medium text-black">
            Upgrade your plan
          </div>
          <h1 className="text-2xl font-semibold">You have reached your limit</h1>
          <p className="text-gray-300 max-w-md">
            Upgrade to increase the limit and get more Companions and premium features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full max-w-sm py-3 px-6 rounded-lg text-white font-medium bg-purple-600 hover:bg-purple-700 transition"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
}

export default Page;

import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
  params: { id: string };
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  const { name, subject, topic, duration } = companion;

  if (!user) redirect("/sign-in");
  if (!name) redirect("/companions");

  return (
    <main className="px-4 py-6">
      <article className="flex flex-col md:flex-row justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4 w-full">
          <div
            className="flex size-[72px] items-center justify-center rounded-lg"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col justify-center gap-2 w-full">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-2xl font-semibold text-gray-900">{name}</p>
              <span className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {subject}
              </span>
            </div>
            <p className="text-gray-600 text-base">{topic}</p>
          </div>
        </div>

        <div className="md:self-center text-lg font-medium text-gray-800 whitespace-nowrap">
          ⏱ {duration} min
        </div>
      </article>

      <section className="mt-6">
        <CompanionComponent
          {...companion}
          companionId={id}
          userName={user.firstName!}
          userImage={user.imageUrl!}
        />
      </section>
    </main>
  );
};

export default CompanionSession;

// 'use server' is not needed here because this is a Server Component by default
import React from 'react';
import { getCompanion } from '@/lib/actions/companion.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getSubjectColor } from '@/lib/utils';
import Image from 'next/image';
import CompanionComponent from '@/components/CompanionComponent';

interface CompanionSessionProps {
  params: {
    id: string;
  };
}

export default async function CompanionSession({ params }: CompanionSessionProps) {
  const { id } =  await params;

  const companion = await getCompanion(id);
  const {name,topic,subject,duration,title}=companion;
  const user = await currentUser();

  if (!user) redirect('/sign-in');
  if (!name) redirect('/companions');

  return (
    <main>
      <article className='flex rounded-border justify-between p-6'>
        <div className='flex items-center gap-2'>
          <div
            className='size-[720px] flex items-center justify-center rounded-lg max-md:hidden'
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <p className='font-bold text-2xl '>
                {name}

              </p>
              <div className=' bg-black text-white rounded-4xl text-sm px-2 py-1 capitalize max-sm:hidden'>
                {subject}
              </div>
              <p className='text-lg'> {topic}</p>
            </div>

          </div>
          {duration} minutes
        </div>
      </article>
      <CompanionComponent
      {...companion}
      companionID={id}
      userName={user.firstName}
      userImage={user.imageUrl}
      />
    </main>
  );
}

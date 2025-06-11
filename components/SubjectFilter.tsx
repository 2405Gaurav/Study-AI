'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subjects } from "@/constants/index";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

export const SubjectFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('subject') || "";
  const [subject, setSubject] = useState(query);

  useEffect(() => {
    let newUrl = "";

    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: subject,
      });
    }

    router.push(newUrl);
  }, [subject]);

  return (
    <Select
      onValueChange={(value) => setSubject(value)}
      value={subject || undefined}
    >
      <SelectTrigger className="w-[200px] border-black">
        <SelectValue placeholder="Select subject" />
      </SelectTrigger>
      <SelectContent>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject}>
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

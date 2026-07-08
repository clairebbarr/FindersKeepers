import type { Metadata } from "next";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { Envelope, Star8 } from "@/components/brand/icons";
import { Label, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { EditableText } from "@/components/admin/EditableText";
import { lostLetters, marketingPlanNote } from "@/content/site-copy";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "Lost Letters",
  description: "Tiny envelopes, left in big cities, for someone else to find.",
};

const waitingCities = ["London", "Bristol", "Manchester", "Edinburgh"];

export default async function LostLettersPage() {
  const contentMap = await getSiteContentMap("lost-letters");

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Envelope className="mx-auto h-10 w-10 text-fk-rust" />
        <EditableText
          page="lost-letters"
          section="intro"
          field="heading"
          as="h1"
          className="mt-4 font-display text-4xl font-semibold text-fk-plum sm:text-5xl"
          initialValue={contentMap["intro.heading"] ?? lostLetters.heading}
        />
        <EditableText
          page="lost-letters"
          section="intro"
          field="body"
          as="p"
          className="mt-4 font-body text-lg text-fk-ink/80"
          initialValue={contentMap["intro.body"] ?? lostLetters.intro}
        />
        <EditableText
          page="lost-letters"
          section="intro"
          field="instruction"
          as="p"
          className="mt-4 block font-body text-sm italic text-fk-ink/60"
          initialValue={contentMap["intro.instruction"] ?? lostLetters.instruction}
        />
      </div>

      <div className="mx-auto mt-14 max-w-xl">
        <ArchivalFrame label="You found something" className="text-center">
          <EditableText
            page="lost-letters"
            section="finder"
            field="body"
            as="p"
            className="block font-body text-sm text-fk-ink/70"
            initialValue={
              contentMap["finder.body"] ??
              "Found a Lost Letter? Enter the code from the back to register your find. This isn't connected yet — the Lost Letters system arrives in a later stage of the build."
            }
          />
          <form className="mt-6 flex flex-col gap-3 text-left sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label htmlFor="letter-code">Lost Letter code</Label>
              <Input id="letter-code" placeholder="e.g. FK-LDN-014" disabled />
            </div>
            <Button type="button" disabled>
              Register my find
            </Button>
          </form>
        </ArchivalFrame>
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center">
        <EditableText
          page="lost-letters"
          section="waiting"
          field="heading"
          as="h2"
          className="font-display text-2xl font-semibold text-fk-plum"
          initialValue={contentMap["waiting.heading"] ?? "Currently waiting to be found"}
        />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {waitingCities.map((city) => (
            <Badge key={city}>
              <Star8 className="mr-1.5 h-3 w-3" />
              {city}
            </Badge>
          ))}
        </div>
        <EditableText
          page="lost-letters"
          section="waiting"
          field="note"
          as="p"
          className="mt-4 block font-body text-xs text-fk-ink/50"
          initialValue={
            contentMap["waiting.note"] ??
            "Placeholder cities — exact locations are always kept approximate to protect the businesses hosting them."
          }
        />
      </div>

      <div className="mx-auto mt-16 max-w-2xl border-t border-fk-ink/10 pt-10 text-center">
        <EditableText
          page="lost-letters"
          section="how"
          field="heading"
          as="h2"
          className="font-display text-xl font-semibold text-fk-plum"
          initialValue={contentMap["how.heading"] ?? "How it works"}
        />
        <EditableText
          page="lost-letters"
          section="how"
          field="note"
          as="p"
          className="mt-3 block font-body text-sm text-fk-ink/75"
          initialValue={contentMap["how.note"] ?? marketingPlanNote}
        />
        <EditableText
          page="lost-letters"
          section="how"
          field="rule"
          as="p"
          className="mt-3 block font-body text-sm text-fk-ink/75"
          initialValue={contentMap["how.rule"] ?? lostLetters.rule}
        />
        <EditableText
          page="lost-letters"
          section="how"
          field="responsible"
          as="p"
          className="mt-6 block font-body text-xs text-fk-ink/50"
          initialValue={contentMap["how.responsible"] ?? lostLetters.responsibleNote}
        />
      </div>
    </div>
  );
}

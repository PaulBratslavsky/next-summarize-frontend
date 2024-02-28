import { extractYouTubeID } from "@/lib/utils";
import YouTubePlayer from "@/components/custom/YouTubePlayer";
import { SectionNav } from "@/components/custom/SectionNav";
import { getVideoById } from "@/data/loaders";
import { CreateNoteForm } from "@/components/custom/forms/CreateNoteForm";
import { Card } from "@/components/ui/card";

export default async function VideosRoute({
  params,
  children,
}: {
  readonly params: any;
  readonly children: React.ReactNode;
}) {
  const data = await getVideoById(params.videoId);

  const navItems = [
    {
      name: "Summary",
      href: "/dashboard/summaries/" + params.videoId,
    },
    {
      name: "Notes",
      href: "/dashboard/summaries/" + params.videoId + "/notes",
    },
  ];

  const videoId = extractYouTubeID(data.videoId);
  if (!data) return <p>No Items Found</p>;
  return (
    <div>
      <SectionNav navItems={navItems} />
      <div className="h-full grid gap-4 grid-cols-5 px-6">
        <div className="col-span-3">{children}</div>
        <div className="col-span-2">
          <div className="rounded-lg overflow-hidden">
            <YouTubePlayer
              key={data.id}
              playerKey={data.id}
              id={videoId as string}
              height="365px"
            />
          </div>

          <Card className="mt-4 p-4">
            <CreateNoteForm videoId={params.videoId} />
          </Card>
        </div>
      </div>
    </div>
  );
}

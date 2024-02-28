import { SummaryCard } from "@/components/custom/SummaryCard";
import { getVideoById } from "@/data/loaders";

interface ParamsProps {
  params: {
    videoId: string;
  };
}

export default async function VideoRoute({ params }: Readonly<ParamsProps>) {
  const data = await getVideoById(params.videoId);
  if (!data) return <p>No Items Found</p>;
  return <SummaryCard item={data} />;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MountainIcon } from "@/components/icons/MountainIcon";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { getNotes, getSummaries } from "@/data/loaders";

async function SummariesCountCard() {
  const data = await getSummaries(1, "");
  const summariesCount = data.meta.pagination.total;
  return (
    <Card>
      <Suspense fallback={<LoadingSpinner />}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Summaries</CardTitle>
          <MountainIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summariesCount}</div>
          <p className="text-xs text-muted-foreground">
            Checkout all your summaries
          </p>
        </CardContent>
      </Suspense>
    </Card>
  );
}

async function CreditsCountCard() {
  const userData = await getUserMeLoader();
  const credits = userData.data.credits;
  return (
    <Card>
      <Suspense fallback={<LoadingSpinner />}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credits</CardTitle>
          <MountainIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{credits}</div>
          <p className="text-xs text-muted-foreground">
            All your remaining credits
          </p>
        </CardContent>
      </Suspense>
    </Card>
  );
}

async function NotesCountCard() {
  const data = await getNotes(1, "");
  const notesCount = data.meta.pagination.total;
  return (
    <Card>
      <Suspense fallback={<LoadingSpinner />}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notes</CardTitle>
          <MountainIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{notesCount}</div>
          <p className="text-xs text-muted-foreground">
            Checkout all your notes
          </p>
        </CardContent>
      </Suspense>
    </Card>
  );
}

export default function DashboardIndexRoute() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 p-4">
      <CreditsCountCard />
      <SummariesCountCard />
      <NotesCountCard />
    </div>
  );
}

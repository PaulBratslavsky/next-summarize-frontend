import { Fragment } from "react";

type Item = {
  id: string;
};

interface RenderListProps {
  data: Item[];
  component: React.ComponentType<{ item: Item }>;
  columns?: number;
}

export default function RenderList({
  data,
  component: Component,
}: RenderListProps) {
  if (!data || data.length === 0) return <p>No Items Found</p>;
  return (
    <Fragment>
      {data.map((item) => (
        <Component key={item.id} item={item} />
      ))}
    </Fragment>
  );
}

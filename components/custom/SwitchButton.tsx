import { Switch } from "@/components/ui/switch";

export function SwitchButton({
  checked,
  callback,
}: {
  checked: boolean;
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="m-2">
      <Switch checked={checked} onClick={() => callback((prev) => !prev)} />
    </div>
  );
}
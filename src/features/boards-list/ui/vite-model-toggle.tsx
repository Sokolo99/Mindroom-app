import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs.tsx";
import { ImagesIcon, ListIcon } from "lucide-react";

export type ViteMode = "list" | "cards";

export function ViteModelToggle({
  value,
  onChange,
}: {
  value: ViteMode;
  onChange: (value: ViteMode) => void;
}) {
  return (
    <Tabs defaultValue={value} onValueChange={(e) => onChange(e as ViteMode)}>
      <TabsList>
        <TabsTrigger value="list">
          <ListIcon />
        </TabsTrigger>
        <TabsTrigger value="cards">
          <ImagesIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

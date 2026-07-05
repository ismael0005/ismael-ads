import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface SectionPlaceholderProps {
  name: string;
  description?: string;
}

export function SectionPlaceholder({
  name,
  description,
}: SectionPlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {description ?? "Placeholder — content will be designed in a later phase."}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

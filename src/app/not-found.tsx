import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-display font-bold text-brand-500/20 mb-4">
          404
        </p>
        <h1 className="text-2xl font-semibold text-foreground mb-3">
          Страница не найдена
        </h1>
        <p className="text-muted-foreground mb-8">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/">
          <Button>На главную</Button>
        </Link>
      </div>
    </div>
  );
}

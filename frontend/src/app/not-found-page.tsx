import { Link } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[calc(100dvh-5rem)] max-w-3xl items-center justify-center">
      <section className="w-full rounded-lg border border-border/80 bg-card p-8 text-center shadow-panel">
        <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <SearchX className="size-5" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          The page you opened is not available. Return to the directory to continue.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/users">
            <Button>
              <ArrowLeft data-icon="inline-start" />
              Back to people
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  );
}

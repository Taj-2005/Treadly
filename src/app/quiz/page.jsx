import { Suspense } from "react";
import Quiz from "@/app/components/Quiz/Quiz";

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading quiz...</div>}>
      <Quiz />
    </Suspense>
  );
}

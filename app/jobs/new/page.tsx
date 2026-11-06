import { CreateJobForm } from "@/features/jobs/components/CreateJobForm";
import { Suspense } from "react";

const NewJobPage = () => {
  return (
    <main>
      <h1>Create new Job</h1>
      <Suspense>
        <CreateJobForm
          initialValues={{
            company: "",
            role: "",
            status: "applied",
            notes: "",
          }}
        ></CreateJobForm>
      </Suspense>
    </main>
  );
};

export default NewJobPage;

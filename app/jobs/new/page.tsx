import { PageHeader } from "@/components/PageHeader";
import { CreateJobForm } from "@/features/jobs/components/CreateJobForm";

const NewJobPage = () => {
  return (
    <main>
      <PageHeader title="Create new Job"></PageHeader>
      <CreateJobForm
        initialValues={{
          company: "",
          role: "",
          status: "applied",
          notes: "",
        }}
      ></CreateJobForm>
    </main>
  );
};

export default NewJobPage;

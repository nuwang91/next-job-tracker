import { CreateJobForm } from "@/features/jobs/components/CreateJobForm";

const NewJobPage = () => {
  return (
    <main>
      <h1>Create new Job</h1>
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

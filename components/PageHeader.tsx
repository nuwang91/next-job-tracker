type PageHeaderProps = {
  title: string;
};

export const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <h1 className="mb-6 text-2xl font-semibold tracking-tight">{title}</h1>
  );
};
